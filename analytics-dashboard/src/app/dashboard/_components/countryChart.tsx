import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useSheetContext } from "@/context/useSheetData";
import useCityViseData from "@/hooks/transformers_hooks/useCityViseData";
import useCountyViseData from "@/hooks/transformers_hooks/useCountyViseData";
import useChartData from "@/hooks/useChartData";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  views: {
    label: "Page Views"
  },
  city: {
    label: "City",
    color: "hsl(var(--chart-1))"
  },
  county: {
    label: "County",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig;

const CountryChart = () => {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("city");

  const { sheetData, loading } = useSheetContext();
  const { cityData } = useCityViseData({ sheetData });
  const { countyData } = useCountyViseData({ sheetData });
  const { nextData, previousData, isMoreData, currentPage, setCurrentPage } = useChartData({ chartData: activeChart === "city" ? cityData : countyData, limit: 20 });

  const [chartData, setChartData] = React.useState<any[]>([]);
  React.useEffect(() => {
    setCurrentPage(1);
    setChartData(activeChart === "city" ? JSON.parse(JSON.stringify(cityData)).slice(0, 20) : JSON.parse(JSON.stringify(countyData)).slice(0, 20));
  }, [loading, activeChart]);

  const handlePrevious = () => {
    setChartData(previousData());
  };

  const handleNext = () => {
    const data = nextData();
    setChartData(data);
  };

  const total = React.useMemo(
    () => ({
      city: cityData.length,
      county: countyData.length
    }),
    [loading]
  );

  if (loading) {
    <Card className="flex flex-col w-full rounded-none">
      <Skeleton className="w-full h-48" />
    </Card>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Location vise Fleet data</CardTitle>
          <CardDescription>
            <span className="mr-2">Showing total cars in different cities and counties</span>

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
                    <p className="text-sm text-muted-foreground">Analyze this data to discover the cities/countries with the highest concentration of EVs in operation.</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardDescription>
        </div>
        <div className="flex">
          {["city", "county"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">{total[key as keyof typeof total].toLocaleString()}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={4} minTickGap={32} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="count"
                  labelFormatter={(value) => {
                    return `Vehicles in ${value}`;
                  }}
                />
              }
            />
            <Bar dataKey={"count"} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center items-center gap-2 w-full">
          {currentPage > 1 && (
            <Button onClick={handlePrevious} className="btn btn-primary">
              Previous
            </Button>
          )}
          {isMoreData && (
            <Button onClick={handleNext} className="btn btn-primary">
              Next
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CountryChart;
