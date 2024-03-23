import React, { useEffect, useState } from "react";
import AxiosService from "../utils/ApiService";
import uselogout from "../common/uselogout";
import BlogTile from "../common/BlogTile";
import { toast } from "react-toastify";

function Home() {
  let [blogs, setblogs] = useState([]);
  let logout = uselogout();

  let getBlogs = async () => {
    try {
      let res = await AxiosService.get("/dashboard");
      if (res.status === 200) {
        setblogs(res.data.blogs);
      }
    } catch (error) {
      toast.error(error.response.data.message);

      if (error.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="blogs-wrapper d-grid gap-2 m-lg-3 m-md-3">
          {blogs.map((e) => {
            return <BlogTile blog={e} key={e._id} />;
          })}
        </div>
      </div> 
    </>
  );
}

export default Home;


   

