export default function TrackingLoading() {
  return (
    <main className="bg-surface py-10 md:py-16">
      <div className="section-shell space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-48 rounded-full bg-white" />
          <div className="h-44 rounded-[2rem] bg-white" />
          <div className="h-52 rounded-[2rem] bg-white" />
          <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <div className="h-[28rem] rounded-[2rem] bg-white" />
            <div className="h-[28rem] rounded-[2rem] bg-white" />
          </div>
        </div>
      </div>
    </main>
  );
}
