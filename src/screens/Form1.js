import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/form.css';
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import Footer from './Footer';

function Form1() {
  const [isEditable, setIsEditable] = useState(true); // default to editable

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchData(user.uid); // Call fetchData after user is set

      } else {
        navigate('/');
      }
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  const nameOptions = {
    "Basic Sciences & Humanities Department": ['Mr. Rajesh S. Nirgude 220048',
'Mr. Anil S. Mirgal 220049',
'Mr. Rajesh A. Gaikwad 220106',
'Ms. Chaitali S. Purav 220102',
'Ms. Minal V. Deshpande 220123',
'Mr. Ashok N. Ghadge 220006',
'Ms. Meera R. Jagtap 220011',
'Mr. Manoj Borkhade 220306',
'Mr. Amitsingh Rawat 220316'],

    "Artificial Intelligence & Data Science": ['Mr. Sudhir P. Kasar 220025',
'Ms. Kavita A. Pashte 220100',
'Mr. Sachin S. Dhale 220120',
'Ms. Bharati T. Sansare 220140',
'Mr. Suresh C. Ubale 220004',
'Mr. Prabhu S. Jadhav 220007'],

    "Computer Engineering": ['Mr. Nitin R. Urankar 220026',
'Mr. Santosh D. Jadhav 220101',
'Mr. Anand S. Kandalkar 220141',
'Mr. Milind K. Thorat 220132',
'Ms. Kalpana S. Bhamare 220126',
'Mr. Kishor R. Makwana 220015',
'Mr. Rajesh P. Jadav 220193'],

    "Electronics & Telecommunication Engineering": ['Ms. Punam Y. Alway 220032',
'Ms. Harshala N. Patil 220098',
'Ms. Sunita D. Tikekar 220104',
'Mr. Kishor B. Mugale 220111',
'Mr. Yuvraj P. Chavan 220099',
'Ms. Chaitra M. Wagh 220119',
'Ms. Nilka U. Adsul 220124',
'Mr. Mahesh R. Sawant 220002',
'Ms. Vimal V. Pawar 220014',
'Ms. Manjula R. Jadhav 220189'],

    "Information Technology": ['Mr. Kiran V. Hande 220035',
'Ms. Pallavi V. Chavda 220121',
'Mr. Mohd Raza S. Ansari 220139',
'Ms. Kavita V. Chimankare 220129',
'Mr. Vishal V. Khandekar 220136',
'Mr. Dinesh B. Paulekar 220010',
'Mr. Narendra T. Chandeliya 220188'],

    "Office Department": ['Ms. Sheeba S. Menon 220051',
'Mr. Sandeep D. Panchal 220054',
'Mr. Prabhakar B. Raut 220013',
'Mr. Ravindrakumar R. Sharma 220030',
'Mr. Sachin P. Pawar 220012',
'Mr. Sachin L. Shinde 220116',
'Mr. Prakash S. Dhasade 220029',
'Mr. Bholanath C. Jaiswar 220034',
'Mr. Sanjay L. Ghanekar 220028',
'Mr. Tika Singh B. Jaitwal 220031',
'Mr. Ramdas B. Shelke 220107',
'Mr. Vijay B. Kadam 220190',
'Mr. Mitun S. Bhojane 220192',
'Mr. Gautam H. Hiwale 220194'],

    "Accounts Department": ['Mr. Bhaskar D. Patil 220086','Mr. Vinod B. Kadam 220164'],
    
    "Examcell Department": ['Mr. Deepalsingh Rawat 220315',
'Ms. Geeta P. Gurav 220117',
'Ms. Hema M. Gavand 220146',
'Mr. Dattatray M. Bhoir 220191'],

    "Library Department": ['Ms. Jyoti U. Tikam 220222',
'Ms. Purva N. Sawant 220118',
'Mr. Rajendra N. Choukekar 220003',
'Mr. Yogesh B. Nar 220008']
  };
  
  // const fetchData = async (uid) => {
  //   const docRef = doc(db, 'staff', uid);
    
  //   try {
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       setName(data.name);
  //       setDepartment(data.department);
  //       setYear(data.year);
  //     } else {
  //       console.log("Document does not exist");
  //     }
  //   } catch (error) {
  //     console.log("Error fetching document:", error);
  //   }
  // };

  const fetchData = async (uid) => {
    const docRef = doc(db, 'staff', uid);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setDepartment(data.department);
        setYear(data.year);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log("Error fetching document:", error);
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const docRef = doc(db, 'staff', user.uid);
  //   const data = {
  //     role: 'staff',
  //     name,
  //     department,
  //     year,
  //     uid: user.uid,
  //   };
  //   if (name === '' || department === '' || year === '') {
  //     alert('Please fill all the fields');
  //     return;
  //   } else {
  //   await setDoc(docRef, data, { merge: true });
  //   }
  //   navigate('/form2a');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !department || !year) {
      alert('Please fill all the fields');
      return;
    }

    try {
      await handleSave(e);
      navigate('/form2a');
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   const docRef = doc(db, 'staff', user.uid);
  //   const data = {
  //     role: 'staff',
  //     name,
  //     department,
  //     year,
  //     uid: user.uid,
  //   };
  //   if (name === '' || department === '' || year === '') {
  //     alert('Please fill all the fields');
  //     return;
  //   } else {
  //   await setDoc(docRef, data, { merge: true });
  //   alert('Data saved successfully');
  //   }
  // };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name || !department || !year) {
      alert('Please fill all the fields');
      return;
    }

    try {
      // const docId = `${department}_${name}_${year}`; 
      const docRef = doc(db, 'staff', user.uid);
      const data = {
        role: 'staff',
        name,
        department,
        year,
        uid: user.uid,
      };
      await setDoc(docRef, data, { merge: true });
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };


  return (
    <Container fluid>
      <Row>

      <Col md={11} className="mx-auto " >
      <h1 className="text-center">Part A: General Information</h1>
          <Form onSubmit={handleSubmit}>

          <div className="context-box">
          
                
          <Form.Group className="mb-3" controlId="year">
  <Row>
    <Col md={3} className="form-label" >
      <Form.Label>Year of Appraisal:</Form.Label>
    </Col>
    <Col md={9}>
      <Form.Control
        as="select"
        
        value={year}
        onChange={(e) => setYear(e.target.value)}
        disabled={!isEditable}
      >
        <option value="">Select Year</option>
        <option value="2022-23">2022-23</option>
        <option value="2023-24">2023-24</option>
        <option value="2024-25">2024-25</option>
        <option value="2025-26">2025-26</option>
        <option value="2026-27">2026-27</option>
        <option value="2027-28">2027-28</option>
        <option value="2028-29">2028-29</option>
        <option value="2029-30">2029-30</option>
        <option value="2030-31">2030-31</option>
        <option value="2031-32">2031-32</option>
        <option value="2032-33">2032-33</option>
        <option value="2033-34">2033-34</option>
        <option value="2034-35">2034-35</option>
        <option value="2035-36">2035-36</option>
        <option value="2036-37">2036-37</option>
        <option value="2037-38">2037-38</option>
        <option value="2038-39">2038-39</option>
        <option value="2039-40">2039-40</option>
      </Form.Control>
    </Col>
  </Row>
        </Form.Group>        

           <Form.Group className="mb-3" controlId="department">
              <Row>
                <Col md={3} className="form-label">
              <Form.Label>Department:</Form.Label>
              </Col>
              <Col md={9}>
              <Form.Control
                as="select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={!isEditable}
              >
                <option value="">Select Department</option>
                <option value="Basic Sciences & Humanities Department">Basic Sciences & Humanities Department</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science Department</option>
                <option value="Computer Engineering">Computer Engineering Department</option>
                <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering Department</option>
                <option value="Information Technology">Information Technology Department</option>
                <option value="Office Department">Office Department</option>
                <option value="Accounts Department">Accounts Department</option>
                <option value="Examcell Department">Examcell Department</option>
                <option value="Library Department">Library Department</option>
              </Form.Control>
              </Col>
              </Row>
            </Form.Group> 

            <Form.Group className="mb-3" controlId="name">
        <Row>
          <Col md={3} className="form-label">
            <Form.Label>Name: </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              as="select"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!department}
            >
              <option value="">Select Name</option>
              {department && nameOptions[department].map((nameOption) => (
                <option key={nameOption} value={nameOption}>{nameOption}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </Form.Group>

          </div>
               
            
          </Form>
          <div className="text-center mb-4">
            <Row>
            <Col >
            <Button variant="primary" type="submit" onClick={handleSave}>
              <Link className="text-decoration-none text-white" >
                Save
              </Link>
            </Button>
          </Col>
              <Col>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  <Link className="text-decoration-none text-white">
                    Next
                  </Link>
                </Button>
              </Col>
            </Row>
            </div>

            
        </Col>
{/* <Footer /> */}
      </Row>
    </Container>
  );
}

export default Form1;



