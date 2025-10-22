export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h3 className="card-title text-sm text-muted-foreground">
            Total Listings
          </h3>
          <p className="text-2xl font-bold text-primary">128</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h3 className="card-title text-sm text-muted-foreground">
            Active Agents
          </h3>
          <p className="text-2xl font-bold text-primary">24</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h3 className="card-title text-sm text-muted-foreground">
            Views This Week
          </h3>
          <p className="text-2xl font-bold text-primary">1,032</p>
        </div>
      </div>
    </div>
  );
}
