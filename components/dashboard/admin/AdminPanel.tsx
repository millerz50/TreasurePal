import { NextFunction, Request, Response } from "express";
import {
  getAgentDashboardMetrics,
  recordAgentMetrics,
} from "../services/dashboard/dashboardService";
import {
  approveApplication,
  getApplicationById,
  getUserByAccountId,
  listPendingApplications,
  rejectApplication,
  submitAgentApplication,
} from "../services/user/userService";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

/* -------------------------
   Helpers
------------------------- */
function isAdmin(req: AuthenticatedRequest) {
  const user = (req as any).user;
  if (!user) return false;
  const roles: string[] = Array.isArray(user.roles) ? user.roles : [];
  return roles.includes("admin");
}

/* ============================
   SUBMIT APPLICATION
============================ */
export async function submitApplicationHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body ?? {};

    if (!body.accountid || typeof body.accountid !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "accountid is required" });
    }

    if (!body.fullname || typeof body.fullname !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "fullname is required" });
    }

    if (!body.message || typeof body.message !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "message is required" });
    }

    const payload = {
      userId: body.accountid,
      fullname: body.fullname,
      message: body.message,
      agentId: body.agentId ?? null,
      rating: typeof body.rating === "number" ? body.rating : null,
      verified: typeof body.verified === "boolean" ? body.verified : null,
    };

    const created = await submitAgentApplication(payload);

    return res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    return next(err);
  }
}

/* ============================
   LIST PENDING APPLICATIONS
============================ */
export async function listPendingHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isAdmin(req)) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }

    const limit = Number(req.query.limit ?? 50);
    const applications = await listPendingApplications(limit);

    return res.status(200).json({ success: true, data: applications });
  } catch (err: any) {
    return next(err);
  }
}

/* ============================
   APPROVE APPLICATION (Frontend expects /agents/:id/approve)
============================ */
export async function approveAgentHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isAdmin(req)) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }

    const agentId = req.params.id;
    if (!agentId) {
      return res
        .status(400)
        .json({ success: false, message: "Agent id is required" });
    }

    const application = await getApplicationById(agentId);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    const adminPayload = (req as any).user;
    const adminId =
      adminPayload?.accountid ??
      adminPayload?.$id ??
      adminPayload?.id ??
      "admin";

    const reviewNotes = req.body?.reviewNotes ?? null;

    const result = await approveApplication(agentId, adminId, reviewNotes);

    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    return next(err);
  }
}

/* ============================
   DISAPPROVE APPLICATION (Frontend expects /agents/:id/disapprove)
============================ */
export async function disapproveAgentHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isAdmin(req)) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }

    const agentId = req.params.id;
    if (!agentId) {
      return res
        .status(400)
        .json({ success: false, message: "Agent id is required" });
    }

    const application = await getApplicationById(agentId);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    const adminPayload = (req as any).user;
    const adminId =
      adminPayload?.accountid ??
      adminPayload?.$id ??
      adminPayload?.id ??
      "admin";

    const reviewNotes = req.body?.reviewNotes ?? null;

    const result = await rejectApplication(agentId, adminId, reviewNotes);

    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    return next(err);
  }
}

/* ============================
   GET AGENT METRICS
============================ */
export async function getMetricsHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const agentPayload = (req as any).agent ?? (req as any).user;
    if (
      !agentPayload ||
      (!agentPayload.id && !agentPayload.$id && !agentPayload.accountid)
    ) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const agentId =
      agentPayload.id ?? agentPayload.$id ?? agentPayload.accountid;

    const userDoc = await getUserByAccountId(
      agentPayload.accountid ?? agentId
    ).catch(() => null);

    const metrics = await getAgentDashboardMetrics(agentId);
    await recordAgentMetrics(agentId, metrics);

    return res.status(200).json({ success: true, agentId, metrics });
  } catch (err: any) {
    return next(err);
  }
}
