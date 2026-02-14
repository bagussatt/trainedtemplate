export default function UpgradePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Unlock Pro Features</h1>
        <p className="text-muted-foreground">Get more power for your professional projects.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl space-y-4">
          <p className="font-bold">Pro Plan</p>
          <p className="text-2xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>✓ Unlimited Projects</li>
            <li>✓ Priority Support</li>
            <li>✓ Custom Domain</li>
          </ul>
        </div>
      </div>
    </div>
  )
}