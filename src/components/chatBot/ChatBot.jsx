import React, { useEffect, useRef, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
const ChatBot = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [
        {
          text: "Hello there, welcome to HackShare! Im here to help you make the most of your hackathon experience.",
        },
      ],
    },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const [chat, setChat] = useState(null);
  const chatbox = useRef();

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const MODEL_NAME = "gemini-1.0-pro-001";
  const genAI = new GoogleGenerativeAI(apiKey);
  const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 80,
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  const addMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newMsg.length == 0) return;
    else {
      const usermsg = { role: "user", parts: [{ text: newMsg }] };
      setMessages([...messages, usermsg]);
      try {
        setNewMsg("");
        if (chat) {
          const result = await chat.sendMessage(newMsg);
          const botmsg = {
            parts: [{ text: result.response.text() }],
            role: "model",
          };
          setMessages([...messages, usermsg, botmsg]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (chatbox) {
      console.log("hello");
      chatbox.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })

          .startChat({
            generationConfig,
            safetySettings,
            history: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are an assistant for HackShare, a collaborative app designed for hackathons to manage team resources and communication use this context only to answer my questions dont add anything on your own.
Create Team: Navigate to the Teams page and type the name of team in join team section to create a team.
Join Team: Go to the Teams page, enter the team code in join team section, and join a team.
Resource Upload: there are 4 types of resources, go to teams , open your team page where you can find links to images , documents , discussion , gihtubrepo pages  , visit the desired link and on there you can upload your resource for your team.
GitHub Repo: Upload a repo on Teams visit your team open its related GitHub-repo page, then view commits and pull requests.
Discussion Section: Navigate to Teams open Your Team page then navigate to Discussion page then you can upload discussions. This section is AI-powered.
Community Page: Connect with users over the internet, you can make your post , like and comment on other users post and filter among post according to your need`,
                  },
                ],
              },
              ...messages,
            ],
          });
        setChat(newChat);
      } catch (e) {
        console.log(e);
      }
    };
    initChat();
  }, []);

  return (
    <>
      <div className="relative " onClick={() => setShow(!show)}>
        <button
          className="fixed bottom-0 right-3  mb-5 mr-1 flex 
                  shrink-0 grow-0 flex-col justify-around
                  rounded-lg text-white lg:mb-5 lg:mr-5 "
        >
          <div className="rounded-full border-4 border-white bg-green-600 p-2">
            <svg
              className="h-10 w-10 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      {
        <div
          id="chat-container"
          className={`fixed ${!show && "hidden "} bottom-4 w-[93%]  md:max-w-96 lg:right-8`}
        >
          <div className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-black">
            <div className="flex items-center justify-between rounded-t-lg bg-primary  p-2 text-white">
              <p className="text-lg font-semibold">HackAI</p>
              <button
                onClick={() => setShow(!show)}
                id="close-chat"
                className="text-gray-300 hover:text-gray-400 focus:text-gray-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              id="chatbox"
              ref={chatbox}
              className="no-scrollbar h-60 overflow-y-auto  p-4"
            >
              {messages.map((item, idx) => {
                if (item.role === "user") {
                  return (
                    <div key={idx} className="mb-2 text-right">
                      <p className="inline-block rounded-lg bg-primary px-4 py-2 text-white">
                        {item.parts[0].text}
                      </p>
                    </div>
                  );
                } else if (item.role == "model") {
                  return (
                    <div key={idx} className="mb-2">
                      <p className="inline-block  rounded-lg bg-[#f1f5f9] px-4 py-2 text-black">
                        {item.parts[0].text}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
            {loading && (
              <div class="flex h-2 space-x-2 px-4  py-2  ">
                <span class="sr-only">Loading...</span>
                <div class="h-2 w-2   animate-bounce rounded-full bg-black [animation-delay:-0.3s] dark:bg-white"></div>
                <div class="h-2 w-2  animate-bounce rounded-full bg-black [animation-delay:-0.15s] dark:bg-white"></div>
                <div class="h-2 w-2  animate-bounce rounded-full bg-black dark:bg-white"></div>
              </div>
            )}
            <form onSubmit={addMessage} className="flex  p-1">
              <input
                value={newMsg}
                onChange={(e) => {
                  setNewMsg(e.target.value);
                }}
                id="user-input"
                type="text"
                placeholder="Type a message"
                className="w-full rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                id="send-button"
                className="rounded-r-md bg-primary px-4 py-2 text-white transition duration-300 "
              >
                Send
              </button>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default ChatBot;
