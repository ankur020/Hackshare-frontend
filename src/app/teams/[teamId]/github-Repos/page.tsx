"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import UploadRepo from "@/components/UploadRepo/UploadRepo";
import { getAllRepos } from "@/services/githubRepo";
import GithubResource from "@/components/GithubResource/GithubResource";
import Loader from "@/components/common/Loader";

const TeamImagesPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchGithubRepos = async () => {
      setLoading(true);
      try {
        const documentData = await getAllRepos(params?.teamId);
        setDocuments(documentData);
        console.log(documentData);
        setError(false);
      } catch (error: any) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    };
    fetchGithubRepos();
  }, [added]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / documents`} />
      {/* image upload */}
      <UploadRepo setAdded={setAdded} added={added}/>
      {/* image data */}
      <div className="py-4">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Github Repositories
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
          <div className=" grid w-[100%] grid-cols-1 gap-2 ">
            {documents.map((document: any, idx) => (
              <GithubResource repo={document} key={idx} />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default TeamImagesPage;
