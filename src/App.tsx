import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "./components/theme-provider";
import { client } from "./_lib/apollo-client";
import { Dashboard } from "./components/dashboard/Dashboard";
import { CaseList } from "./components/case-list/CaseList";
import { Customers } from "./components/customers/Customers";
import { Invoices } from "./components/invoices/Invoices";
import { Reports } from "./components/reports/Reports";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { Dashboard1 } from "./components/dashboard/dashboard1";

/*
// Original code (commented out as requested):
function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Shell className="">
          <FeatureFlagsProvider>
            <React.Suspense
              fallback={<Skeleton className="h-[400px] w-full" />}
            >
              <CustomTable />
            </React.Suspense>
          </FeatureFlagsProvider>
        </Shell>
      </ThemeProvider>
    </ApolloProvider>
  );
}
*/

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/dashboard/:caseId" element={<Dashboard />} />
              <Route path="/dashboard1" element={<Dashboard1 />} />
              {/* <Route path="/cases" element={<CaseList />} /> */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/" element={<CaseList />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
