"use client";
import { Transaction } from "@/app/lib/types";
import { formatBalance, formatDate, getBalanceByDay } from "@/app/lib/utils";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import { useSearchParams } from "next/navigation";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any;
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <strong className="label">{formatDate({ dateStr: label })}</strong>
        <p className="desc">{formatBalance(payload[0].value, "auto")}</p>
      </div>
    );
  }

  return null;
};

export default function MonthChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("account");
  let filteredTransactions = transactions;
  if (accountId) {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.account_id === accountId
    );
  }
  const groupedTransactions = getBalanceByDay(filteredTransactions);

  return (
    <div className="flex size-full">
      <ResponsiveContainer>
        <LineChart
          data={groupedTransactions}
          margin={{
            top: 0,
            right: 5,
            left: 5,
            bottom: 0,
          }}
        >
          <Tooltip
            content={<CustomTooltip active={true} payload={0} label="" />}
          />
          {/* <YAxis /> */}
          <XAxis dataKey="date" tick={false} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
