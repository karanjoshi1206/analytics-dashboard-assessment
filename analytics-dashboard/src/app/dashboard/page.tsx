"use client";

import { SheetContextProvider } from "@/context/useSheetData";
import CountryChart from "./_components/countryChart";
import BranchChart from "./_components/brandChart";
import VehichleTypeChart from "./_components/vehichleTypeChart";
import EligibleChart from "./_components/eligibleChart";
import { DataTable } from "./_components/sheetTable/sheetTable";

const Dashboard = () => {
  return (
    <SheetContextProvider>
      <div className="m-2">
        <CountryChart />
        <div className="flex flex-1 w-full my-2 gap-2 flex-col md:flex-row">
          <BranchChart />
          <EligibleChart />
        </div>
        <VehichleTypeChart />

        <div className="my-4 p-4 border rounded-md shadow-sm bg-background">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold leading-tight">Vehicle Data</h2>
              <p className="text-sm text-muted-foreground">Detailed specifications and information about the selected vehicle.</p>
            </div>
          </div>

          <DataTable />
        </div>
      </div>
    </SheetContextProvider>
  );
};

export default Dashboard;
