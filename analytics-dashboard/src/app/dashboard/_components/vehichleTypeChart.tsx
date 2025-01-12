import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useSheetContext } from "@/context/useSheetData";
import useVehicleTypeData, { VehicleTypeData } from "@/hooks/transformers_hooks/useVehicleTypeData";
import { PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
const processData = (data: VehicleTypeData[]) => {
  const sortedData = data.sort((a, b) => a.year - b.year);
  let bevCount = 0;
  let phevCount = 0;

  return sortedData.reduce((acc: any, item) => {
    if (item.type.includes("BEV")) {
      bevCount++;
    } else if (item.type.includes("PHEV")) {
      phevCount++;
    }

    const existingEntry: any = acc.find((entry: any) => entry.year === item.year);
    if (existingEntry) {
      existingEntry.BEV = bevCount;
      existingEntry.PHEV = phevCount;
    } else {
      acc.push({ year: item.year, BEV: bevCount, PHEV: phevCount });
    }

    return acc;
  }, []);
};

const VehichleTypeChart = () => {
  const { sheetData, loading: sheetLoading } = useSheetContext();

  const { vehicleTypeData, loading } = useVehicleTypeData({ sheetData: sheetData });
  const chartData = processData(vehicleTypeData);

  const chartConfig = {
    BEV: {
      label: "Battery Electric Vehicle",
      color: "hsl(var(--chart-1))"
    },
    PHEV: {
      label: "Plug-in Hybrid Electric Vehicle",
      color: "hsl(var(--chart-2))"
    }
  };

  if (loading || sheetLoading) {
    return (
      <Card className="flex flex-col w-full rounded-none ">
        <CardContent>
          <div className="flex items-center justify-center w-full h-48">
            <Skeleton className="w-full h-48" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card className="card">
        <CardHeader>
          <CardTitle>Cumulative Electric Vehicle Types Over Time</CardTitle>
          <CardDescription>
            Growth of BEVs and PHEVs from 2013 to 2023
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"icon"} variant="outline">
                  i
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Electric Vehicles by Year and Type</h4>
                    <p className="text-sm text-muted-foreground">
                      Analyze the trends in electric vehicle adoption over the years, comparing the growth of Battery Electric Vehicles (BEVs) and Plug-in Hybrid Electric Vehicles (PHEVs) from various manufacturers.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBEV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-BEV)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-BEV)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorPHEV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-PHEV)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-PHEV)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tickFormatter={(value) => value.toString()} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="BEV" stackId="1" stroke="var(--color-BEV)" fillOpacity={1} fill="url(#colorBEV)" />
                <Area type="monotone" dataKey="PHEV" stackId="1" stroke="var(--color-PHEV)" fillOpacity={1} fill="url(#colorPHEV)" />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehichleTypeChart;
