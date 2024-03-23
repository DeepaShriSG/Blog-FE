import React,{useState,useEffect} from 'react'
import uselogout from "../common/uselogout"
import {useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Uselogout from "../common/uselogout";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {

  const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    let [role,setRole] = useState("")
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();

    let logout = uselogout()

    useEffect(() => {
      if (!userData) {
          logout();
      } else {
          setRole(userData.role);
      }
  }, [logout]);
   
  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  return <>
          <Navbar expand="md">
            <Container fluid>
                <Navbar.Brand href="#">Dhe Blogs</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-offcanvas" onClick={handleToggleOffcanvas} />
                <Navbar.Collapse id="navbar-offcanvas">
                    <Nav className="me-auto">
                        {role === 'admin' ? <AdminNav /> : <UserNav />}
                    </Nav>
                    <Nav>
                        <Nav.Item className="text-center m-lg-2 m-md-2">{` ${userData.firstName} ${userData.lastName} `}</Nav.Item>
                             &nbsp; &nbsp;
                        <Nav.Item onClick={logout}><Button type="button" className="btn mx-2">Logout</Button></Nav.Item>
                      </Nav>
                </Navbar.Collapse>
                <Offcanvas
                    show={showOffcanvas}
                    onHide={() => setShowOffcanvas(false)}
                    placement="end"
                    aria-labelledby="navbar-offcanvas"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="navbar-offcanvas">Dhe Blogs</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            {role === 'admin' ? <AdminNav /> : <UserNav />}
                        </Nav>
                        <Nav>
                        <Nav.Item>{`${userData.firstName} ${userData.lastName} `}</Nav.Item>
                             &nbsp; &nbsp;
                        <Nav.Item onClick={logout}><Button type="button" className="btn logout-btn">Logout</Button></Nav.Item>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </Navbar>
  </>
}

function AdminNav() {

    let navigate = useNavigate()
    let logout = uselogout()

    return <>
          <div>
          <Nav onClick={()=>navigate("/dashboard")}>Dashboard</Nav>  
          </div>       
    </>
}

function UserNav() {

    let navigate = useNavigate()
    let logout = uselogout()

    return <>
    <div className="d-flex gap-2">
          
          <Nav onClick={()=>navigate("/home")}>Home</Nav>
          <Nav onClick={()=>navigate("/dashboard")}>Dashboard</Nav>
          <Nav onClick={()=>navigate("/create")}>Create</Nav>
    </div>
    </>
}

export default Header