const invoices = [
  {
    id: 1,
    description: "This is the description of the invoice",
    invoiceNumber: "1231341",
    dueDate: "June 17, 2020",
    interest: "£12,34",
  },
  {
    id: 2,
    description: "This is the description of the invoice",
    invoiceNumber: "486003",
    dueDate: "Sep 17, 2020",
    interest: "£4,23",
  },
  {
    id: 3,
    description: "This is the description of the invoice",
    invoiceNumber: "1231341",
    dueDate: "June 17, 2020",
    interest: "£12,34",
  },
  {
    id: 4,
    description: "This is the description of the invoice",
    invoiceNumber: "1231341",
    dueDate: "June 17, 2020",
    interest: "£12,34",
  },
  {
    id: 5,
    description: "This is the description of the invoice",
    invoiceNumber: "486003",
    dueDate: "Sep 17, 2020",
    interest: "£4,23",
  },
  {
    id: 6,
    description: "This is the description of the invoice",
    invoiceNumber: "486003",
    dueDate: "Sep 17, 2020",
    interest: "£4,23",
  },
];

export function OpenInvoices() {
  return (
    <div className="bg-[var(--cardBackground)] border-[1px] border-[var(--border)] rounded-lg mt-6  overflow-hidden">
      <div className="flex flex-row items-center p-4">
        <div className="flex flex-1  items-center">
          <h3 className="text-[var(--primary-text)] text-base font-medium">
            Open invoices
          </h3>
          <span className="text-[var(--primary-text)] text-base pl-4 ">8</span>
        </div>
        <button className="text-[#058FFF] flex items-center text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#058FFF"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add invoice
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="">
            <tr>
              <th className="p-3 text-xs font-medium text-[var(--primary-text)]">
                Description
              </th>
              <th className="p-3 text-xs font-medium text-[var(--primary-text)] text-center">
                Invoice #
              </th>
              <th className="p-3 text-xs font-medium text-[var(--primary-text)] text-center">
                Due date
              </th>
              <th className="p-3 text-xs font-medium text-[var(--primary-text)] text-center">
                Interest
              </th>
            </tr>
          </thead>
          <tbody className="">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-[var(--border)]">
                <td className="p-3 text-sm text-[var(--primary-text)]">
                  {invoice.description}
                </td>
                <td className="p-3 text-sm text-[var(--primary-text)] text-center">
                  {invoice.invoiceNumber}
                </td>
                <td className="p-3 text-sm text-[var(--primary-text)] text-center">
                  {invoice.dueDate}
                </td>
                <td className="p-3 text-sm text-[var(--primary-text)] text-center">
                  {invoice.interest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
