"use client";

import { SheetContextProvider } from "@/context/useSheetData";
import CountryChart from "./_components/countryChart";
import BranchChart from "./_components/brandChart";
import VehichleTypeChart from "./_components/vehichleTypeChart";
import EligibleChart from "./_components/eligibleChart";

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
      </div>
    </SheetContextProvider>
  );
};

export default Dashboard;
