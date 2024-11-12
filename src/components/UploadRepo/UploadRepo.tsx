"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { createPost } from "@/services/discussionServices";
import { addGithubRepo } from "@/services/resourceServices";
import { ToastError, ToastSuccess } from "@/services/toastNotification";

const UploadRepo = ({setAdded,added}:any) => {
  const params = useParams<any>();
  const teamId = params?.teamId;
  const [repoUrl, setrepoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!repoUrl || !teamId) {
      setError("Details Missing");
      return;
    }

    try {
      const response = await addGithubRepo(teamId,repoUrl);
      console.log(response);
      setrepoUrl("")
      setError("");
      ToastSuccess("RepoUrl uploaded successfully.")
      setOpen(false);
      setAdded(!added)
    } catch (error: any) {
      console.log(error);
      setSuccess("");
      setError("An error occurred while uploading the resource.");
      ToastError("Error Occured")
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
      <div className="flex w-[100%] justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className=" font-bold text-black dark:text-white">
          Upload Github Repository
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
          <form onSubmit={handleSubmit} className="w-[100%] ">
            {error && <p className=" py-1 text-red">{error}</p>}
            {success && <p className=" py-1 text-green-400">{success}</p>}
            
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full ">
                  
                  <div className="relative">
                    <input
                      value={repoUrl}
                      onChange={(e) => {
                        setrepoUrl(e.target.value);
                      }}
                      className="w-full rounded border border-stroke bg-gray py-3 pl-2 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="repourl"
                    />
                  </div>
                </div>
              </div>
            
            

            

            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadRepo;
