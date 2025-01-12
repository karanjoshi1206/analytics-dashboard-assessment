"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VehicleTableData } from "@/hooks/transformers_hooks/useTableData";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Info } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<VehicleTableData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          EV Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: "make",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Manufacturer <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Year of Manufacture <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: "eligibility",
    header: "CAFV Eligibility"
  },
  {
    accessorKey: "electricRange",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Electric Range
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vehcile = row?.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Info type="button" className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-6">
              {/* Vehicle Information */}
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Vehicle Information</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>Year:</strong> {vehcile.year}
                  </p>
                  <p>
                    <strong>Make:</strong> {vehcile.make}
                  </p>
                  <p>
                    <strong>Model:</strong> {vehcile.name}
                  </p>
                  <p>
                    <strong>Vehicle Type:</strong> {vehcile.vehicleType}
                  </p>
                </div>
              </div>

              {/* Electric Details */}
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Electric Details</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>Electric Range:</strong> {vehcile.electricRange} miles
                  </p>
                  <p>
                    <strong>Eligibility:</strong> {vehcile.eligibility}
                  </p>
                  <p>
                    <strong>Electric Utility:</strong> {vehcile.electricUtility}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Location</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>City:</strong> {vehcile.city}
                  </p>
                  <p>
                    <strong>County:</strong> {vehcile.county}
                  </p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    }
  }
];
