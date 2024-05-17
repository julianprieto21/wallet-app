import { Upload, Download, DataTransferBoth } from "iconoir-react";
import { BarChart } from "@components/wallet/BarChart";
import { Suspense } from "react";
import { getBalance } from "@lib/db";
import { User } from "@lib/types";
import { formatBalance } from "@lib/utils";
import Link from "next/link";

const ActionLinks = () => {
  return (
    <>
      <Link href={"/transactions/create?t=expense"}>
        <Upload className="text-expense text-3xl bg-palette-400 rounded-full hover:bg-expense hover:text-palette-100 transition p-2" />
      </Link>
      <Link href={"/transactions/create?t=income"}>
        <Download className="text-income text-3xl bg-palette-400 rounded-full hover:bg-income hover:text-palette-100 transition p-2" />
      </Link>
      <button title="transfer" disabled className="cursor-not-allowed">
        <DataTransferBoth className="text-transfer text-3xl rotate-90 bg-palette-400 rounded-full hover:bg-neutral-600 hover:text-neutral-400 transition p-2" />
      </button>
    </>
  );
};

export default async function MainCard({ user }: { user: User }) {
  const barChartData =
    (await getBalance({ groupBy: "type", user: user })) ?? [];
  const generalBalance =
    (await getBalance({ groupBy: "user", user: user })) ?? [];
  const balance = generalBalance.length > 0 ? generalBalance[0].total : 0;
  return (
    <div className="shrink-0 rounded-lg h-96 w-[620px] mt-10 shadow-md bg-palette-300 px-6 py-5 relative">
      <h3 className="text-palette-100 text-4xl">
        <p className="text-neutral-500 font-bold text-base">Balance:</p>
        {formatBalance(balance / 100)}
      </h3>
      <Link href={"/settings"}>
        <img
          alt=""
          className="absolute right-0 top-0 mr-6 my-5 size-11 rounded-full"
          src="https://lh3.googleusercontent.com/a/ACg8ocL5BpUK7g2Z5kLC7Yqguxe2L8Esu1Foa1IK1dqgyVcyd2OwVXs=s96-c"
        />
      </Link>

      <div className="h-auto w-80 absolute bottom-2 left-4">
        <BarChart data={barChartData} />
      </div>

      <div className="absolute bottom-0 right-0 flex flex-col gap-3 pr-6 pb-5">
        <ActionLinks />
      </div>
    </div>
  );
}