import Csv from "@/models/csv";

const useCityViseData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  type CityData = {
    label: string;
    count: number;
  };
  const cityData: CityData[] = sheetData?.reduce<CityData[]>((acc, item) => {
    const existing = acc?.find((entry) => entry.label === item.City);
    if (existing) {
      existing.count += 1;
    } else {
      acc?.push({ label: item.City, count: 1 });
    }
    return acc;
  }, []);

  return { cityData };
};

export default useCityViseData;
