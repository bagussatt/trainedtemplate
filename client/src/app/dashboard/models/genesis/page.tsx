export default function GenesisPage() {
  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white mb-6">
        <h1 className="text-3xl font-bold">Model Genesis</h1>
        <p className="opacity-90">Our most powerful generative engine.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {['Speed', 'Accuracy', 'Context'].map((stat) => (
          <div key={stat} className="p-4 border rounded-lg text-center">
            <p className="text-xs text-muted-foreground uppercase">{stat}</p>
            <p className="text-xl font-bold">99.9%</p>
          </div>
        ))}
      </div>
    </div>
  )
}