// src/components/PostList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "../common/Loader";
import Image from "next/image";

const PostList = ({ search ,searchTags }: any) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}community/get-all?tags=${searchTags}`,
          {
            withCredentials: true,
          },
        )
        .catch((e) => {
          console.log(e);
        });
      console.log(response?.data.data);
      setPosts(response?.data.data);
      setLoading(false);
    };

    fetchPosts();
  }, [searchTags]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : posts.length > 0 ? (
        <div>
          <h2 className="px-4">Community Posts</h2>
          <div>
            {posts.filter((post:any)=>{
              return post?.title.toLowerCase().includes(search.toLowerCase())
            }).map((post: any) => (
              <div
                key={post._id}
                className="md:mx-3 my-4 rounded-lg bg-white px-3 md:px-10 py-6 shadow-md dark:bg-black dark:text-white"
              >
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <span className="text-gray-600 font-light">
                    {new Date(post.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <div className="bg-gray-600 text-gray-100 hover:bg-gray-500 flex flex-wrap gap-1 rounded py-1 font-bold">
                    {post.tags.map((i: string, idx: any) => {
                      return (
                        <div
                          className=" dark:text-primary-400  dark:border-primary-400 rounded-md border border-meta-3 px-2 py-1 text-meta-3"
                          key={idx}
                        >
                          {i}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-2">
                  <a
                    className="text-gray-700 hover:text-gray-600 text-2xl font-bold"
                    href="#"
                  >
                    {post.title}
                  </a>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.content.substr(0, 50),
                    }}
                    className="text-gray-600 mt-2"
                  ></p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    className="text-blue-600 hover:underline"
                    href={`/community/${post._id}`}
                  >
                    Read more
                  </Link>
                  <div>
                    <a className="flex items-center" href="#">
                      <img
                        className="mx-4 hidden h-10 w-10 rounded-full object-cover sm:block"
                        src={`${post.user.profilePicture}`|| `/blackprofile.png`}
                        alt="avatar"
                      />
                      <h1 className="text-gray-700 font-bold">
                        {post.user.username}
                      </h1>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-[100%] flex-col items-center justify-center gap-1">
          <Image width={400} height={400} src={"/noitem.png"} alt="error pic" />
          <h1 className="text-2xl font-bold">No Results Found </h1>
        </div>
      )}
    </>
  );
};

export default PostList;
