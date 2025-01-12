"use client";
import Csv from "@/models/csv";
import { parse, unparse } from "papaparse";
import { useEffect, useState } from "react";

const useCsv = () => {
  const [data, setData] = useState<Csv[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true; // Avoid setting state if the component unmounts
    setLoading(true);

    fetch("/data/data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const results = parse<Csv>(csvData, {
          header: true,
          skipEmptyLines: true, // Skips blank rows in CSV
          transform: (value) => {
            if (value === "") return null;
            const num = Number(value);
            return isNaN(num) ? value : num;
          },
          complete: (parsedData) => {
            if (!Array.isArray(parsedData.data)) {
              throw new Error("Parsing failed. Ensure CSV is properly formatted.");
            }
            return parsedData;
          }
        });

        if (isMounted) {
          setData(results.data as Csv[]);
        }
      })
      .catch((error) => {
        if (isMounted) console.error("Error fetching data: ", error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false; // Clean up when unmounted
    };
  }, []);

  return { data, loading };
};

export default useCsv;
