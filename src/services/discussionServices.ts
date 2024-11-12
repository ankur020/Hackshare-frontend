import axios from "axios";

export const createPost = async (
  title: string,
  description: string,
  link: string,
  teamId: string,
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}posts/create-post`,
      {
        title,
        description,
        link,
        teamId,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching resources",
    );
  }
};
export const generateAIresponse = async (
  title: string,
  description: string,
  teamId: string,
  postId : string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}genAi/gen-response`,
      {
        title,
        description,
        teamId,
        postId,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    return "Erroring fetching AI response ! "
  }
};


export const getPostsByTeam = async (teamId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}posts/getpostbyteams/${teamId}`,
    { withCredentials: true },
  );
  return response.data.data;
};

export const deletePost = async (postsId: string) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}posts/${postsId}`,
    { withCredentials: true },
  );
  return response.data;
};
