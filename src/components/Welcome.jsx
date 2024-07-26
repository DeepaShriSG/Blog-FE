import React,{useRef,useEffect} from "react";
import Typed from "typed.js";
import { Button } from "react-bootstrap"
import {useNavigate} from "react-router-dom"

function Welcome() {

    let navigate = useNavigate()

    let ref = useRef()

    useEffect(() => {
      
      const typed = new Typed(ref.current, {
        strings: [' <h2>write</h2>', '<h2>read</h2>','<h2>simply explore</h2>' ],
        typeSpeed: 150,
        backSpeed: 150,
        loop: true
      });
    
      return () => {
        typed.destroy();
      }
    }, [])
    

  return (
    <div className="w-100">
      <div className="row justify-content-center m-0">
        <div className="d-none d-lg-block d-md-block col-lg-7 col-md-7 col-12 p-0 home-content">
         <h6 className="p-2 m-3" style={{color:"voilet",fontWeight:"600"}}>Dhe Blogs</h6>
         <div className="container my-lg-4 my-md-3 p-lg-4 p-md-3">
         <h3 className="welcome-content m-5 p-5"> Whether you're here to &nbsp;
         <span className="p-2" ref={ref} style={{color:"black" , display: "inline-block"}} ></span>&nbsp;
          we're thrilled to have you as part of our community.  </h3>  
         </div>
        
        </div>

        <div className="right-side col-lg-5 col-md-5 p-0">
            <div className="row m-0">
            <div className="container my-4 p-3 text-center home-container">
            <h3 className="home-heading p-2">Getting Started</h3>
            <div className="home-button">
              <Button variant="primary m-2 px-5  py-2" onClick={() => navigate("/login")}> Login </Button>
              <Button variant=" m-2 px-5  py-2" onClick={() => navigate("/signup")} > Signup </Button>
            </div>
          </div>  
          <div className="home-footer d-flex justify-content-center">
          <img src="/bloglogo.svg" alt="" srcSet="" width={70} height={70} className="rounded-circle p-2" />
          <div className="vr"></div>
          <h6 className="text-center m-2 p-2">Dhe Blogs</h6>
          </div> 
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default Welcome;
