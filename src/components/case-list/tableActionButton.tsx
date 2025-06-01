import { useState, useRef, useEffect } from "react";

interface SavedView {
  id: string;
  view_name: string;
  views: any;
}

interface TableActionButtonsProps {
  hasSelectedRows?: boolean;
  savedViews?: SavedView[];
  viewsLoading?: boolean;
  onCreateView?: () => void;
  onSelectView?: (viewId: string) => void;
}

const TableActionButtons = ({
  hasSelectedRows,
  savedViews = [],
  viewsLoading = false,
  onCreateView,
  onSelectView,
}: TableActionButtonsProps) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // No need to query for saved views as they're passed as props

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSettingsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateNewView = () => {
    setShowSettingsDropdown(false);
    if (onCreateView) {
      onCreateView();
    } else {
      console.log("Create new view");
    }
  };

  const handleSelectView = (viewId: string) => {
    setShowSettingsDropdown(false);
    if (onSelectView) {
      onSelectView(viewId);
    } else {
      console.log("Selected view:", viewId);
    }
  };
  return (
    <div className="flex items-center gap-2 mb-4 border-t border-b border-[var(--border)]">
      {hasSelectedRows && (
        <div>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="var(--iconFill)" />
              <path
                d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z"
                fill="var(--iconFill)"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="16"
                y="9"
                width="4"
                height="4"
                rx="2"
                transform="rotate(90 16 9)"
                fill="var(--iconFill)"
                stroke="var(--iconFill)"
                stroke-width="2"
              />
              <rect
                x="20"
                y="17"
                width="4"
                height="4"
                rx="2"
                transform="rotate(90 20 17)"
                fill="var(--iconFill)"
                stroke="var(--iconFill)"
                stroke-width="2"
              />
              <path
                d="M5 4V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H16"
                stroke="var(--iconFill)"
                stroke-width="2"
              />
              <path
                d="M5 7V7C5 8.88562 5 9.82843 5.58579 10.4142C6.17157 11 7.11438 11 9 11H12"
                stroke="var(--iconFill)"
                stroke-width="2"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18L18 12L12 6"
                stroke="var(--iconFill)"
                stroke-width="2"
              />
              <path
                d="M6 18L12 12L6 6"
                stroke="var(--iconFill)"
                stroke-width="2"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15.3431C16.1606 3 16.5694 3 16.9369 3.15224C17.3045 3.30448 17.5935 3.59351 18.1716 4.17157L19.8284 5.82843C20.4065 6.40649 20.6955 6.69552 20.8478 7.06306C21 7.4306 21 7.83935 21 8.65685V15C21 17.8284 21 19.2426 20.1213 20.1213C19.48 20.7626 18.5534 20.9359 17 20.9827V18L17 17.9384C17.0001 17.2843 17.0001 16.6965 16.9362 16.2208C16.8663 15.7015 16.7042 15.1687 16.2678 14.7322C15.8313 14.2958 15.2985 14.1337 14.7792 14.0638C14.3034 13.9999 13.7157 13.9999 13.0616 14L13 14H10L9.93839 14C9.28427 13.9999 8.69655 13.9999 8.22084 14.0638C7.70149 14.1337 7.16867 14.2958 6.73223 14.7322C6.29579 15.1687 6.13366 15.7015 6.06383 16.2208C5.99988 16.6965 5.99993 17.2843 6 17.9384L6 18V20.9239C5.02491 20.828 4.36857 20.6112 3.87868 20.1213C3 19.2426 3 17.8284 3 15V9ZM15 18V21H9C8.64496 21 8.31221 21 8 20.9983V18C8 17.2646 8.00212 16.8137 8.046 16.4873C8.08457 16.2005 8.13942 16.1526 8.14592 16.1469L8.14645 16.1464L8.14692 16.1459C8.1526 16.1394 8.20049 16.0846 8.48734 16.046C8.81369 16.0021 9.26462 16 10 16H13C13.7354 16 14.1863 16.0021 14.5127 16.046C14.7995 16.0846 14.8474 16.1394 14.8531 16.1459L14.8536 16.1464L14.8541 16.1469C14.8606 16.1526 14.9154 16.2005 14.954 16.4873C14.9979 16.8137 15 17.2646 15 18ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H12C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7H7Z"
                fill="var(--iconFill)"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2V7L12 7.05441C11.9999 7.47848 11.9998 7.8906 12.0455 8.23052C12.097 8.61372 12.2226 9.051 12.5858 9.41421C12.949 9.77743 13.3863 9.90295 13.7695 9.95447C14.1094 10.0002 14.5215 10.0001 14.9456 10H14.9456H14.9456H14.9456L15 10H20V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H12ZM14 2.00462V7C14 7.49967 14.0021 7.77383 14.0277 7.96402L14.0287 7.97131L14.036 7.97231C14.2262 7.99788 14.5003 8 15 8H19.9954C19.9852 7.58836 19.9525 7.31595 19.8478 7.06306C19.6955 6.69552 19.4065 6.40649 18.8284 5.82843L16.1716 3.17157C15.5935 2.59351 15.3045 2.30448 14.9369 2.15224C14.684 2.04749 14.4116 2.01481 14 2.00462ZM8 13C8 12.4477 8.44772 12 9 12L15 12C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14L9 14C8.44772 14 8 13.5523 8 13ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z"
                fill="var(--iconFill)"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.51669 4.79613C5.84343 6.09112 4 8.83028 4 12C4 12.1969 4.00711 12.3921 4.0211 12.5855L10.1629 10.9398L8.51669 4.79613ZM11.4148 4.02107L13.1901 10.6463L13.2017 10.6897C13.2517 10.8754 13.3222 11.1373 13.3532 11.3775C13.3922 11.6802 13.4014 12.159 13.1197 12.6469C12.838 13.1348 12.4188 13.3662 12.1371 13.4838C11.9136 13.5771 11.6515 13.647 11.4657 13.6965L11.4223 13.7081L4.79626 15.4836C6.0913 18.1567 8.83039 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C11.8032 4 11.6081 4.00711 11.4148 4.02107Z"
                fill="var(--iconFill)"
              />
              <path
                d="M9.92945 4.27259C9.67849 3.33602 9.55302 2.86773 9.12083 2.67286C8.68865 2.47799 8.30723 2.66782 7.54439 3.04748C6.97028 3.33321 6.42361 3.67419 5.91239 4.06647C4.87054 4.8659 3.99636 5.86272 3.33975 7C2.68314 8.13728 2.25696 9.39275 2.08555 10.6947C2.00144 11.3336 1.97948 11.9775 2.01909 12.6176C2.07171 13.4681 2.09803 13.8933 2.48288 14.1701C2.86773 14.447 3.33602 14.3215 4.27259 14.0706L10.0681 12.5176C10.9788 12.2736 11.4342 12.1516 11.6413 11.7929C11.8484 11.4342 11.7264 10.9788 11.4824 10.0681L9.92945 4.27259Z"
                fill="var(--iconFill)"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.9444 15.002C21.0056 15.5509 20.5522 16 19.9999 16H16.9948C16.4425 16 16.0071 15.5455 15.8703 15.0104C15.7351 14.4818 15.4926 13.9845 15.156 13.5508L18.7074 9.99928C19.9576 11.3965 20.7375 13.1468 20.9444 15.002ZM18.0003 9.29219C16.4786 7.93089 14.5384 7.12726 12.4999 7.01392V12.0365C13.21 12.126 13.8833 12.4049 14.4488 12.8437L18.0003 9.29219ZM9.55095 12.8437C10.1164 12.4049 10.7898 12.126 11.4999 12.0365V7.01392C9.46131 7.12726 7.5211 7.9309 5.99944 9.2922L9.55095 12.8437ZM5.29232 9.9993C4.04219 11.3966 3.26231 13.1468 3.05536 15.002C2.99413 15.5509 3.4476 16 3.99988 16H7.00494C7.55722 16 7.99262 15.5455 8.12944 15.0104C8.26462 14.4818 8.50718 13.9845 8.84381 13.5508L5.29232 9.9993Z"
                fill="var(--iconFill)"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              fill="var(--iconFill)"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z" />
                <path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z" />
              </g>
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z"
                fill="var(--iconFill)"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3252 15.0763C12.8886 15.0257 12.4458 15 12.0002 15C10.019 15 8.09316 15.5085 6.52137 16.4465C5.30093 17.1749 4.34691 18.1307 3.74132 19.2183C3.46663 19.7117 3.79586 20.2902 4.34868 20.4054C7.85703 21.1365 11.444 21.3594 15.0002 21.074V21H14.0002C12.3434 21 11.0002 19.6569 11.0002 18C11.0002 16.5753 11.9934 15.3825 13.3252 15.0763Z"
                fill="var(--iconFill)"
              />
              <path
                d="M18 14L18 22"
                stroke="var(--iconFill)"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M22 18L14 18"
                stroke="var(--iconFill)"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <circle cx="12" cy="8" r="5" fill="var(--iconFill)" />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded">
            <svg
              width="24px"
              height="24px"
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
        </div>
      )}
      <div className="flex items-center ml-auto gap-2">
        <button className="p-2 hover:bg-slate-800 rounded">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="var(--iconFill)"
              stroke-width="2"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-slate-800 rounded">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="var(--iconFill)"
              stroke-width="2"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-slate-800 rounded">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.0508 6H9.00005C10.1046 6 11 6.89543 11 8C11 9.10457 10.1046 10 9.00005 10H7.00005V11H9.00005C10.1046 11 11 11.8954 11 13C11 14.1046 10.1046 15 9.00005 15H7.00005V16H9.00005C10.1046 16 11 16.8954 11 18C11 19.1046 10.1046 20 9.00005 20H7.29248C7.36869 20.1568 7.46475 20.2931 7.58584 20.4142C8.17162 21 9.11443 21 11 21H16C17.8857 21 18.8285 21 19.4143 20.4142C20 19.8284 20 18.8856 20 17V8C20 6.11438 20 5.17157 19.4143 4.58579C18.8285 4 17.8857 4 16 4H11C9.11443 4 8.17162 4 7.58584 4.58579C7.25924 4.91238 7.11474 5.34994 7.0508 6ZM16 11C15.4477 11 15 10.5523 15 10V8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8V10C17 10.5523 16.5523 11 16 11ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H9C9.55228 9 10 8.55228 10 8C10 7.44772 9.55228 7 9 7H5ZM5 12C4.44772 12 4 12.4477 4 13C4 13.5523 4.44772 14 5 14H9C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12H5ZM5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19H9C9.55228 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17H5Z"
              fill="var(--iconFill)"
            />
          </svg>
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className="p-2 hover:bg-slate-800 rounded"
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.9838 2.54161C14.0711 2.71093 14.0928 2.92777 14.1361 3.36144C14.2182 4.1823 14.2593 4.59274 14.4311 4.81793C14.649 5.10358 15.0034 5.25038 15.3595 5.20248C15.6402 5.16472 15.9594 4.90352 16.5979 4.38113C16.9352 4.10515 17.1038 3.96716 17.2853 3.90918C17.5158 3.83555 17.7652 3.84798 17.9872 3.94419C18.162 4.01994 18.3161 4.17402 18.6243 4.4822L19.5178 5.37567C19.8259 5.68385 19.98 5.83794 20.0558 6.01275C20.152 6.23478 20.1644 6.48415 20.0908 6.71464C20.0328 6.89612 19.8948 7.06478 19.6188 7.4021C19.0964 8.0406 18.8352 8.35984 18.7975 8.64056C18.7496 8.99662 18.8964 9.35102 19.182 9.56893C19.4072 9.74072 19.8176 9.78176 20.6385 9.86385C21.0722 9.90722 21.2891 9.92891 21.4584 10.0162C21.6734 10.1272 21.841 10.3123 21.9299 10.5373C22 10.7145 22 10.9324 22 11.3682V12.6319C22 13.0676 22 13.2855 21.93 13.4626C21.841 13.6877 21.6734 13.8729 21.4583 13.9838C21.289 14.0711 21.0722 14.0928 20.6386 14.1361L20.6386 14.1361C19.818 14.2182 19.4077 14.2592 19.1825 14.4309C18.8967 14.6489 18.7499 15.0034 18.7979 15.3596C18.8357 15.6402 19.0968 15.9593 19.619 16.5976C19.8949 16.9348 20.0328 17.1034 20.0908 17.2848C20.1645 17.5154 20.152 17.7648 20.0558 17.9869C19.98 18.1617 19.826 18.3157 19.5179 18.6238L18.6243 19.5174C18.3162 19.8255 18.1621 19.9796 17.9873 20.0554C17.7652 20.1516 17.5159 20.164 17.2854 20.0904C17.1039 20.0324 16.9352 19.8944 16.5979 19.6184L16.5979 19.6184C15.9594 19.096 15.6402 18.8348 15.3595 18.7971C15.0034 18.7492 14.649 18.896 14.4311 19.1816C14.2593 19.4068 14.2183 19.8173 14.1362 20.6383C14.0928 21.0722 14.0711 21.2891 13.9837 21.4585C13.8728 21.6735 13.6877 21.8409 13.4628 21.9299C13.2856 22 13.0676 22 12.6316 22H11.3682C10.9324 22 10.7145 22 10.5373 21.9299C10.3123 21.841 10.1272 21.6734 10.0162 21.4584C9.92891 21.2891 9.90722 21.0722 9.86385 20.6385C9.78176 19.8176 9.74072 19.4072 9.56892 19.182C9.35101 18.8964 8.99663 18.7496 8.64057 18.7975C8.35985 18.8352 8.04059 19.0964 7.40208 19.6189L7.40206 19.6189C7.06473 19.8949 6.89607 20.0329 6.71458 20.0908C6.4841 20.1645 6.23474 20.152 6.01272 20.0558C5.8379 19.9801 5.6838 19.826 5.37561 19.5178L4.48217 18.6243C4.17398 18.3162 4.01988 18.1621 3.94414 17.9873C3.84794 17.7652 3.8355 17.5159 3.90913 17.2854C3.96711 17.1039 4.10511 16.9352 4.3811 16.5979C4.90351 15.9594 5.16471 15.6402 5.20247 15.3594C5.25037 15.0034 5.10357 14.649 4.81792 14.4311C4.59273 14.2593 4.1823 14.2182 3.36143 14.1361C2.92776 14.0928 2.71093 14.0711 2.54161 13.9838C2.32656 13.8728 2.15902 13.6877 2.07005 13.4627C2 13.2855 2 13.0676 2 12.6318V11.3683C2 10.9324 2 10.7144 2.07008 10.5372C2.15905 10.3123 2.32654 10.1272 2.54152 10.0163C2.71088 9.92891 2.92777 9.90722 3.36155 9.86384H3.36155H3.36156C4.18264 9.78173 4.59319 9.74068 4.81842 9.56881C5.10395 9.35092 5.2507 8.99664 5.20287 8.64066C5.16514 8.35987 4.90385 8.04052 4.38128 7.40182C4.10516 7.06435 3.96711 6.89561 3.90914 6.71405C3.83557 6.48364 3.848 6.23438 3.94413 6.01243C4.01988 5.83754 4.17403 5.68339 4.48233 5.37509L5.37565 4.48177L5.37566 4.48177C5.68385 4.17357 5.83795 4.01947 6.01277 3.94373C6.23478 3.84753 6.48414 3.8351 6.71463 3.90872C6.89612 3.9667 7.06481 4.10472 7.4022 4.38076C8.04061 4.9031 8.35982 5.16427 8.64044 5.20207C8.99661 5.25003 9.35113 5.10319 9.56907 4.81742C9.74077 4.59227 9.78181 4.18195 9.86387 3.36131C9.90722 2.92776 9.9289 2.71098 10.0162 2.5417C10.1271 2.32658 10.3123 2.15898 10.5374 2.07001C10.7145 2 10.9324 2 11.3681 2H12.6318C13.0676 2 13.2855 2 13.4627 2.07005C13.6877 2.15902 13.8728 2.32656 13.9838 2.54161ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                fill="var(--iconFill)"
              />
            </svg>
          </button>

          {showSettingsDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-md shadow-lg z-50 border border-slate-700">
              <div className="py-1">
                <button
                  onClick={handleCreateNewView}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-800 flex items-center font-medium"
                >
                  <svg
                    className="mr-2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4V20M4 12H20"
                      stroke="var(--iconFill)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Create New View
                </button>
              </div>

              <div className="border-t border-slate-700">
                <div className="py-1">
                  {viewsLoading ? (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      Loading views...
                    </div>
                  ) : savedViews && savedViews.length > 0 ? (
                    savedViews.map((view: SavedView) => (
                      <button
                        key={view.id}
                        onClick={() => handleSelectView(view.id)}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-800"
                      >
                        {view.view_name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      No saved views
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableActionButtons;
