import axios from "axios";

export const getAllRepos = async (teamId:string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/${teamId}`,
        { withCredentials: true },
      );
      console.log(response.data.data);
      return response.data.data.githubRepos

    } catch (error: any) {
      console.log(error);
    }
  };