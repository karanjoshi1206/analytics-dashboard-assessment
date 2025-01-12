import Csv from "@/models/csv";
import { useWorker } from "../useWorker";
import { WorkerType } from "@/workers/model";
import { ChartConfig } from "@/components/ui/chart";

export type BrandData = {
  total: number;
  brand: string;
};

const useBrandData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  // const brandData: BrandData[] = sheetData
  //   .reduce<BrandData[]>((acc, curr) => {
  //     const brand = curr.Make;
  //     const existingBrand = acc.find((item) => item.brand === brand);

  //     if (existingBrand) {
  //       existingBrand.total += 1;
  //     } else {
  //       acc.push({ total: 1, brand });
  //     }

  //     return acc;
  //   }, [])
  //   .map((item, idx) => {
  //     return {
  //       ...item,
  //       fill: `hsl(var(--chart-${idx + 1}))`
  //     };
  //   });

  // const chartConfig: { [key: string]: { label: string; color: string } } = brandData.reduce((acc: { [key: string]: { label: string; color: string } }, curr, index) => {
  //   acc[curr.brand] = {
  //     label: curr.brand,
  //     color: `hsl(var(--chart-${index + 1}))`
  //   };
  //   return acc;
  // }, {});

  // return {
  //   brandData,
  //   chartConfig
  // };

  const { loading, result } = useWorker<{ loading: boolean; brandData: BrandData[]; chartConfig: ChartConfig }>({ data: sheetData, type: WorkerType.Brand });
  const brandData = result?.brandData || [];
  const chartConfig = result?.chartConfig || {};

  return { brandData, chartConfig, loading };
};

export default useBrandData;
