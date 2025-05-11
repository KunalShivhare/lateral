const discountOptions = [
  { value: -10, label: "-10%" },
  { value: -20, label: "-20%" },
  { value: -30, label: "-30%" },
  { value: -50, label: "-50%", selected: true },
];

export function SettlementOffer() {
  return (
    <div className="bg-[#090A0BBF] border-[1px] border-[#3F3F3F] rounded-lg mt-6 overflow-hidden p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">Settlement Offer</h3>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {discountOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-1 text-sm rounded ${
                  option.selected
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-slate-400 text-xs">Settlement Amount</div>
          <div className="text-white font-medium">£145,000.00</div>
        </div>
      </div>
    </div>
  );
}
