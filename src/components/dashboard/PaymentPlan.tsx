export function PaymentPlan() {
  return (
    <div className="bg-[var(--cardBackground)] border-[1px] border-[#3F3F3F] rounded-lg mt-6 overflow-hidden p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#939292] text-sm mb-1">Payment plan</h3>
          <div className="text-white font-medium">$344.00</div>
        </div>
        <div>
          <h3 className="text-[#939292] text-sm mb-1">Next payment due</h3>
          <div className="text-white font-medium">June 15, 2020</div>
        </div>
        <div>
          <button className="text-[#058FFF] text-sm">
            Mark Arrangement Broken
          </button>
        </div>
      </div>
    </div>
  );
}
