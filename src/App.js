import React, {useState, useEffect} from 'react'
import {Link, HashRouter as Router, Route, Routes} from 'react-router-dom'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import LoginHOD from './screens/LoginHOD'
import {auth} from './firebase'
import {signOut } from 'firebase/auth'
import HomeScreen from './screens/HomeScreen'
import Form1 from './screens/Form1'
import Form2A from './screens/Form2A'

import Wave from 'react-wavify'
import Header from './assets/header.png'
import FormSubmission from './screens/FormSubmission'
import LoginPrincipal from './screens/LoginPrincipal'
import LoginScreen from './screens/LoginScreen'
import Form1BPC from './screens/Form1BPC'
import Form2APC from './screens/Form2APC'
import AboutUs from './screens/aboutus'

// import Footer from './screens/Footer'
// import GrandTotal from './screens/grandtotal'


import { db, storage } from "./firebase";
import { doc, collection, getDoc, setDoc, updateDoc, addDoc } from "firebase/firestore";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [user, setUser] = useState(null)

  // const handleSignOut = () => {
  //   signOut(auth)
  //   .then(() => {
  //     localStorage.clear()
  //     setIsAuth(false)
  //     window.location.pathname = '/'
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }
  
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      localStorage.clear();
      setIsAuth(false);
      // Redirect to the home screen
      window.location.pathname = '/'; // Assuming '/' is your home screen path
    })
    .catch((error) => {
      console.log(error);
    });
  };
  

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth')
    if (storedAuth) {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    }
    )
    return unsubscribe
  }
  , [])

  const fetchFacultyData = async (uid) => {
    const docRef = doc(db, "faculty", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data())
    }
  }

  const fetchHODData = async (uid) => {
    const docRef = doc(db, "hod", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data())
    }
  }

  const fetchPrincipalData = async (uid) => {
    const docRef = doc(db, "principal", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data())
    }
  }

  const handleNavigation = () => {
    if (userData) {
      if (window.location.pathname === '/') {
        if (userData.role === 'faculty') {
          window.location.pathname = '/form1'
        } else if (userData.role === 'hod') {
          window.location.pathname = '/form1ahod'
        }
        else if (userData.role === 'principal') {
          window.location.pathname = '/form1principal'
        }
      }
    }
  }

  useEffect(() => {
    if (user) {
      fetchFacultyData(user.uid)
      fetchHODData(user.uid)
    }
  }
  , [user])

  useEffect(() => {
    if (userData) {
      handleNavigation()
    }
  }
  , [userData])

  return (
    <Router>
      <Navbar  variant="dark" className="ms-auto" style={{backgroundColor: '#A02929', padding: 20}}>
        {/* <Container> */}
          <Navbar.Brand >
            <img src={Header} alt="header" style={{width: '400px', height: '80px'}} />
            
            {/* <Link to="/facultyform" className="text-decoration-none text-white">
              Faculty Form
            </Link> */}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuth ? (
              <Nav className="ml-auto">
                <Nav.Link>
                <Link to="/aboutus" style={{fontSize: 15}} className="text-decoration-none text-white">
                    ABOUT US
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={handleSignOut}>SIGN OUT</Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto" >
                <Nav.Link>
                  <Link to="/aboutus" style={{fontSize: 15}} className="text-decoration-none text-white">
                    ABOUT US
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/" className="text-decoration-none text-white">
                    LOGIN
                  </Link>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
          
      </Navbar>

      
      <Container>
      <Row>
        <Col>
         <h1 className="text-center large-heading"> Performance Appraisal Report System of Non-Teaching Staff </h1>
        </Col>
      </Row>
      </Container>
      <Routes>
        <Route path="/" element={<LoginScreen setIsAuth={setIsAuth} />} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/loginhod" element={<LoginHOD setIsAuth={setIsAuth} />} />
        <Route path="/loginprincipal" element={<LoginPrincipal setIsAuth={setIsAuth} />} />
        <Route path="/form2a" element={<Form2A />} />
        <Route path="/formsubmission" element={<FormSubmission />} />
    
        <Route path="/form1bprincipal" element={<Form1BPC />} />
        <Route path="/form2aprincipal" element={<Form2APC />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      {/* <Footer /> */}
    </Router>

  )
}

export default App