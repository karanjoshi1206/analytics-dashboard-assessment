import Csv from "@/models/csv";
import { WorkerType } from "@/workers/model";
import { useWorker } from "../useWorker";

export type CityData = {
  label: string;
  count: number;
};

export type CountyData = {
  label: string;
  count: number;
};

const useLocationViseData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  const { loading, result } = useWorker<{ loading: boolean; cityData: CityData[]; countyData: CountyData[] }>({ type: WorkerType.Location, data: sheetData });
  const cityData = result?.cityData || [];
  const countyData = result?.countyData || [];

  return { cityData, countyData, loading };
};

export default useLocationViseData;
