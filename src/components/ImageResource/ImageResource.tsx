/* eslint-disable @next/next/no-img-element */
import { deleteResource } from "@/services/resourceServices";
import Link from "next/link";
import React, { useState } from "react";
interface ImageResourceProps {
  image: any;
  setImages:any;
  images:any
}
const ImageResource = ({ image ,setImages,images }: ImageResourceProps) => {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteResource(image?._id);
        setImages(images.filter((img:any )=> img._id !== image?._id));
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };

  return (
    <div className="relative w-full  rounded-sm border border-stroke  p-4 shadow-md dark:border-strokedark dark:bg-boxdark justify-center flex flex-col items-center ">
      <div className="relative w-full flex items-center   min-h-80 min-w-80 max-w-80 max-h-80 py-2  ">
        <img src={image?.url} alt={image?.filename} className="rounded " />
      </div>
      <p className="text-gray-600 mt-2 text-sm">{image?.description}</p>
      <p className="text-gray-500 mt-1 text-xs">
        Uploaded by: {image?.user.fullName}
      </p>
      <p className="text-gray-500 mt-1 text-xs">Filename: {image?.filename}</p>
      <div className="flex gap-5 py-2">
        <div className="mt-2">
          <Link
            href={`${image?.url}`}
            className="hidden items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90 dark:inline-flex lg:px-8 xl:px-10"
            target="_blank"
          >
            View
          </Link>
          <Link
            target="_blank"
            href={`${image?.url}`}
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
            disabled={deleting}
          >
            {deleting?"Deleting":"Delete"}
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-6 xl:px-8"
            disabled={deleting}
          >
           {deleting?"Deleting":"Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageResource;
