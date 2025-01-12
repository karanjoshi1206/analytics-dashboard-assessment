export interface WorkerPayload {
  type: WorkerType;
  data: any;
}

export enum WorkerType {
  Location = "location",
  Brand = "brand",
  VehicleType = "vehicleType",
  Eligible = "eligible",
  VehicleTable = "vehicleTable"
}
