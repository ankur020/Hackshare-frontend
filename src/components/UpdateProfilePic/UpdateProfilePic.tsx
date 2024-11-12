import AuthContext from "@/context/Authcontext";
import { ToastError, ToastSuccess } from "@/services/toastNotification";
import axios from "axios";
import React, { useContext, useState } from "react";

const UpdateProfilePic = ({ setShow , type }: any) => {
    const authcontext=useContext(AuthContext)
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    setLoading(true);

    if (!file) {
      ToastError("File required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append(`${type}Picture`, file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}users/upload-${type}-picture`,
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
      ToastSuccess("Image Added Successfully");
      setShow(false);
      setLoading(false);
      authcontext?.setUserDeatils({data:{user:response.data.data}})
    } catch (error: any) {
      console.log(error);
      ToastError("An error occurred while uploading the resource.")
      setFile(null);
      setShow(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-999999 flex  h-full w-full items-center justify-center overflow-y-auto bg-white bg-opacity-10">
      <div className=" w-[100%] rounded-md lg:w-[50%] bg-white dark:bg-black   ">
        <div className="flex w-[100%] justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className=" font-bold text-black dark:text-white">Upload {type} Picture </h3>
          <button
            type="button"
            title="ADD"
            onClick={() => {
              setShow(false);
            }}
            className="text-bold text-2xl"
          >
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
          </button>
        </div>
        <div className="p-7">
          <form onSubmit={handleSubmit}>
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

           

            <div className="flex justify-end gap-4.5">
              <button
                disabled={loading}
                className="flex justify-center rounded bg-primary  px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                {!loading ? "Upload" : "Uploading..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePic;
