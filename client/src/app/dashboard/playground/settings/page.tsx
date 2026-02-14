export default function PlaySettings() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Playground Settings</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="text-sm font-medium">Developer Mode</p>
            <p className="text-xs text-muted-foreground">Enable advanced debugging tools.</p>
          </div>
          <div className="h-5 w-10 rounded-full bg-blue-600 relative"><div className="h-4 w-4 rounded-full bg-white absolute right-1 top-0.5" /></div>
        </div>
      </div>
    </div>
  )
}