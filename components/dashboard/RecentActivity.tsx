export default function RecentActivity() {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-sm text-muted-foreground">
          Recent Activity
        </h3>
        <ul className="text-sm space-y-2 pt-2">
          <li>🏠 New listing added: “Modern Flat in Harare”</li>
          <li>👤 Agent invited: Tendai M.</li>
          <li>📈 230 views on “Luxury Villa in Borrowdale”</li>
        </ul>
      </div>
    </div>
  );
}
