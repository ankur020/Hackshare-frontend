"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Authcontext";
import CommunityPostFormModal from "@/components/CommunityPostForm/CommunityPostFormModal";
import PostList from "@/components/CommunityPosts/CommunityPosts";
export default function Home() {
  const [show, setShow] = useState(false);
  const [search,setSearch]=useState("");
  const [appliedTags, setAppliedTags] = useState<string[]>([]);
  const [searchTags, setSearchTags] = useState("");
  const tags = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Angular",
    "Vue",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "GraphQL",
    "REST",
    "API",
    "TypeScript",
    "Webpack",
    "Babel",
    "ES6",
    "Redux",
    "Sass",
    "LESS",
    "Bootstrap",
    "Tailwind CSS",
    "Material-UI",
    "Chakra UI",
    "Testing",
    "Jest",
    "Cypress",
    "Mocha",
    "Chai",
    "Jasmine",
    "Enzyme",
    "Cucumber",
    "Git",
    "GitHub",
    "Version Control",
    "CI/CD",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Firebase",
    "Serverless",
    "Microservices",
    "Agile",
    "Scrum",
    "Kanban",
    "Design Patterns",
    "SOLID",
    "Clean Code",
    "Refactoring",
    "DevOps",
    "Continuous Integration",
    "Continuous Deployment",
    "Automation",
    "Frontend",
    "Backend",
    "Full Stack",
    "Progressive Web Apps",
    "Single Page Applications",
    "Web Performance",
    "Security",
    "OAuth",
    "JWT",
    "Accessibility",
    "SEO",
    "WebSockets",
    "GraphQL",
    "Apollo",
    "Relay",
    "Redux Saga",
    "Redux Thunk",
    "MobX",
    "Formik",
    "React Hook Form",
    "Formik",
    "Storybook",
    "Next Auth",
    "Prisma",
    "Sequelize",
    "TypeORM",
    "Hapi",
    "NestJS",
    "Svelte",
    "Sapper",
    "Gatsby",
    "Eleventy",
    "Parcel",
    "Rollup",
    "Vite",
    "Nx",
    "Hugo",
    "Jekyll",
    "WordPress",
    "Drupal",
    "Joomla",
    "Contentful",
    "Strapi",
    "Sanity",
    "Netlify",
    "Vercel",
  ];
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
  }, [authContext]);

  return (
    <>
      <DefaultLayout>
        <div className="flex items-center justify-between">
          <div className="px-4 py-2   sm:block">
           
              <div className="relative">
                <button title="op" className="absolute left-0 top-1/2 -translate-y-1/2">
                  <svg
                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                      fill=""
                    />
                  </svg>
                </button>

                <input
                 value={search}
                 onChange={(e)=>setSearch(e.target.value)}
                  type="text"
                  placeholder="Type to search..."
                  className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                />
              </div>
           
          </div>
          <div className="flex w-30 items-center justify-center rounded-lg border bg-primary  px-2 py-1 text-white dark:border-primary dark:bg-transparent dark:text-primary ">
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              ADD POST
            </button>
          </div>
        </div>

        <div className="my-3 px-4">
          Tags :{" "}
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-2 py-2">
            {tags.map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={(e: any) => {
                    setSearchTags(searchTags + item + ",");
                    setAppliedTags([...appliedTags, item]);
                  }}
                  className="cursor-pointer text-nowrap bg-meta-3 px-2 py-1 text-white dark:border dark:border-meta-3 dark:bg-transparent dark:text-meta-3"
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        {appliedTags.length > 0 && (
          <div className="my-3 px-4">
            Applied Tags :{" "}
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-2 py-2">
              {appliedTags.map((tag, idx) => {
                return (
                  <div
                    key={idx}
                    className=" bg-blue flex   items-center gap-2 text-nowrap border-[1px] bg-gray-3 px-2 py-1 dark:border dark:border-meta-3 dark:bg-transparent dark:text-meta-3"
                  >
                    <p>{tag}</p>

                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        const x = appliedTags
                          .slice(0, idx)
                          .concat(
                            appliedTags.slice(idx + 1, appliedTags.length),
                          );
                        setSearchTags(x.join(","));
                        setAppliedTags(x);
                      }}
                    >
                      {" "}
                      <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        height="1.1em"
                        width="1.1em"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={32}
                          d="M368 368L144 144M368 144L144 368"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {show && (
          <div className="w-[100%]">
            <CommunityPostFormModal setShow={setShow} />
          </div>
        )}
        <PostList search={search} searchTags={searchTags} />
      </DefaultLayout>
    </>
  );
}
