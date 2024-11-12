import { ToastError, ToastSuccess } from "@/services/toastNotification";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (event: FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Cant confirm new password");
      setNewPassword("");
      setConfirmPassword("");
      setOldPassword("");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}users/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true },
      );
      console.log(response.data);
      if (response.status === 200) {
        ToastSuccess("Password Updated")
        setError("");
        setConfirmPassword("");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error: any) {
      console.log(error.response?.data);
    
      ToastError("Error Occured")
      setConfirmPassword("");
      setOldPassword("");
      setNewPassword("");
      
      console.log(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Change Password
        </h3>
      </div>
      <div className="p-7">
        <form onSubmit={handleChangePassword}>
          {error && <p className=" py-1 text-red">{error}</p>}
        

          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Old Password
            </label>
            <input
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Confirm New Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-4.5">
            <button
              onClick={() => {
                setConfirmPassword("");
                setNewPassword("");
                setOldPassword("");
                setSuccess("REQUEST CANCELLED");
              }}
              className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Cancel
            </button>
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={handleChangePassword}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
