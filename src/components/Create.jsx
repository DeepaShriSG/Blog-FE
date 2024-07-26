import React, { useState,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import useLogout from '../common/uselogout';
import { Formik } from "formik";
import * as Yup from "yup";
import { Form} from "react-bootstrap";
import { toast } from "react-toastify";
import ErrorProvider, { ErrorContext } from "../context/ErrorProvider";

function Create() {
 
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  let navigate = useNavigate()
  let logout = useLogout()

  let createBlog = async({title,imageUrl,description})=>{
    try {
      let res = await AxiosService.post('/blogs/create',{title,imageUrl,description})
      if(res.status===201)
      {
        toast.success(res.data.message)
        navigate('/dashboard')
      }
    } catch (error) {

      toast.error(error.response.data.message)
      if (
        error.response.data.message ||
        error.response ||
        error.response.data
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occured, Try again");
      }
    
      if(error.response.status===401)
      {
        logout()
      }
    }
  }

  const BlogSchema = Yup.object().shape({
    title: Yup.string().required("* Required"),
    imageUrl: Yup.string().required("* Required"),
    description: Yup.string().required("* Required")
  });

  return <>
          <div className="container">
            <div className="create-form d-flex flex-column justify-content-center m-3 p-3">
            <h3 style={{ textAlign: "center"}}>Share your thoughts!</h3>
            <Formik
              initialValues={{
                title: "",
                imageUrl: "",
                description: "",
              }}
              validationSchema={BlogSchema}
              onSubmit={(values) => {
                createBlog(values);
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
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.title && touched.title ? (
                      <div style={{ color: "red" }}>{errors.title}</div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>ImageUrl:</Form.Label>
                    <Form.Control
                      type="text"
                      name="imageUrl"
                      placeholder="Enter imageUrl"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.imageUrl && touched.imageUrl ? (
                      <div style={{ color: "red" }}>{errors.imageUrl}</div>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      placeholder="Enter Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.description && touched.description ? (
                      <div style={{ color: "red" }}>{errors.description}</div>
                    ) : null}
                      {errorMessage && (
                      <div style={{ color: "red" }}>{errorMessage}</div>
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
    
  </>
}

export default Create