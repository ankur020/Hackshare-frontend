import axios from "axios";

export const communityPost= async (title:string , content:string,tags:string) => {
    
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}community/create-post`,
            { title, content, tags: tags.split(",").map((tag) => tag.trim()) },
            { withCredentials: true },
          );
      console.log(response.data.data);
      return response

    
  };