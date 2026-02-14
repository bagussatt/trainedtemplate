export default function HistoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activity History</h1>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 border rounded-lg flex justify-between items-center hover:bg-muted/50 cursor-pointer">
            <div>
              <p className="text-sm font-medium">Model Genesis Run #{i}</p>
              <p className="text-xs text-muted-foreground">Executed 2 hours ago</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Success</span>
          </div>
        ))}
      </div>
    </div>
  )
}