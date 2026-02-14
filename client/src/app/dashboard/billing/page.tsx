export default function BillingPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Billing & Subscription</h1>
      <div className="p-6 border rounded-lg border-blue-200 bg-blue-50 dark:bg-blue-950/30">
        <p className="text-lg font-semibold">Free Plan</p>
        <p className="text-sm text-muted-foreground">You are currently using the free version of Next App.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Upgrade Plan</button>
      </div>
    </div>
  )
}