"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthContext from "@/context/Authcontext";
import { getResourcesByType } from "@/services/resourceServices";
import UploadResource from "@/components/UploadResource/UploadResource";
import ImageResource from "@/components/ImageResource/ImageResource";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { ToastError } from "@/services/toastNotification";
const TeamImagesPage = () => {
  const params = useParams<any>();
  const authContext = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imagesData = await getResourcesByType(params?.teamId, "image");
        setImages(imagesData);
        setError(false);
      } catch (error: any) {
        setError(true);
        console.log(error);
        ToastError("Error Occured")
      }
      setLoading(false);
    };
    fetchImages();
  }, [added]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Teams /  MyTeam / images`} />
      {/* image upload */}
      <UploadResource added={added} setAdded={setAdded} pagename={"image"} />
      {/* image data */}
      <div className="py-4">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Image Resource Gallery
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
          <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 lg:grid-cols-3 ">
            {images.map((image: any) => (
              <ImageResource
                setImages={setImages}
                images={images}
                image={image}
                key={image?._id}
              />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default TeamImagesPage;
