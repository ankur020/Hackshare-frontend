import Link from "next/link";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  teamId: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  teamId,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 my-auto py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-8 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-xl font-semibold">{title}</span>

        </div>

        
      </div>
        <div className="py-2">
        <Link
          href={`/teams/${teamId.toLowerCase()}/${title}`}
          className="hidden items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90 dark:inline-flex lg:px-8 xl:px-10"
        >
          VIEW
        </Link>
        <Link
          href={`/teams/${teamId.toLowerCase()}/${title}`}
          className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-8 xl:px-10"
        >
          VIEW
        </Link>
      </div>
    </div>
  );
};

export default CardDataStats;
