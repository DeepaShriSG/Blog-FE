import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import AxiosService from "../utils/ApiService";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ErrorProvider, { ErrorContext } from "../context/ErrorProvider";

function Signup() {
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  let navigate = useNavigate();

  const handleAddUser = async (values) => {
    try {
      let res = await AxiosService.post("/user/signup", values);

      if (res.status === 201) {
        toast.success("Signup Successfull");
        await navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (
        error.response.data.message ||
        error.response ||
        error.response.data
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occured, Try again");
      }
    }
  };

  const UserSchema = Yup.object().shape({
    firstName: Yup.string().required("* Required"),
    lastName: Yup.string().required("* Required"),
    email: Yup.string().email("* Invalid Email").required("* Required"),
    password: Yup.string().required("*Required"),
  });

  return (
    <div className="w-100">
      <div className="row justify-content-center m-0">
        <div className="d-none d-lg-block d-md-block col-lg-7 col-md-7 col-12 p-0 home-content">
          <h6 className="p-2 m-3">Dhe Blogs</h6>
          <div className="container my-lg-4 my-md-3 p-lg-4 p-md-3">
            <h1 className="m-lg-2 p-lg-2">
              {" "}
              We believe in the power of storytelling and the magic of words.{" "}
            </h1>
            <h1 className="m-lg-2 p-lg-2">
              {" "}
              Whether you're here to write, read, or simply explore, we're
              thrilled to have you as part of our community.{" "}
            </h1>
          </div>
        </div>

        <div className="right-side col-lg-5 col-md-5">
          <div className="container">
            <h3 style={{ textAlign: "center" }}>Register!</h3>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={UserSchema}
              onSubmit={(values) => {
                handleAddUser(values);
              }}
            >
              {({
                errors,
                touched,
                handleBlur,
                handleSubmit,
                handleChange,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.firstName && touched.firstName ? (
                      <div style={{ color: "red" }}>{errors.firstName}</div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.lastName && touched.lastName ? (
                      <div style={{ color: "red" }}>{errors.lastName}</div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errorMessage && (
                      <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                    {errors.password && touched.password && !errorMessage && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </Form.Group>
                  <div className="text-end">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
