import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { EmptyDialog } from "./EmptyDialog";
import { BigEmptyModal } from "@/components/ui/big-empty-modal";

export function CaseHeader({
  debtor,
  caseDetails,
  openDialog,
  closeDialog,
}: {
  debtor: any;
  caseDetails: any;
  openDialog?: (title?: string, description?: string) => void;
  closeDialog?: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [debtorModalOpen, setDebtorModalOpen] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[var(--cardBackground)] border-[1px] border-[var(--border)] rounded-lg ">
      <div className="flex justify-between items-center px-3 pt-4">
        <div
          className="flex items-center space-x-2 bg-[#058FFF1A] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#058FFF33] transition-colors"
          onClick={() => setStatusModalOpen(true)}
        >
          <div className="h-4 w-4 rounded-full bg-[#058FFF]"></div>
          <div className="text-[#058FFF] text-sm">On arrangement</div>
        </div>

        <BigEmptyModal
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          title="Case Status"
        >
          <div className="space-y-6 text-white">
            <div className="space-y-2">
              <h4 className="font-medium text-[var(--primary-text)]">
                Current Status
              </h4>
              <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
                <div className="h-4 w-4 rounded-full bg-[#058FFF]"></div>
                <span>On arrangement</span>
              </div>
            </div>
          </div>
        </BigEmptyModal>

        <BigEmptyModal
          isOpen={debtorModalOpen}
          onClose={() => setDebtorModalOpen(false)}
          title="Edit Debtor Information"
        >
          <div className="space-y-6 text-white">
            <div className="space-y-2">
              <label
                htmlFor="debtorName"
                className="block text-sm font-medium text-[var(--primary-text)]"
              >
                Debtor Name
              </label>
              <input
                type="text"
                id="debtorName"
                defaultValue={debtor?.debtor_name || ""}
                className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md text-[var(--primary-text)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter debtor name"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setDebtorModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-[var(--primary-text)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  // Handle save logic here
                  setDebtorModalOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </BigEmptyModal>
        <div>
          <div className="flex justify-end space-x-2">
            <Badge variant="outline" className="bg-black text-white px-4 py-2">
              H&S WARNING
            </Badge>
            <Badge variant="outline" className="bg-black text-white px-4 py-2">
              V1 - VULNERABLE
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex px-3">
        <div className="w-[75%] p-2 mt-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-semibold text-[var(--primary-text)]">
              {debtor?.debtor_name}
            </h2>
            <button
              onClick={() => setDebtorModalOpen(true)}
              className="text-[var(--primary-text)] transition-colors"
              title="Edit debtor information"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-1 text-white">
            <div className="flex items-center">
              <span className="inline-block w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--iconFill)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <span className="text-sm text-[var(--primary-text)]">
                {debtor?.debtor_phone}{" "}
                <span className="text-[var(--primary-text)]">(Mobile)</span> |{" "}
                358-772-2657{" "}
                <span className="text-[var(--primary-text)]">(Work)</span>
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--iconFill)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span className="text-sm">{debtor?.debtor_employer_address}</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="var(--iconFill)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-sm">{debtor?.debtor_email}</span>
            </div>
          </div>
        </div>
        <div className="p-2 mt-4">
          <div className="text-left">
            <div className="text-[var(--primary-text)] text-sm">
              Total Outstanding
            </div>
            <div className="text-[var(--primary-text)] text-2xl font-semibold">
              £{caseDetails?.d_outstanding}
            </div>
          </div>
          <div className="text-left">
            <div className="text-[var(--primary-text)] text-sm">Payments</div>
            <div className="text-green-400 font-semibold">£2,534.00</div>
          </div>
        </div>
      </div>

      <div className="flex border-t border-[var(--underline)] mt-4 px-3 py-2 space-x-3">
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.0132028 4.15129C-3.38676e-10 4.69022 0 5.30205 0 6V8C0 10.8284 0 12.2426 0.87868 13.1213C1.75736 14 3.17157 14 6 14H12C14.8284 14 16.2426 14 17.1213 13.1213C18 12.2426 18 10.8284 18 8V6C18 5.30205 18 4.69022 17.9868 4.15129L9.97129 8.60436C9.36724 8.93994 8.63276 8.93994 8.02871 8.60436L0.0132028 4.15129ZM0.242967 2.02971C0.325845 2.05052 0.407399 2.08237 0.485643 2.12584L9 6.85604L17.5144 2.12584C17.5926 2.08237 17.6742 2.05052 17.757 2.02971C17.6271 1.55619 17.4276 1.18491 17.1213 0.87868C16.2426 0 14.8284 0 12 0H6C3.17157 0 1.75736 0 0.87868 0.87868C0.572448 1.18491 0.372942 1.55619 0.242967 2.02971Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.01814 0C3.60816 0 0 3.1 0 7C0 10.9 3.60816 14 8.01814 14C8.41905 14 8.81995 14 9.12064 13.9L14.0317 16V11.6C15.2345 10.4 16.0363 8.8 16.0363 7C16.0363 3.1 12.4281 0 8.01814 0Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 11 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.26893 9.84401L10.4331 11.8604C10.665 12.2621 10.5274 12.7758 10.1257 13.0077C7.95395 14.2615 5.19071 13.7277 3.64232 11.7551L3.55205 11.6401C2.38408 10.1521 1.43352 8.5057 0.72889 6.75022L0.674434 6.61455C-0.259693 4.28731 0.659589 1.62733 2.83134 0.373471C3.23304 0.141551 3.74668 0.279183 3.9786 0.680879L5.14278 2.69729C5.41892 3.17559 5.25505 3.78718 4.77675 4.06332L3.3871 4.86563C3.11738 5.02136 2.97756 5.33221 3.04 5.63734C3.40096 7.40124 4.32429 9.00049 5.67139 10.195C5.90442 10.4017 6.24353 10.436 6.51326 10.2803L7.90291 9.47798C8.3812 9.20184 8.99279 9.36571 9.26893 9.84401Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.01134 0H11.0249V4H5.01134V0ZM15.034 1H12.0272V3H14.0317V14H2.00454V3H4.00907V1H1.00227C0.400907 1 0 1.4 0 2V15C0 15.6 0.400907 16 1.00227 16H15.034C15.6354 16 16.0363 15.6 16.0363 15V2C16.0363 1.4 15.6354 1 15.034 1ZM6.31429 11.7L4.30975 9.7C3.90884 9.3 3.90884 8.7 4.30975 8.3C4.71066 7.9 5.31202 7.9 5.71292 8.3L7.01587 9.6L10.3234 6.3C10.7243 5.9 11.3256 5.9 11.7265 6.3C12.1274 6.7 12.1274 7.3 11.7265 7.7L7.71746 11.7C7.31655 12.1 6.81542 12.2 6.31429 11.7Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 4.5H5.5C3.61438 4.5 2.67157 4.5 2.08579 5.08579C1.5 5.67157 1.5 6.61438 1.5 8.5V9.5C1.5 9.9714 1.5 10.2071 1.64645 10.3536C1.79289 10.5 2.0286 10.5 2.5 10.5H5.75543C5.84375 10.5 5.88791 10.5 5.92127 10.482C5.94699 10.4681 5.9681 10.447 5.98199 10.4213C6 10.3879 6 10.3438 6 10.2554C6 9.66664 6 9.37224 6.1201 9.14984C6.21269 8.97837 6.35337 8.83769 6.52484 8.7451C6.74724 8.625 7.04164 8.625 7.63043 8.625H10.3696C10.9584 8.625 11.2528 8.625 11.4752 8.7451C11.6466 8.83769 11.7873 8.97837 11.8799 9.14984C12 9.37224 12 9.66664 12 10.2554C12 10.3438 12 10.3879 12.018 10.4213C12.0319 10.447 12.053 10.4681 12.0787 10.482C12.1121 10.5 12.1562 10.5 12.2446 10.5H14.5C15.4428 10.5 15.9142 10.5 16.2071 10.2071C16.5 9.91421 16.5 9.44281 16.5 8.5C16.5 6.61438 16.5 5.67157 15.9142 5.08579C15.3284 4.5 14.3856 4.5 12.5 4.5Z"
              fill="var(--iconFill)"
            />
            <path
              d="M5.25 2.80435C5.25 2.52139 5.25 2.37991 5.27843 2.26324C5.36688 1.90028 5.65028 1.61688 6.01324 1.52843C6.12991 1.5 6.27139 1.5 6.55435 1.5H11.4457C11.7286 1.5 11.8701 1.5 11.9868 1.52843C12.3497 1.61688 12.6331 1.90028 12.7216 2.26324C12.75 2.37991 12.75 2.52139 12.75 2.80435C12.75 2.84679 12.75 2.86801 12.7457 2.88551C12.7325 2.93996 12.69 2.98247 12.6355 2.99574C12.618 3 12.5968 3 12.5543 3H5.44565C5.40321 3 5.38199 3 5.36449 2.99574C5.31004 2.98247 5.26753 2.93996 5.25426 2.88551C5.25 2.86801 5.25 2.84679 5.25 2.80435Z"
              fill="var(--iconFill)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.75 15.0871V10.25C3.75 9.3072 3.75 8.83579 4.04289 8.5429C4.33579 8.25 4.80719 8.25 5.75 8.25L5.75 8.25L12.25 8.25C13.1928 8.25 13.6642 8.25 13.9571 8.54289C14.25 8.83579 14.25 9.30719 14.25 10.25V15.0871C14.25 15.3911 14.25 15.5431 14.1505 15.6182C14.0511 15.6932 13.9049 15.6514 13.6126 15.5679L11.7624 15.0392C11.6941 15.0198 11.66 15.01 11.625 15.01C11.59 15.01 11.5559 15.0198 11.4876 15.0392L9.13736 15.7108C9.06913 15.7302 9.03501 15.74 9 15.74C8.96499 15.74 8.93087 15.7302 8.86264 15.7108L6.51236 15.0392L6.51236 15.0392C6.44413 15.0197 6.41001 15.01 6.375 15.01C6.33999 15.01 6.30587 15.0197 6.23765 15.0392L6.23764 15.0392L4.38736 15.5679C4.09506 15.6514 3.9489 15.6932 3.84945 15.6182C3.75 15.5431 3.75 15.3911 3.75 15.0871ZM6.5 10.5C6.5 9.94771 6.94772 9.5 7.5 9.5L9.75 9.5C10.3023 9.5 10.75 9.94772 10.75 10.5C10.75 11.0523 10.3023 11.5 9.75 11.5L7.5 11.5C6.94772 11.5 6.5 11.0523 6.5 10.5ZM7.5 11.75C6.94772 11.75 6.5 12.1977 6.5 12.75C6.5 13.3023 6.94772 13.75 7.5 13.75L10.875 13.75C11.4273 13.75 11.875 13.3023 11.875 12.75C11.875 12.1977 11.4273 11.75 10.875 11.75L7.5 11.75Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="17" cy="8" r="4" fill="var(--iconFill)" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15 8C15 6.89543 15.8954 6 17 6C18.1046 6 19 6.89543 19 8H15ZM11 8C11 7.29873 11.1203 6.62556 11.3414 6H5C4.44772 6 4 6.44772 4 7C4 7.55228 4.44772 8 5 8H11ZM11.8027 11C12.2671 11.8028 12.9121 12.488 13.6822 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11.8027ZM5 16C4.44772 16 4 16.4477 4 17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17C20 16.4477 19.5523 16 19 16H5Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.16879 1.25253C0.583008 1.83832 0.583008 2.78113 0.583008 4.66674V12.2501C0.583008 14.1357 0.583008 15.0785 1.16879 15.6643C1.75458 16.2501 2.69739 16.2501 4.583 16.2501H9.41634C11.302 16.2501 12.2448 16.2501 12.8306 15.6643C13.4163 15.0785 13.4163 14.1357 13.4163 12.2501V4.66675C13.4163 2.78113 13.4163 1.83832 12.8306 1.25253C12.2448 0.666748 11.302 0.666748 9.41634 0.666748H4.58301C2.69739 0.666748 1.75458 0.666748 1.16879 1.25253ZM4.24967 4.25008C3.69739 4.25008 3.24967 4.6978 3.24967 5.25008C3.24967 5.80237 3.69739 6.25008 4.24967 6.25008H9.74967C10.302 6.25008 10.7497 5.80237 10.7497 5.25008C10.7497 4.6978 10.302 4.25008 9.74967 4.25008H4.24967ZM4.24967 7.91675C3.69739 7.91675 3.24967 8.36446 3.24967 8.91675C3.24967 9.46903 3.69739 9.91675 4.24967 9.91675H9.74967C10.302 9.91675 10.7497 9.46903 10.7497 8.91675C10.7497 8.36446 10.302 7.91675 9.74967 7.91675H4.24967ZM4.24967 11.5834C3.69739 11.5834 3.24967 12.0311 3.24967 12.5834C3.24967 13.1357 3.69739 13.5834 4.24967 13.5834H7.91634C8.46863 13.5834 8.91634 13.1357 8.91634 12.5834C8.91634 12.0311 8.46863 11.5834 7.91634 11.5834H4.24967Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.835115 5.08325H19.1642C19.151 3.1426 19.0554 2.08318 18.3609 1.38871C17.5554 0.583252 16.2591 0.583252 13.6663 0.583252H6.33301C3.74028 0.583252 2.44392 0.583252 1.63846 1.38871C0.943989 2.08318 0.848299 3.1426 0.835115 5.08325ZM19.1663 7.08325H0.833008V8.83325C0.833008 11.426 0.833008 12.7223 1.63846 13.5278C2.44392 14.3333 3.74028 14.3333 6.333 14.3333H6.33301H13.6663H13.6664C16.2591 14.3333 17.5554 14.3333 18.3609 13.5278C19.1663 12.7223 19.1663 11.426 19.1663 8.83325V7.08325ZM5.41634 9.66659C4.86406 9.66659 4.41634 10.1143 4.41634 10.6666C4.41634 11.2189 4.86406 11.6666 5.41634 11.6666H5.42551C5.97779 11.6666 6.42551 11.2189 6.42551 10.6666C6.42551 10.1143 5.97779 9.66659 5.42551 9.66659H5.41634Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <div className="relative">
          <button
            className="p-2 text-slate-400 hover:bg-[var(--iconHover)] rounded"
            ref={dropdownButtonRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="var(--iconFill)"
              className="bi bi-three-dots-vertical"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </g>
            </svg>
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownMenuRef}
              className="absolute right-0 mt-2 w-56 bg-[var(--background)] border border-[var(--border)] rounded-md shadow-lg z-10"
            >
              <div className="py-1">
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📋</span> Account Payments
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📧</span> Payment Plan
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📄</span> Letter
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📧</span> Adjust Debt
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📧</span> Case Participants
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">⏸️</span> Freeze Interest
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📧</span> Forms
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📁</span> Doc Bundling
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">📊</span> Income and Expense
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">👥</span> Make Joint Liability
                </button>
                <button className="flex items-center w-full text-left px-4 py-2 text-sm text-[var(--sidebar-foreground)] hover:bg-[var(--tableRowHover)]">
                  <span className="mr-2">≡</span> Variables List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
