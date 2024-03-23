import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import AxiosService from "../utils/ApiService";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let navigate = useNavigate();

  let handleLogin = async(e) => {
    try {
      let res = await AxiosService.post("/user/login", {
        email,
        password,
      });
      
      e.preventDefault();
     

      if (res.status === 200) {
        toast.success("Login Successfull");

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
      
        if (res.data.userData.role === 'admin') {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error:", error); 
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="w-100">
        <div className="row justify-content-center m-0">
          <div className="d-none d-lg-block d-md-block col-lg-7 col-md-7 col-12 p-0 home-content">
            <h6 className="p-2 m-3">Dhe Blogs</h6>
            <div className="container my-lg-4 my-md-3 p-lg-4 p-md-3">
              <h1 className="m-lg-2 p-lg-2">
                
                We believe in the power of storytelling and the magic of words.
              </h1>
              <h1 className="m-lg-2 p-lg-2">
                
                Whether you're here to write, read, or simply explore, we're
                thrilled to have you as part of our community.
              </h1>
            </div>
          </div>

          <div className="right-side col-lg-5 col-md-5">
            <div className="container">
              <h3 style={{ textAlign: "center" }}>Login Here!</h3>

              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Col>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <div className="text-end">
                 <Button onClick={handleLogin}>Submit</Button>
                 </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

