import Csv from "@/models/csv";
import { WorkerPayload, WorkerType } from "./model";
import { CityData, CountyData } from "@/hooks/transformers_hooks/useLocationViseData";
import { EligibleData } from "@/hooks/transformers_hooks/useEligibleData";
import { VehicleTypeData } from "@/hooks/transformers_hooks/useVehicleTypeData";
import { BrandData } from "@/hooks/transformers_hooks/useBrandData";
import { VehicleTableData } from "@/hooks/transformers_hooks/useTableData";

addEventListener("message", (event: MessageEvent<WorkerPayload>) => {
  const sheetData = event.data.data as Csv[];
  let result: any;

  switch (event.data.type) {
    case WorkerType.Location: {
      const cityData: CityData[] = sheetData?.reduce<CityData[]>((acc, item) => {
        const existing = acc?.find((entry) => entry.label === item.City);
        if (existing) {
          existing.count += 1;
        } else {
          acc?.push({ label: item.City, count: 1 });
        }
        return acc;
      }, []);

      const countyData: CountyData[] = sheetData?.reduce<CountyData[]>((acc, item) => {
        const existing = acc?.find((entry) => entry.label === item.County);
        if (existing) {
          existing.count += 1;
        } else {
          acc?.push({ label: item.County, count: 1 });
        }
        return acc;
      }, []);

      result = { cityData, countyData };

      break;
    }

    case WorkerType.Eligible: {
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
      result = { eligibleData };
      break;
    }
    case WorkerType.VehicleType: {
      const vehicleTypeData: VehicleTypeData[] = sheetData.map<VehicleTypeData>((item) => {
        return {
          year: item["Model Year"],
          make: item.Make,
          type: item["Electric Vehicle Type"]
        };
      });

      result = { vehicleTypeData };
      break;
    }

    case WorkerType.Brand: {
      const brandData: BrandData[] = sheetData
        .reduce<BrandData[]>((acc, curr) => {
          const brand = curr.Make;
          const existingBrand = acc.find((item) => item.brand === brand);

          if (existingBrand) {
            existingBrand.total += 1;
          } else {
            acc.push({ total: 1, brand });
          }

          return acc;
        }, [])
        .map((item, idx) => {
          return {
            ...item,
            fill: `hsl(var(--chart-${idx + 1}))`
          };
        });

      const chartConfig: { [key: string]: { label: string; color: string } } = brandData.reduce((acc: { [key: string]: { label: string; color: string } }, curr, index) => {
        acc[curr.brand] = {
          label: curr.brand,
          color: `hsl(var(--chart-${index + 1}))`
        };
        return acc;
      }, {});

      result = {
        brandData,
        chartConfig
      };
      break;
    }

    case WorkerType.VehicleTable: {
      const vehicleTableData: VehicleTableData[] = sheetData.map((item) => {
        return {
          year: item["Model Year"],
          name: item.Model,
          make: item.Make,
          electricRange: item["Electric Range"],
          eligibility: item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
          city: item.City,
          county: item.County,
          electricUtility: item["Electric Utility"],
          vehicleType: item["Electric Vehicle Type"]
        };
      });

      result = { vehicleTableData };
      break;
    }
  }

  postMessage({ result, type: event.data.type });
});
