import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { communityPost } from "@/services/communityServices";
import { ToastError, ToastSuccess } from "@/services/toastNotification";
import { useRouter } from "next/navigation";
const CommunityPostForm = ({ setShow }: any) => {
  const [title, setTitle] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  const router=useRouter();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await communityPost(title, content, tags);
      if (response?.status === 201) {
        router.push("/community/"+response.data.data._id)
        setSuccess("Post created successfully!");
        setTitle("");
        setContent("");
        setTags("");
      }
      ToastSuccess("Post Uploaded")
    } catch (error: any) {
      
      ToastError("post upload Failed")
    }
    setShow(false)
  };

  return (
    <div>
      <div className="flex flex-col rounded-md">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white   dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className=" flex items-center justify-between font-medium text-black dark:text-white">
              CREATE POST
              <button
                title="h"
                className="  py-1"
                onClick={() => {
                  setShow(false);
                }}
              >
                {" "}
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
            </h3>
          </div>

          

          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter title name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Post Title <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-6 ">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Post Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="flex  justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostForm;
