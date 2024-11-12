import Link from "next/link";
import React from "react";

const Card = ({team}:any) => {
    console.log(team);
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {team?.name}
          </h4>
          <span className="text-sm font-medium">TEAM LEAD : {team?.owner?.username}</span>
          <div className="text-sm font-medium">TEAM SIZE : {team?.members?.length}</div>
        </div>
      </div>

      <div className="mt-2">
        <Link
          href={`/teams/${team?._id}`}
          className="hidden items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90 dark:inline-flex lg:px-8 xl:px-10"
        >
          VIEW
        </Link>
        <Link
          href={`/teams/${team?._id}`}
          className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-8 xl:px-10"
        >
          VIEW
        </Link>
      </div>
    </div>
  );
};

export default Card;
