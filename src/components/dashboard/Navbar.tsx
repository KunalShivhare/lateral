import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname.startsWith("/dashboard/");
    }
    return location.pathname === path;
  };

  return (
    <div className="h-14 bg-black flex items-center px-6">
      <div className="flex space-x-10">
        <Link
          to="/dashboard1"
          className={`text-white font-medium ${
            isActive("/dashboard") ? "text-blue-500" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/customers"
          className={`text-white font-medium ${
            isActive("/customers") ? "text-blue-500" : ""
          }`}
        >
          Customers
        </Link>
        <Link
          to="/invoices"
          className={`text-white font-medium ${
            isActive("/invoices") ? "text-blue-500" : ""
          }`}
        >
          Invoices
        </Link>
        <Link
          to="/reports"
          className={`text-white font-medium ${
            isActive("/reports") ? "text-blue-500" : ""
          }`}
        >
          Reports
        </Link>
        {isActive("/cases") ? (
          <></>
        ) : (
          <Link
            to="/"
            className={`text-white font-medium ${
              isActive("/") ? "text-blue-500" : ""
            }`}
          >
            Cases
          </Link>
        )}
      </div>
    </div>
  );
}
