import { deleteResource } from "@/services/resourceServices";
import Link from "next/link";
import React, { useState } from "react";
interface DocumentResourceProps {
  document: any;
  setDocuments:any;
  documents:any
}
const DocumentResource = ({ document ,setDocuments,documents }: DocumentResourceProps) => {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteResource(document?._id);
        console.log(documents)
        setDocuments(documents.filter((doc:any )=> doc._id !== document?._id));
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };

  return (
    <div className="relative w-full  rounded-sm border border-stroke  p-4 shadow-md flex flex-col justify-between dark:border-strokedark dark:bg-boxdark bg-white dark:bg-transparent">
      <div className="font-bold overflow-y-hidden overflow-x-hidden h-8 text-lg dark:text-white">{document.filename}</div>
      <div className="text-sm"> @ {document.user.username}</div>
      <div className="text-md"> {document.description}</div>
      <div className="flex  gap-2 py-2">
        <div className="mt-2">
          <Link
            href={`${document?.url}`}
            className="hidden items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90 dark:inline-flex lg:px-8 xl:px-10"
          >
            View
          </Link>
          <Link
            href={`${document?.url}`}
            className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-8 xl:px-10"
          >
            View
          </Link>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            onClick={handleDelete}
            className="hidden items-center justify-center rounded-md border border-red px-10 py-2 text-center font-medium text-red hover:bg-opacity-90 dark:inline-flex lg:px-6 xl:px-8"
          >
        {deleting?"Deleting":"Delete"}   
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-6 xl:px-8"
          >
          {deleting?"Deleting":"Delete"} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentResource;
