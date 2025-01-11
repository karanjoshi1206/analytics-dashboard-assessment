import Csv from "@/models/csv";
export type VehicleTypeData = {
  year: number;
  make: string;
  type: string;
};

const useVehicleTypeData = ({ sheetData = [] }: { sheetData: Csv[] }) => {
  const vehicleTypeData: VehicleTypeData[] = sheetData.map<VehicleTypeData>((item) => {
    return {
      year: item["Model Year"],
      make: item.Make,
      type: item["Electric Vehicle Type"]
    };
  });

  return { vehicleTypeData };
};

export default useVehicleTypeData;
