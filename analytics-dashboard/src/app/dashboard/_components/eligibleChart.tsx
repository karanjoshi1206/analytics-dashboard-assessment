"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import useEligibleData from "@/hooks/transformers_hooks/useEligibleData";
import { useSheetContext } from "@/context/useSheetData";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

function EligibleChart() {
  const { sheetData, loading: sheetLoading } = useSheetContext();
  const { eligibleData, loading } = useEligibleData({ sheetData });

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
    <Card className="w-full rounded-none">
      <CardHeader className="items-center">
        <CardTitle>Clean Alternative Fuel Vehicle (CAFV) Eligibility</CardTitle>
        <CardDescription>Showing EVs which are CAFV eligilbe</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={eligibleData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="year" />
            <PolarGrid />
            <Radar
              dataKey="total"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
      </CardFooter>
    </Card>
  );
}

export default EligibleChart;
