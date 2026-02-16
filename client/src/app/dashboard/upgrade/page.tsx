import { Check, HelpCircle } from "lucide-react"

export default function UpgradePage() {
  const plans = [
    {
      name: "Plus",
      tag: "Created for all teams",
      price: "Rp918k",
      desc: "Build trust with branded forms.",
      features: ["3 seats", "1,000 responses per month", "All features from Basic"],
    },
    {
      name: "Business",
      tag: "Created for all teams",
      price: "Rp1,496k",
      desc: "Improve performance through data-driven forms.",
      features: ["5 seats", "10,000 responses per month", "All features from Plus"],
    },
    {
      name: "Growth Essentials",
      tag: "Created for marketing teams",
      price: "Rp2,993k",
      desc: "Leverage video questions and more to drive engagement.",
      featured: true,
      features: ["3 seats", "1,000 responses per month", "Video questions and answers*"],
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8">
      {/* Header Section */}
      <div className="max-w-[1200px] mx-auto text-center mb-12 space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Plans for teams of all sizes</h1>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">
          Advanced features that help marketers convert leads and collect in-depth customer feedback.
        </p>
        
        {/* Tab Selector */}
        <div className="inline-flex p-1 bg-white border rounded-xl shadow-sm mt-6">
          <button className="px-6 py-2 text-sm font-medium text-slate-500">Individuals</button>
          <button className="px-6 py-2 text-sm font-medium bg-[#E6F0EE] text-[#2D5A52] rounded-lg">Teams</button>
          <button className="px-6 py-2 text-sm font-medium text-slate-500">Enterprise companies</button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 items-start justify-center">
        
        {/* GRID CARD - Ini yang bikin ada jarak (gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white border rounded-2xl flex flex-col shadow-sm transition-all hover:shadow-xl ${
                plan.featured ? 'ring-2 ring-[#4B9E8E] border-transparent scale-[1.02]' : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-8 border-b border-slate-50 text-center space-y-4 bg-slate-50/30 rounded-t-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{plan.tag}</span>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <p className="text-[11px] text-slate-500 px-2">{plan.desc}</p>
                </div>
                <div className="py-2">
                  <div className="text-4xl font-black text-slate-900">{plan.price}</div>
                  <p className="text-[10px] text-slate-400 mt-1">per month</p>
                </div>
                <div className="inline-block px-4 py-1.5 bg-[#E6F0EE] text-[#2D5A52] text-[10px] font-bold rounded-full">
                  Save {plan.name === "Plus" ? "2,194k" : "358"} rupiah per year
                </div>
              </div>

              {/* Card Features List */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="space-y-6 flex-1 text-sm text-slate-600">
                  <div className="space-y-3">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-tighter">Plan size</p>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex gap-3 items-start leading-tight">
                        <Check className="h-4 w-4 text-[#2D5A52] shrink-0" /> 
                        <span className="text-[13px]">{feat}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-tighter">Elevate engagement</p>
                    <div className="flex gap-3 items-center text-slate-400">
                      <HelpCircle className="h-4 w-4 shrink-0" /> 
                      <span className="text-[13px]">Video questions and answers*</span>
                    </div>
                  </div>
                </div>
                
                <button className={`w-full mt-10 py-4 rounded-xl text-sm font-bold transition-all ${
                  plan.featured ? 'bg-[#7C3AED] text-white shadow-lg shadow-purple-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}>
                  Choose {plan.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY CARD - Di Samping Kanan */}
        <div className="w-full lg:w-[350px] shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm sticky top-8">
            <h3 className="font-bold text-slate-800 mb-6">Your new Growth Essentials plan</h3>
            
            <div className="flex items-center justify-between p-1 bg-slate-50 border rounded-lg mb-8">
              <button className="flex-1 py-2 text-xs font-medium text-slate-500">Monthly</button>
              <button className="flex-1 py-2 text-xs font-bold bg-[#E6F0EE] text-[#2D5A52] rounded-md shadow-sm">Yearly</button>
            </div>

            <div className="space-y-4 text-[13px]">
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs font-medium">Growth Essentials (yearly)</span>
                <span className="font-bold">Rp42,858k</span>
              </div>
              <div className="flex justify-between items-center text-[#2D5A52] font-bold bg-[#E6F0EE]/30 p-3 rounded-lg">
                <span className="text-xs">Yearly discount applied</span>
                <span>-Rp7,141k</span>
              </div>
              <div className="pt-6 border-t flex justify-between items-end">
                <span className="font-black text-xs uppercase text-slate-400 tracking-tighter">Total</span>
                <span className="text-3xl font-black text-slate-900">Rp45,359k</span>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-xl shadow-slate-200">
              Get Growth Essentials
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}