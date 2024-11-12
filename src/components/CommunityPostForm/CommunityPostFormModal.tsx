"use client";
import CommunityPostForm from "./CommunityPostForm";

const CommunityPostFormModal = ({ setShow }:any) => {
  return (
    <div className="fixed inset-0 w-full z-999999  flex h-full items-center justify-center overflow-y-auto bg-black bg-opacity-80">
      <div className=" rounded-md w-[100%] lg:w-[50%]   ">
        <CommunityPostForm setShow={setShow}/>
      </div>
    </div>
  );
};

export default CommunityPostFormModal;
