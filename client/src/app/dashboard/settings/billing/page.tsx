export default function SettingsBillingPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing Settings</h1>
        <p className="text-sm text-muted-foreground">Kelola kartu kredit dan riwayat tagihan akun kamu.</p>
      </div>

      <div className="grid gap-6">
        {/* Kartu Pembayaran */}
        <div className="p-4 border rounded-lg bg-card shadow-sm">
          <h2 className="text-sm font-semibold mb-3">Metode Pembayaran</h2>
          <div className="flex items-center gap-4 p-3 border rounded bg-muted/30">
            <div className="h-10 w-12 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-500">VISA</div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expired 12/28</p>
            </div>
          </div>
        </div>

        {/* Riwayat Invoices */}
        <div className="p-4 border rounded-lg bg-card shadow-sm">
          <h2 className="text-sm font-semibold mb-3">Invoices Terbaru</h2>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center text-sm p-2 border-b last:border-0">
                <span>Inv-00{i}-2026</span>
                <span className="font-medium">$19.00</span>
                <button className="text-blue-600 hover:underline text-xs">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}