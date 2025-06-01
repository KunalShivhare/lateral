const discountOptions = [
  { value: -10, label: "-10%" },
  { value: -20, label: "-20%" },
  { value: -30, label: "-30%" },
  { value: -50, label: "-50%", selected: true },
];

export function SettlementOffer() {
  return (
    <div className="bg-[var(--cardBackground)] border-[1px] border-[var(--border)] rounded-lg mt-6 overflow-hidden p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[var(--primary-text)] font-medium">
          Settlement Offer
        </h3>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {discountOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-1 text-sm rounded ${
                  option.selected
                    ? "bg-[var(--settlement-option-background)] text-[var(--primary-text)]"
                    : "bg-transparent border-[1px] border-[var(--border)] text-[var(--primary-text)] hover:bg-[var(--border)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[var(--primary-text)] text-xs">
            Settlement Amount
          </div>
          <div className="text-[var(--primary-text)] font-medium">
            £145,000.00
          </div>
        </div>
      </div>
    </div>
  );
}
