import Csv from "@/models/csv";

const useCountyViseData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  type CountyData = {
    label: string;
    count: number;
  };
  const countyData: CountyData[] = sheetData?.reduce<CountyData[]>((acc, item) => {
    const existing = acc?.find((entry) => entry.label === item.County);
    if (existing) {
      existing.count += 1;
    } else {
      acc?.push({ label: item.County, count: 1 });
    }
    return acc;
  }, []);

  return { countyData };
};

export default useCountyViseData;
