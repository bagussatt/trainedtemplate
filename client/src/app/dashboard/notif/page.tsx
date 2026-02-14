export default function NotifPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="space-y-4">
        {["Email Notifications", "Push Notifications", "Weekly Reports"].map((item) => (
          <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
            <span className="text-sm font-medium">{item}</span>
            <div className="h-5 w-10 rounded-full bg-green-500 relative">
              <div className="h-4 w-4 rounded-full bg-white absolute right-0.5 top-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}