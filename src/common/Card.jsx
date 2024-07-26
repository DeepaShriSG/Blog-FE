import React from 'react'

function Card({blogs}) {
  return (
    <>
     {blogs.map((e) => {
            return (
              <>
                <div key={e._id} className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0 justify-content-center align-items-center">
                    <div className="col-md-4">
                      <img src={`${e.imageUrl}`} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{e.title}</h5>
                        <p className="card-text">
                          {e.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
    </>
  )
}

export default Card