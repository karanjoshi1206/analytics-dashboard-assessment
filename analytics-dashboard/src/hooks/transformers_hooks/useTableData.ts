import Csv from "@/models/csv";
import { useWorker } from "../useWorker";
import { WorkerType } from "@/workers/model";

export interface VehicleTableData {
  year: number;
  make: string;
  name: string;
  eligibility: string;
  electricRange: number;
  vehicleType: string;
  county: string;
  city: string;
  electricUtility: string;
}

const useTableData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  const { loading, result } = useWorker<{ loading: boolean; vehicleTableData: VehicleTableData[] }>({ type: WorkerType.VehicleTable, data: sheetData });

  const vehicleTableData = result?.vehicleTableData || [];

  return { loading, vehicleTableData };
};

export default useTableData;
