/* eslint-disable @typescript-eslint/no-explicit-any */
const { Client, ID, Query, TablesDB, Users } = require("node-appwrite");

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const tablesDB = new TablesDB(client);
const users = new Users(client);

const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const USERS_TABLE = process.env.APPWRITE_USERTABLE_ID || "user";
const DEBUG = process.env.DEBUG === "true";

if (!DB_ID || !USERS_TABLE) {
  throw new Error(
    `❌ Missing Appwrite config: DB_ID=${DB_ID}, USERS_TABLE=${USERS_TABLE}`
  );
}

export interface UserRow {
  $id?: string;
  accountid?: string;
  email?: string;
  firstName?: string;
  surname?: string;
  phone?: string | null;
  role?: string;
  status?: string;
  nationalId?: string | null;
  bio?: string | null;
  metadata?: string[];
  [key: string]: unknown;
}

function safeFormat(row: unknown): UserRow | null {
  if (!row || typeof row !== "object") return null;
  const formatted = { ...(row as UserRow) };
  delete (formatted as any).password; // never expose password in responses
  return formatted;
}

function logError(
  operation: string,
  err: unknown,
  context: Record<string, unknown> = {}
) {
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      service: "userService",
      operation,
      context,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : null,
    })
  );
}

// 🔎 Get by table row ID
export async function getUserById(userId: string): Promise<UserRow | null> {
  try {
    const row = await tablesDB.getRow(DB_ID, USERS_TABLE, userId);
    return safeFormat(row);
  } catch (err: unknown) {
    logError("getUserById", err, { userId });
    return null;
  }
}

// 🔎 Get by linked auth user ID (Appwrite accountId)
export async function getUserByAccountId(
  accountid: string
): Promise<UserRow | null> {
  try {
    const res = await tablesDB.listRows(DB_ID, USERS_TABLE, [
      Query.equal("accountid", accountid),
    ]);
    return res.total > 0 ? safeFormat(res.rows[0]) : null;
  } catch (err: unknown) {
    logError("getUserByAccountId", err, { accountid });
    return null;
  }
}

// 📋 List all users
export async function listUsers(limit = 100, offset = 0) {
  try {
    const res = await tablesDB.listRows(DB_ID, USERS_TABLE, [], String(limit));
    const rows = Array.isArray(res.rows) ? res.rows : [];
    const usersList = rows.slice(offset, offset + limit).map(safeFormat);
    return { total: res.total ?? usersList.length, users: usersList };
  } catch (err: unknown) {
    logError("listUsers", err, { limit, offset });
    return { total: 0, users: [] };
  }
}

// 🆕 Signup: create auth user + profile row
export async function signupUser(payload: {
  email: string;
  password: string;
  firstName: string;
  surname: string;
  phone?: string;
  role?: string;
  status?: string;
  nationalId?: string;
  bio?: string;
  metadata?: string[];
}) {
  try {
    // 1. Create auth user (Appwrite) with email + password + name
    // 🚫 Do not send phone to Appwrite
    const authUser = await users.create(
      ID.unique(),
      payload.email,
      payload.password,
      `${payload.firstName} ${payload.surname}`,
      null
    );

    // 2. Create profile row linked to auth user (store phone here only)
    const row = await tablesDB.createRow(DB_ID, USERS_TABLE, ID.unique(), {
      accountid: authUser.$id,
      email: payload.email.toLowerCase(),
      firstName: payload.firstName,
      surname: payload.surname,
      phone: payload.phone ?? null, // ✅ stored only in your DB
      role: payload.role ?? "user",
      status: payload.status ?? "Active",
      password: payload.password, // ⚠️ Ideally remove from schema ASAP
      nationalId: payload.nationalId ?? null,
      bio: payload.bio ?? null,
      metadata: payload.metadata ?? [],
    });

    if (DEBUG) console.log("signupUser auth:", authUser, "profile:", row);
    return { authUser, profile: safeFormat(row) };
  } catch (err: unknown) {
    logError("signupUser", err, { payload });
    throw err;
  }
}

// ✅ Alias for backwards compatibility
export async function createUser(payload: Parameters<typeof signupUser>[0]) {
  return signupUser(payload);
}

// ✏️ Update profile row
export async function updateUser(
  userId: string,
  updates: Record<string, unknown>
) {
  try {
    if ("password" in updates) delete (updates as any).password;
    const row = await tablesDB.updateRow(DB_ID, USERS_TABLE, userId, updates);
    return safeFormat(row);
  } catch (err: unknown) {
    logError("updateUser", err, { userId, updates });
    throw err;
  }
}

// ❌ Delete profile row
export async function deleteUser(userId: string) {
  try {
    return await tablesDB.deleteRow(DB_ID, USERS_TABLE, userId);
  } catch (err: unknown) {
    logError("deleteUser", err, { userId });
    throw err;
  }
}

// 🔧 Set role
export async function setRole(userId: string, role: string) {
  try {
    const row = await tablesDB.updateRow(DB_ID, USERS_TABLE, userId, { role });
    return safeFormat(row);
  } catch (err: unknown) {
    logError("setRole", err, { userId, role });
    throw err;
  }
}

// 🔧 Set status
export async function setStatus(userId: string, status: string) {
  try {
    const row = await tablesDB.updateRow(DB_ID, USERS_TABLE, userId, {
      status,
    });
    return safeFormat(row);
  } catch (err: unknown) {
    logError("setStatus", err, { userId, status });
    throw err;
  }
}

// 🔎 Find by email
export async function findByEmail(email: string) {
  try {
    const res = await tablesDB.listRows(DB_ID, USERS_TABLE, [
      Query.equal("email", email.toLowerCase()),
    ]);
    return res.total > 0 ? safeFormat(res.rows[0]) : null;
  } catch (err: unknown) {
    logError("findByEmail", err, { email });
    return null;
  }
}

// 🔎 List agents (users with role="agent")
export async function listAgents(limit = 100, offset = 0) {
  try {
    const res = await tablesDB.listRows(
      DB_ID,
      USERS_TABLE,
      [Query.equal("role", "agent")],
      String(limit)
    );
    const rows = Array.isArray(res.rows) ? res.rows : [];
    const agentsList = rows.slice(offset, offset + limit).map(safeFormat);
    return { total: res.total ?? agentsList.length, agents: agentsList };
  } catch (err: unknown) {
    logError("listAgents", err, { limit, offset });
    return { total: 0, agents: [] };
  }
}

