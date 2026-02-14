export default function AccountPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <div className="grid gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
        <p className="text-sm font-medium">Profile Information</p>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Full Name</label>
          <div className="p-2 border rounded bg-muted/50 text-sm">Julia</div>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Email Address</label>
          <div className="p-2 border rounded bg-muted/50 text-sm">julia@gmail.com</div>
        </div>
      </div>
    </div>
  )
}