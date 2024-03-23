import React from "react";

function BlogTile({ blog }) {
  return (
    <>
       <div className="container d-flex justify-content-center">
        <div className="row row-cols-1 row-cols-md-2 g-2 py-2 m-2">
          <div className="col">
            <div className="card" style={{width:"24rem"}}>
              <img src={blog.imageUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.description}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}

export default BlogTile;
