import Csv from "@/models/csv";
import { WorkerType } from "@/workers/model";
import { useWorker } from "../useWorker";

export type EligibleData = {
  year: number;
  total: number;
};

const useEligibleData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  const { loading, result } = useWorker<{ loading: boolean; eligibleData: EligibleData[] }>({ type: WorkerType.Eligible, data: sheetData });

  return { eligibleData: result?.eligibleData || [], loading };
};

export default useEligibleData;
