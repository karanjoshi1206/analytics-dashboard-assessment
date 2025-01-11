import Csv from "@/models/csv";

type EligibleData = {
  year: number;
  total: number;
};

const useEligibleData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  const eligibleData: EligibleData[] = sheetData
    .reduce<EligibleData[]>((acc, item) => {
      const existing = acc?.find((entry) => entry.year === item["Model Year"] && item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === "Clean Alternative Fuel Vehicle Eligible");
      if (existing) {
        existing.total += 1;
      } else {
        acc.push({ year: item["Model Year"], total: 1 });
      }
      return acc;
    }, [])
    ?.filter((item) => item.total !== 1);

  return { eligibleData };
};

export default useEligibleData;
