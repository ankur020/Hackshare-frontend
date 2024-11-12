import { deleteResource } from "@/services/resourceServices";
import Link from "next/link";
import React from "react";
interface GithubResourceProps {
  repo: any;
}
const GithubResource = ({ repo }: GithubResourceProps) => {
  return (
    <div className="w-min-[100%] flex  items-center  justify-between border border-stroke bg-white px-4 py-1.5 dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col  ">
        <span className="dark:text-white">{repo.name}</span>
        <Link href={repo.url} target="_blank" className="flex gap-2  items-center text-sm">
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z" />
          </svg>
          {repo.url}
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="">
          <Link
            href={`/`}
            className="hidden items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90 dark:inline-flex lg:px-8 xl:px-10"
          >
            VIEW
          </Link>
          <Link
            href={`/`}
            className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-8 xl:px-10"
          >
            VIEW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GithubResource;
