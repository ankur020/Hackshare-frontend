"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import { getResourcesByType } from "@/services/resourceServices";
import UploadResource from "@/components/UploadResource/UploadResource";
import DocumentResource from "@/components/DocumentResource/DocumentResource";
import Loader from "@/components/common/Loader";

const TeamImagesPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchDocuments = async () => {
      try {
        const documentData = await getResourcesByType(
          params?.teamId,
          "document",
        );
        setDocuments(documentData);
      } catch (error: any) {
        setError(true);
        console.log(error);
      }
    };
    fetchDocuments();
  }, [added]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / documents`} />
      {/* document upload */}
      <UploadResource added={added} setAdded={setAdded} pagename={"document"} />
      {/* document data */}
      <div className="py-4">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Document Resource Gallery
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {documents.map((document: any) => (
              <DocumentResource
                setDocuments={setDocuments}
                documents={documents}
                document={document}
                key={document?._id}
              />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default TeamImagesPage;
