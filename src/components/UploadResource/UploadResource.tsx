"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ToastError, ToastSuccess } from "@/services/toastNotification";
interface UploadResourceProps {
  pagename: string;
  setAdded: any;
  added:boolean;
}
const UploadResource = ({setAdded,added, pagename }: UploadResourceProps) => {

  const params = useParams<any>();
  const teamId = params?.teamId;

  const [file, setFile] = useState(null);
  const [filetype, setFiletype] = useState(pagename);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading , setLoading]=useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!file || !filetype) {
      ToastError("File and file type are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filetype", filetype);
    formData.append("description", description);
    formData.append("teamId", teamId);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}resources/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      console.log(response.data);
      setFile(null);
      setFiletype("document");
      setError("")
      setDescription("");
      setAdded(!added);
      ToastSuccess("Image Added Successfully");
      setOpen(false);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      ToastError("An error occurred while uploading the resource.")
      setError("An error occurred while uploading the resource.");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
      <div className="flex w-[100%] justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className=" font-bold text-black dark:text-white">
          Upload {pagename}
        </h3>
        <button
          type="button"
          title="ADD"
          onClick={() => {
            setOpen(!open);
          }}
          className="text-bold text-2xl"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-black dark:text-white"
              fill="none"
            >
              <path
                d="M15 9L9 14.9996M15 15L9 9.00039"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-black dark:text-white"
              fill="none"
            >
              <path
                d="M12 8V16M16 12L8 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="p-7">
          <form onSubmit={handleSubmit}>
            {error && <p className=" py-1 text-red">{error}</p>}
            {success && <p className=" py-1 text-green-400">{success}</p>}
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full ">
                <div className="relative">
                  <input
                    onChange={handleFileChange}
                    className="w-full rounded border border-stroke bg-gray py-3 pl-2 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="file"
                    name="uploadfile"
                  />
                </div>
              </div>
            </div>

            <div className="mb-1">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="Description"
              ></label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_88_10224">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>

                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="desc"
                  id="desc"
                  rows={2}
                  placeholder="Write your description here"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-4.5">
              <button
              disabled={loading}
                className="flex justify-center rounded bg-primary  px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                {!loading?"Upload":"Uploading..."}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadResource;
