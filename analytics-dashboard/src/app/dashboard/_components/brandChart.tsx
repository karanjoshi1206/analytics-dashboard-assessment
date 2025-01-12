import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useSheetContext } from "@/context/useSheetData";
import useBrandData from "@/hooks/transformers_hooks/useBrandData";
import React from "react";
import { Label, Pie, PieChart } from "recharts";

const BrandChart = () => {
  const { sheetData, loading: sheetLoading } = useSheetContext();
  const { brandData, chartConfig, loading } = useBrandData({ sheetData });
  const totalVisitors = React.useMemo(() => {
    return brandData.reduce((acc, curr) => acc + curr.total, 0);
  }, [loading, brandData]);

  if (loading || sheetLoading) {
    return (
      <Card className="w-full rounded-none">
        <CardContent className="pb-0">
          <Skeleton className="mx-auto w-full aspect-square h-[350px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col w-full rounded-none card">
      <CardHeader className="items-center pb-0">
        <CardTitle>EVs makers</CardTitle>
        <CardDescription>
          Prooduction of EVs by each manufactures
          <Popover>
            <PopoverTrigger asChild>
              <Button size={"icon"} variant="outline">
                i
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Total Vehicles</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze this data to discover the brands with the highest number of electric vehicles in operation. This breakdown includes a variety of EV brands, with TESLA leading the way, followed by FORD,
                    NISSAN, and more. Dive into the distribution of electric vehicles to gain insights into market trends and brand dominance.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={brandData} dataKey="total" nameKey="brand" innerRadius={80} strokeWidth={20}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          EVs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Showing total EVs manufactured by different brands</div>
      </CardFooter>
    </Card>
  );
};

export default BrandChart;
