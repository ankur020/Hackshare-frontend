"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import UploadDiscussion from "@/components/UploadDiscussion/UploadDiscussion";
import { getPostsByTeam } from "@/services/discussionServices";
import DiscussionResource from "@/components/DiscussionResource/DiscussionResource";
import Image from "next/image";
import Loader from "@/components/common/Loader";

const TeamDiscussionPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const discussionData = await getPostsByTeam(params?.teamId);
        console.log(discussionData);
        setDiscussions(discussionData.reverse());
        setError(false);
      } catch (error: any) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [added]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / discussion`} />
      {/* discuss upload */}
      <UploadDiscussion added={added} setAdded={setAdded} />
      {/* discuss data */}
      <div className="py-4">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Discussions
        </h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="flex w-[100%] flex-col items-center justify-center gap-1">
            <Image
              width={400}
              height={400}
              src={"/error.png"}
              alt="error pic"
            />
            <h1 className="text-2xl font-bold">Something went wrong !</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {discussions.map((discuss: any) => {
              return (
                <DiscussionResource
                  
                  discuss={discuss}
                  setDiscussions={setDiscussions}
                  discussions={discussions}
                  key={discuss._id}
                />
              );
            })}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default TeamDiscussionPage;
