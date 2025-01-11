import React from "react";

const useChartData = ({ chartData, limit = 20 }: { chartData: any[]; limit: number }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const nextData = () => {
    if (currentPage * limit < chartData.length) {
      setCurrentPage((prev) => prev + 1);
    }
    const updatedData = [...chartData].slice((currentPage - 1) * limit, currentPage * limit);
    console.log({ chartData, updatedData, currentPage, limit });
    return updatedData;
  };

  const previousData = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    return [...chartData].slice((currentPage - 1) * limit, currentPage * limit);
  };

  const isMoreData = currentPage * limit < chartData.length;

  return { nextData, previousData, isMoreData, currentPage, setCurrentPage };
};

export default useChartData;
