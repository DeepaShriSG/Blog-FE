import React, { useEffect, useState } from 'react'
import Card from "../common/Card"
import { useParams } from 'react-router-dom'
import useLogout from '../common/uselogout'
import {toast} from 'react-toastify'
import AxiosService from '../utils/ApiService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


function Blog() {

  let logout = useLogout()
  let userData = JSON.parse(sessionStorage.getItem('userData'))

  return <>
    <div>
      {
        userData.role==='admin'?<AdminBlog/>:<EditBlog/>
      }

    </div>
  </>
}

function AdminBlog(){

  let params = useParams()
  let [blogs,setBlogs] = useState({})

  let navigate = useNavigate();

  let logout = useLogout()

  let getBlog = async()=>{
    try {
      let res = await AxiosService.get(`/blogs/${params.id}`)
      if(res.status===200)
      {
          setBlogs(res.data.blog)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        logout()
      }
    }
  }

  useEffect(()=>{
    if(params.id)
    {
      getBlog()
    }
    else
    {
      logout()
    }
  },[])

  let changeStatus = async(status,reason)=>{
   
    try {
      let reqBody = {};
      if (status === 'rejected') {
        reqBody.reason = reason;
      }
      let res = await AxiosService.put(`/blogs/status/${blog._id}/${status}`, reqBody);
      
      if(res.status===200)
      {
        toast.success(res.data.message)
        getBlog();
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error:", error);
      if(error.response.status===401)
      {
        logout()
      }
    }
  
}
  return <>
  <div>
    <div className='blogs-wrapper'><BlogTile blog={blog}/></div>
    <div style={{textAlign:"center"}}>
     {
      blogs.status!=='pending'?<Button variant='warning' onClick={()=>changeStatus("pending")}>Pending</Button>:<></>
     }
     &nbsp;
     {
        blogs.status!=='approved'?<Button variant='success' onClick={()=>changeStatus("approved")}>Approve</Button>:<></>
     }
     &nbsp;
     {
          blogs.status !== 'rejected' &&
          <Button variant='danger' onClick={() => {
            let reason = prompt("Please provide a reason for rejection:");
            if (reason !== null) {
              changeStatus("rejected", reason);
            }
          }}>Reject</Button>
        }
     
    </div>
  </div>
</>
}

function EditBlog(){
    let params = useParams()
    let [title,setTitle] = useState("")
    let [imageUrl,setImage] = useState("")
    let [description,setDescription] = useState("")
    let [blogs,setBlogs] = useState({})
    let navigate = useNavigate()
    let logout = useLogout()
    let getBlog = async()=>{
      try {
        let res = await AxiosService.get(`/blogs/${params.id}`)
        if(res.status===200)
        {
            setTitle(res.data.blogs.title)
            setImage(res.data.blogs.imageUrl)
            setDescription(res.data.blogs.description)
            setBlogs(res.data.blogs)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        if(error.response.status===401)
        {
          logout()
        }
      }
    }
  
    useEffect(()=>{
      if(params.id)
      {
        getBlog()
      }
      else
      {
        logout()
      }
    },[])
    let editblog = async({title,imageUrl,description})=>{
      try {
        let res = await AxiosService.put(`/blogs/edit/${blog._id}`,{
          title,imageUrl,description
        })
        if(res.status===200)
        {
          toast.success(res.data.message)
          navigate('/dashboard')
        }
      } catch (error) {
        toast.error(error.response.data.message)
        if(error.response.status===401)
        {
          logout()
        }
      }
    }
    return <>
      <div className="container">
      <div className="create-form d-flex flex-column justify-content-center m-3 p-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} placeholder="Enter Title"  onChange={(e)=>setTitle(e.target.value)}/>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text" value={imageUrl} placeholder="Image Url"  onChange={(e)=>setImage(e.target.value)}/>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" value={description} placeholder="Description" style={{ height: '100px' }} onChange={(e)=>setDescription(e.target.value)}/>
        </Form.Group>
  
          <h2 style={{textAlign:"center"}}>Preview</h2>
          <div className='blogs-wrapper'>
            <Card blogs={blogs}/>
          </div>
        <div style={{textAlign:"center"}}>
          <Button variant="primary" onClick={()=>editblog()}>
            Submit
          </Button>
          &nbsp;
          <Button variant='warning' onClick={()=>navigate('/dashboard')}>Cancel</Button>
        </div>
      </Form>
      </div>
      </div>
    
    </>
  }

export default Blog