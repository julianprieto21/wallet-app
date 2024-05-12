"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance, formatDataForTimeLine, formatDate } from "@lib/utils";
import { ApexOptions } from "apexcharts";
import { NavArrowDown } from "iconoir-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function TimeLine({ data }: { data: any[] }) {
  const periods: { [key: string]: { offset: number } } = {
    "last-week": { offset: -7 },
    "last-month": { offset: -30 },
    "3-months": { offset: -90 },
    "6-mothns": { offset: -180 },
    "12-months": { offset: -365 },
    all: { offset: 0 },
  };
  let formattedData = formatDataForTimeLine({ data: data });
  const [incomeSeries, setIncomeSeries] = useState<number[]>([]);
  const [expenseSeries, setExpenseSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [period, setPeriod] = useState<string>("last-week");

  useEffect(() => {
    const offset = periods[period].offset;
    formattedData = formattedData.slice(offset);

    const incomeSeries = formattedData.map((item) => Math.abs(item.income));
    setIncomeSeries(incomeSeries);
    const expenseSeries = formattedData.map((item) => Math.abs(item.expense));
    setExpenseSeries(expenseSeries);
    setLabels(formattedData.map((item) => formatDate({ date: item.date })));
  }, [formattedData, period]);
  const state = {
    series: [
      {
        name: "Ingresos",
        data: incomeSeries,
        color: "#31C48D",
      },
      {
        name: "Gastos",
        data: expenseSeries,
        color: "#F05252",
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        background: "#2A2927",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        curve: "straight",
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
      xaxis: {
        categories: labels,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: (val: number) => formatBalance(val / 100),
        },
      },
      theme: {
        mode: "dark",
      },
    } as ApexOptions,
  };
  return (
    <div className="w-full bg-palette-300 rounded-lg shadow p-4 md:p-6 md:pt-2">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={253}
        width="100%"
      />
      <div className="grid grid-cols-1 items-center border-palette-250 border-t justify-between mt-2">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-palette-200 hover:text-palette-100 text-center inline-flex items-center"
            type="button"
          >
            Last 7 days
            <NavArrowDown />
          </button>
          <h5 className="text-xl font-bold leading-none text-palette-100 pe-1 pr-2">
            {dict.charts.timeline}
          </h5>
        </div>
      </div>
    </div>
  );
}