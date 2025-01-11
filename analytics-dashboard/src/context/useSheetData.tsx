import useCsv from "@/hooks/useCsv";
import Csv from "@/models/csv";
import { createContext, ReactNode, useContext } from "react";

export const SheetContext = createContext<{ sheetData: Csv[]; loading: boolean }>({ sheetData: [], loading: false });

export function useSheetContext() {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error("useSheetContext must be used within a SheetContextProvider");
  }
  return context;
}

interface SheetContextProviderProps {
  children: ReactNode;
}

export function SheetContextProvider({ children }: SheetContextProviderProps) {
  const { data: sheetData, loading } = useCsv();

  return <SheetContext.Provider value={{ sheetData: sheetData, loading: loading }}>{children}</SheetContext.Provider>;
}
