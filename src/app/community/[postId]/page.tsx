/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Authcontext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { ToastError, ToastSuccess } from "@/services/toastNotification";
export default function Home() {
  const authContext = useContext(AuthContext);
  const params = useParams<any>();
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");
  const [added, isAdded] = useState(false);
  const router = useRouter();

  const handleAddComment = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}community/${params?.postId}/comments`,
        {
          content: comment,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data.data);
      isAdded(!added);
      setComment("");
      ToastSuccess("Comment Added")
    } catch (error) {
      console.log(error);
      ToastError("Failed to Add Comment")
    }
  };

  const handleLikeChange = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}community/${params?.postId}/like`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(response.data.data);
      isAdded(!added);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}community/delete/${params?.postId}`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data.data);
      ToastSuccess("Post Deleted")
      router.push("/community");
    } catch (error) {
      console.log(error);
      ToastError("Failed . Post Not Deleted")
    }
  };
  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}community/get-one/${params?.postId}`,
          {
            withCredentials: true,
          },
        );
        console.log(response?.data.data);
        setPost(response?.data.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchPosts();
  }, [added]);

  return (
    <>
      <DefaultLayout>
        {error && (
          <div className="flex w-[100%] flex-col items-center justify-center gap-1">
            <Image
              width={400}
              height={400}
              src={"/error.png"}
              alt="error pic"
            ></Image>
            <h1 className="text-2xl font-bold">Something went wrong !</h1>
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div
            key={post?._id}
            className={!error?` mt-4 w-full rounded-lg bg-white px-4 md:px-10 py-6 text-black shadow-md dark:bg-black dark:text-white`:"hidden"}
          >
            <div className="w-full  items-center justify-between md:flex">
              <div className="flex w-full justify-between">
                <span className="text-gray-600 font-light">
                  {new Date(post?.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="bg-gray-600 text-gray-100 hover:bg-gray-500 flex gap-1 rounded py-1 font-bold">
                {post?.tags?.map((i: string, idx: any) => {
                  return (
                    <div
                      className=" dark:border-primary-400  dark:text-primary-400 text-nowrap rounded-md border border-meta-3 px-2 py-1 text-meta-3"
                      key={idx}
                    >
                      {i}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 py-2">
              <div className="justify-between md:flex">
                <div className="text-gray-700 hover:text-gray-600 text-2xl font-bold">
                  {post?.title}
                  <h1 className="text-gray-700 text-sm font-bold">
                    {post?.user?.username}
                  </h1>
                </div>
                <div className="mt-2 flex items-center gap-2 md:mt-0 ">
                  {post?.user?._id == authContext?.user?._id ? (
                    <div
                      onClick={handleDeletePost}
                      className=" cursor-pointer rounded-md bg-red px-2 py-1 text-white"
                    >
                      DELETE
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: post?.content }}
                className="text-gray-600 mt-2 py-2"
              ></p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <form onSubmit={handleAddComment} className=" min-w-[100%]">
                <div className="mb-3.5 flex  w-[100%] items-end gap-2 ">
                  <div className="w-[100%] ">
                    <input
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      type="text"
                      placeholder="Add comment"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <button
                    className=" hidden md:flex justify-center rounded  bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Comment
                  </button>
                  <button
                    className="flex justify-center rounded  bg-primary px-4 md:hidden py-3 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                   +
                  </button>
                </div>
              </form>
            </div>
            <div className="my-4 px-4   py-4">
              <div className="flex justify-between gap-2 border-b border-stroke py-2 font-semibold">
                <span>DISCUSS 📰 ({post?.comments?.length})</span>
                <span onClick={handleLikeChange} className="cursor-pointer">
                  {post?.likes.includes(authContext?.user?._id)
                    ? "Liked"
                    : "Like"}
                  👍({post?.likes?.length})
                </span>
              </div>

              {post?.comments?.map((comment: any, idx: any) => {
                return (
                  <div
                    className="border-b border-stroke  py-4   dark:border-form-strokedark"
                    key={idx}
                  >
                    <div className="flex justify-between gap-2 text-sm">
                      <span className="flex gap-2 rounded-full">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                            fill=""
                          />
                          <path
                            d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                            fill=""
                          />
                        </svg>
                        {comment.user.username}
                      </span>
                      <span>
                        {new Date(comment.createdAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className=" py-4">{comment.content}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </DefaultLayout>
    </>
  );
}
