import Csv from "@/models/csv";
import { WorkerType } from "@/workers/model";
import { useWorker } from "../useWorker";

export type EligibleData = {
  year: number;
  total: number;
};

const useEligibleData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  const { loading, result } = useWorker<{ loading: boolean; eligibleData: EligibleData[] }>({ type: WorkerType.Eligible, data: sheetData });

  const smallestYear = result?.eligibleData.sort((a, b) => a.year - b.year)[0]?.year || 0;
  const largestYear = result?.eligibleData.sort((a, b) => b.year - a.year)[0]?.year || 0;
  const mostEligible = result?.eligibleData.sort((a, b) => b.total - a.total)[0]?.year || 0;

  return { eligibleData: result?.eligibleData || [], loading, smallestYear, largestYear,mostEligible };
};

export default useEligibleData;
