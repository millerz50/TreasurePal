"use client";

export default function AdminPanel() {
  return (
    <section className="p-6 bg-base-100 border border-base-300 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-primary">Admin Panel</h2>
      <p className="text-sm text-muted-foreground">
        Manage agents, users, and system settings. Grant or revoke access, and
        oversee uploads.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="btn btn-outline w-full">Manage Agents</button>
        <button className="btn btn-outline w-full">View Analytics</button>
        <button className="btn btn-outline w-full">Approve Uploads</button>
        <button className="btn btn-outline w-full">System Settings</button>
      </div>
    </section>
  );
}
