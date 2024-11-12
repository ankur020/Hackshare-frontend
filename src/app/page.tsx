"use client";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";
import { useContext } from "react";

export default function Home() {
  const authcontext = useContext(AuthContext);
  return (
    <>
      <div className="min-h-screen w-full bg-black dark:text-white">
        <section>
          <div className="px-2 sm:px-14 md:pt-6">
            <nav className="flex items-center justify-between px-1 py-2">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="flex gap-3 text-2xl font-semibold text-white"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={"/images/logo/logo-icon.svg"}
                      alt="Logo"
                      priority
                    />
                    <div>HackShare</div>
                  </Link>
                </div>
                
              </div>
              {authcontext?.user == null ? (
                <div className=" flex gap-2  whitespace-nowrap  rounded-xl  py-3">
                  <Link
                    href={"/auth/signin"}
                    className="text rounded-lg border  border-primary bg-transparent px-4 py-1 text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    href={"/auth/signup"}
                    className="text rounded-lg border  border-primary bg-transparent px-4 py-1 text-primary"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <Link
                  href={"/teams"}
                  className="text rounded-lg border  border-primary bg-transparent px-4 py-1 text-primary"
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="px-6 py-28 sm:px-14 xl:px-40">
            <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex max-w-xl flex-col text-left sm:items-center sm:text-center lg:items-start lg:text-left">
                <h1 className="text-5xl font-bold tracking-tight text-white  sm:text-6xl md:text-7xl lg:max-w-lg ">
                  The platform for Hackers
                </h1>
                <p className="text-gray-300 font-inter pr-12 pt-7 text-base leading-relaxed text-white sm:pr-0 sm:text-lg lg:max-w-lg">
                  Dont give yourself a hard time with team and resource
                  management during Hackathons. Move your assets to the
                  Hackshare and be free of clutersome apps you depend on.
                </p>
                <div className="flex min-w-full flex-col space-y-4 pt-10 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                  <Link
                    href={"/auth/signin"}
                    className="bg-green whitespace-nowrap rounded-xl border border-primary px-6 py-3 font-bold text-primary"
                  >
                    TRY IT OUT
                  </Link>
                </div>
                <div className="pt-20">
                  <div className="text-gray-800 flex flex-col items-center space-y-2 md:flex-row md:space-x-10 md:space-y-0">
                    <span className="text-sm">Integrations</span>
                    <div className="flex items-center justify-center space-x-6 md:space-x-10">
                      <a href="#" className="hover:text-white">
                        <svg
                          fill="none"
                          viewBox="0 0 15 15"
                          height="40"
                          width="40"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M0 7.5a7.5 7.5 0 1111.697 6.216L4.907 4.21A.5.5 0 004 4.5V12h1V6.06l5.83 8.162A7.5 7.5 0 010 7.5zM10 10V4h1v6h-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a href="#" className="hover:text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          height="45"
                          width="45"
                        >
                          <path d="M3 3h18v18H3V3m10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8M13 11.25H8v1.5h1.5V20h1.75v-7.25H13v-1.5z" />
                        </svg>
                      </a>
                      <a href="#" className="hover:text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          height="45"
                          width="45"
                        >
                          <path d="M13.74 4.23c-.84-1-1.57-2-1.71-2.22H12c-.14.21-.87 1.22-1.71 2.22-7.2 9.19 1.14 15.39 1.14 15.39l.07.05c.06.95.22 2.33.22 2.33h.62s.15-1.37.21-2.33l.07-.06s8.32-6.19 1.12-15.38zM12 19.48a3.48 3.48 0 01-.48-.48L12 9l.45 10a3.57 3.57 0 01-.45.48z" />
                        </svg>
                      </a>
                      <a href="#" className="hover:text-white">
                        <svg
                          className="h-16 w-16 fill-current"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <g clip-path="url(#clip0)">
                            <path d="M8.24988 10.435L6.08488 10.895L6.07488 18.015C6.07488 19.33 7.06488 20.18 8.37988 20.18C9.10988 20.18 9.64488 20.045 9.93988 19.885V18.195C9.65488 18.31 8.25488 18.72 8.25488 17.41V14.25H9.93988V12.36H8.25488L8.24988 10.435ZM12.7049 13.015L12.5699 12.36H10.6499V20.02H12.8649V14.865C13.3899 14.175 14.2749 14.31 14.5599 14.4V12.36C14.2599 12.255 13.2249 12.06 12.7049 13.015V13.015ZM17.3199 9.4L15.0899 9.875V11.685L17.3199 11.21V9.4ZM2.24488 14.615C2.24488 14.27 2.53488 14.135 2.99988 14.13C3.67488 14.13 4.53488 14.335 5.20988 14.7V12.61C4.50735 12.3359 3.75896 12.1984 3.00488 12.205C1.20488 12.205 0.00488281 13.145 0.00488281 14.715C0.00488281 17.175 3.37988 16.775 3.37988 17.835C3.37988 18.245 3.02488 18.38 2.52988 18.38C1.79488 18.38 0.844883 18.075 0.0998828 17.67V19.67C0.924883 20.025 1.75988 20.175 2.52488 20.175C4.36988 20.175 5.63988 19.385 5.63988 17.785C5.63988 15.14 2.24488 15.615 2.24488 14.615V14.615ZM31.9999 16.28C31.9999 14.005 30.8999 12.21 28.7899 12.21C26.6799 12.21 25.3949 14.005 25.3949 16.265C25.3949 18.94 26.9099 20.175 29.0699 20.175C30.1299 20.175 30.9249 19.935 31.5299 19.6V17.93C30.9249 18.235 30.2299 18.42 29.3499 18.42C28.4849 18.42 27.7249 18.115 27.6249 17.075H31.9699C31.9799 16.96 31.9999 16.495 31.9999 16.28V16.28ZM27.6049 15.44C27.6049 14.44 28.2199 14.02 28.7749 14.02C29.3199 14.02 29.8999 14.44 29.8999 15.44H27.6049ZM21.9599 12.21C21.0899 12.21 20.5299 12.62 20.2199 12.905L20.1049 12.355H18.1499V22.595L20.3699 22.125L20.3749 19.615C20.6949 19.85 21.1699 20.175 21.9449 20.175C23.5349 20.175 24.9849 19.015 24.9849 16.195C24.9899 13.615 23.5199 12.21 21.9599 12.21V12.21ZM21.4299 18.335C20.9099 18.335 20.5999 18.145 20.3849 17.915L20.3699 14.615C20.5999 14.36 20.9199 14.175 21.4299 14.175C22.2399 14.175 22.7999 15.085 22.7999 16.245C22.8049 17.44 22.2549 18.335 21.4299 18.335V18.335ZM15.0949 20.02H17.3249V12.36H15.0949V20.02Z" />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="32" height="32" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full pt-10 md:flex md:justify-center lg:block lg:pl-20 lg:pt-0">
                <Image
                  width={500}
                  height={400}
                  src={"/illustration-1.svg"}
                  alt="Logo"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-14 lg:px-24 ">
          <div className="flex items-center justify-center">
            <h2 className="leading-tighter font-rubik max-w-lg text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Built for devs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 items-center pt-6 sm:flex-row sm:items-start md:pt-8">
            <div className="bg-black  shadow-lg h-[100%] p-4 ">
              <h1 className="text-2xl text-white font-bold">Team Management</h1>
              <p>
                 Collaborate  by creating new or joining an existing team to conquer hackathons and devlop cool projects
              </p>
            </div>
            <div className="bg-black  shadow-lg h-[100%] p-4 h-[100%] ">
              <h1 className="text-2xl text-white font-bold">Resource Upload</h1>
              <p>
               Upload resources such as images doc files related to yur project in your team.
              </p>
            </div>
            <div className="bg-black  shadow-lg h-[100%] p-4 ">
              <h1 className="text-2xl text-white font-bold">Manage Your Github Repositories</h1>
              <p>
                Link Github Repos to your team and view all PRs and commits at one place.
              </p>
            </div>
            <div className="bg-black  shadow-lg h-[100%] p-4 ">
              <h1 className="text-2xl text-white font-bold">Discuss Section For teamMates<span className="bg-meta-3 text-white px-2 rounded-2xl py-1 text-sm  m-2">#AI</span></h1>
              <p>
                Create Discussion post and make all those suppaa features you want to with the help of AI ! 
              </p>
                
            </div>
            <div className="bg-black  shadow-lg h-[100%] p-4 ">
              <h1 className="text-2xl text-white font-bold">
                AI CHATBOT at your service <span className="bg-meta-3 text-white px-2 rounded-2xl py-1 text-sm  m-2">#AI</span>
              </h1>
              <p>
               Ask any doubts regarding our feature with hackAI , it will guide you through all your queries
              </p>
            </div>
            <div className="bg-black  shadow-lg h-[100%] p-4 ">
              <h1 className="text-2xl text-white font-bold">
                Community Section 
              </h1>
              <p>
              Share your thoughts and new finds or whatever you like with everyone through community Posts
              </p>
            </div>
          </div>
        </section>

        <footer className=" dark:bg-gray-800 rounded-lg pt-2  shadow">
          <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-center">
              © 2024{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Hackshare
              </a>
              . All Rights Reserved.
            </span>
            <ul className="text-gray-500 dark:text-gray-400 mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0"></ul>
          </div>
        </footer>
      </div>
    </>
  );
}
