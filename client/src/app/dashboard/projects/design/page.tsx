export default function DesignPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Design Engineering</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-video bg-muted rounded-xl border-2 border-dashed flex items-center justify-center">
          <p className="text-muted-foreground">No active canvas</p>
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold">Project Tasks</h2>
          {['Wireframe UI', 'Theme Setup'].map((task) => (
            <div key={task} className="flex gap-3 items-center text-sm p-2 border-b">
              <input type="checkbox" className="rounded" /> {task}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}