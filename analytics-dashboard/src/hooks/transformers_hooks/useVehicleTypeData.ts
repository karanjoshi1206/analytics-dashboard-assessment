import Csv from "@/models/csv";
import { useWorker } from "../useWorker";
import { WorkerType } from "@/workers/model";
export type VehicleTypeData = {
  year: number;
  make: string;
  type: string;
};

const useVehicleTypeData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  const { loading, result } = useWorker<{ loading: boolean; vehicleTypeData: VehicleTypeData[] }>({ data: sheetData, type: WorkerType.VehicleType });
  const vehicleTypeData = result?.vehicleTypeData || [];

  return { vehicleTypeData, loading };
};

export default useVehicleTypeData;
