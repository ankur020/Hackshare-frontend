"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Card from "@/components/TeamCard/Card";
import React, { FormEvent, useContext, useEffect, useState } from "react";

import axios from "axios";
import AuthContext from "@/context/Authcontext";
import Image from "next/image";
import Loader from "@/components/common/Loader";
import { ToastSuccess, ToastError } from "@/services/toastNotification";

const TeamPage = () => {
  const [teamDetails, setTeamDetails] = useState([]);
  const authContext = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoinTeam = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/join-team`,
        { code },
        { withCredentials: true },
      );
      console.log(response.data);
      if (response.status === 200) {
      }
      setAdded(!added);
      setCode("");
      ToastSuccess("Team Joined");
    } catch (error: any) {
      console.log(error.response?.data);
      console.log(error);
      setCode("")
      ToastError("Unable to Join Team");
    }
  };

  const handleCreateTeam = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/create-team`,
        { name },
        { withCredentials: true },
      );
      console.log(response.data);
      if (response.status === 200) {
      }
      setName("")
      setAdded(!added);
      ToastSuccess("Team Created");
    } catch (error: any) {
      console.log(error.response?.data);
      console.log(error);
      ToastError("Error Occured");
      setName("")
    }
  };
  const getAllTeams = async () => {
    setLoading(true);
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/getallteams`,
        { withCredentials: true },
      );
      console.log(response.data.data);
      setTeamDetails(response.data.data.teams);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    getAllTeams();
    console.log(authContext?.user);
  }, [added, authContext]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Teams" />
      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-sm border  border-stroke bg-white px-7 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleCreateTeam} className=" min-w-[100%]">
            <div className="mb-3.5 flex w-[100%] items-end gap-2 ">
              <div className="w-[100%] ">
                <label className="text mb-3 block font-medium text-black dark:text-white ">
                  Create Your Own Team
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Team Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                className="flex justify-center rounded border border-transparent bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
        <div className="rounded-sm  border border-stroke bg-white px-7 py-2 shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleJoinTeam} className=" min-w-[100%]">
            <div className="mb-3.5 flex w-[100%] items-end gap-2 ">
              <div className="w-[100%] ">
                <label className="text mb-3 block font-medium text-black dark:text-white ">
                  Join team using invite Code
                </label>
                <input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Team Code"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                className="flex justify-center  border-transparent rounded border bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"

                type="submit"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : teamDetails.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 ">
          {teamDetails.map((team, index) => {
            return <Card team={team} key={index} />;
          })}
        </div>
      ) : (
        <div className="my-10 flex w-[100%] flex-col items-center justify-center">
          <Image
            className="text-white dark:hidden dark:text-white"
            src={"/0team.svg"}
            alt="no team"
            height={100}
            width={100}
          />
          <Image
            className="hidden dark:block dark:text-white"
            src={"/0teamdark.svg"}
            alt="no team"
            height={100}
            width={100}
          />
          No Teams Added/Joined
        </div>
      )}
    </DefaultLayout>
  );
};

export default TeamPage;
