export function LinkedRecords() {
  return (
    <div className="bg-[#090A0BBF] border-[1px] border-[#3F3F3F] rounded-lg mt-6 overflow-hidden p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-white text-base font-medium">Linked Records</h3>
          <span className="text-[#939292] text-base pl-4 ">3</span>
        </div>
        <div className="flex">
          <h3 className="text-[#939292] text-xs">Amount linked:</h3>
          <span className="text-xs pl-1">$34,567.00</span>
        </div>
        <div className="flex justify-end ">
          <button className="text-[#058FFF] text-sm">See Linked Records</button>
        </div>
      </div>
    </div>
  );
}
