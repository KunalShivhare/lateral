import { createContext, ReactNode, useContext, useState } from "react";

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isNewSearchActive: boolean;
  setIsNewSearchActive: (active: boolean) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewSearchActive, setIsNewSearchActive] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isNewSearchActive,
        setIsNewSearchActive,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
