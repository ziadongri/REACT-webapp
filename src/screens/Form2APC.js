import React, { useEffect, useState } from "react";
import { Container,Row, Col,Form,Button, Alert, Table} from "react-bootstrap";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, addDoc , onSnapshot, collection, query, where, getDocs} from "firebase/firestore";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadBytes } from "@firebase/storage";
import Footer from './Footer';

function Form2APC() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remarkprincipal, setRemarkPrincipal] = useState(""); 
  const [staffData, setStaffData] = useState(null);
  const location = useLocation();
  const staffUID = location.state.staffUID;
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  const fetchData = async () => {
    if (!staffUID) {
      setError("No staff UID provided");
      return;
    }

    try {
      const docRef = doc(db, "staff", staffUID, "partB", "CateroryI");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStaffData(docSnap.data());
        const data = docSnap.data();
        setRemarkPrincipal(data.remarkprincipal);
      } else {
        setError("No data found for the selected staff.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [staffUID]);

  const handleSave = async (e) => {
    e.preventDefault();
    const staffRef = doc(db, "staff", staffUID);
    const docRef = doc(db, "staff", staffUID, "partB", "CateroryI");
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() : {};
    const data = {
      remarkprincipal: remarkprincipal
    };
    
    if (remarkprincipal === "" ) {
      alert("Please fill the field");
      return;
    } 
     
    await setDoc(docRef, data, { merge: true });

    alert("Data Saved");
    // navigate('/formsubmission', { state: { staffUID } });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const staffRef = doc(db, "staff", staffUID);
    const docRef = doc(db, "staff", staffUID, "partB", "CateroryI");
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() : {};
    const data = {
      remarkprincipal: remarkprincipal
    };
    
    if (remarkprincipal === "" ) {
      alert("Please fill the field");
      return;
    } 
     
    await setDoc(docRef, data, { merge: true });

    alert("Data Saved");
    navigate('/formsubmission', { state: { staffUID } });
    // console.log(facultyAUID)
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={11} className="mx-auto">
          <h1 className="text-center">Part B: Scoring Indicators</h1>

          <Table striped bordered hover>
            <thead>
              <tr className='text-center'>
                <th>Sr. No.</th>
                <th>Grade / Indicators</th>
                <th>Best (9-10)</th>
                <th>Good (6-8)</th>
                <th>Average (4-5)</th>
                <th>Poor (1-3)</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td>1.</td>
                <td>Intelligence</td>
                <td>Extraordinary proficient and resourceful and understands new and difficult matters</td>
                <td>Quite able to handle new matters</td>
                <td>Normally understands new situations after proper explanations and handles it if given all directions</td>
                <td>Poor Comprehension to perform a function despite prior instructions</td>
                <td>{staffData ? staffData.info1 : ""}</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Discipline</td>
                <td>Exemplary Conduct</td>
                <td>Observes the code of conduct</td>
                <td>Tries to follow the general code of conduct</td>
                <td>Indifferent to the general code of conduct</td>
                <td>{staffData ? staffData.info2 : ""}</td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Punctuality and promptness in attending office, keeping appointment discharge of official duties and observance of time limits as per standing orders</td>
                <td>Exceptionally punctual and prompt</td>
                <td>Always punctual and prompt</td>
                <td>Usually punctual and prompt</td>
                <td>Not punctual and prompt</td>
                <td>{staffData ? staffData.info3 : ""}</td>
              </tr>
              <tr>
                <td>4.</td>
                <td>Responsibility and Dependability</td>
                <td>Very conscientious & dependable in performance of his / her job. Always ready to take responsibility</td>
                <td>Conscientious and steady worker has a good record of dependability</td>
                <td>Carries out his responsibility in a routine manner</td>
                <td>Often fails to perform his/her duty shirks responsibility</td>
                <td>{staffData ? staffData.info4 : ""}</td>
              </tr>
              <tr>
                <td>5.</td>
                <td>Interest in the Assignment and the capacity to see that the work is done</td>
                <td>Has initiative and takes keen interest</td>
                <td>Takes adequate interest</td>
                <td>Does his/ her work in a routine way</td>
                <td>Indifferent in the discharge of his / her duties</td>
                <td>{staffData ? staffData.info5 : ""}</td>
              </tr>
              <tr>
                <td>6.</td>
                <td>Technical and general knowledge about the job he / she is doing</td>
                <td>Has an unusually thorough and comprehensive mastery of his / her field of work. Strives to expand his/ her frontier of knowledge</td>
                <td>Knows his / her job thoroughly</td>
                <td>Possess just adequate knowledge required for the job</td>
                <td>Knowledge inadequate. Has not yet gained competence</td>
                <td>{staffData ? staffData.info6 : ""}</td>
              </tr>
              <tr>
                <td>7.</td>
                <td>Ability to prepare notes, drafts and handle correspondence</td>
                <td>Very precise in noting and drafting. Very prompt and accurate at correspondence his / her drafts need no editing</td>
                <td>Precise in noting and drafting. Good at correspondence his / her drafts seldom require editing</td>
                <td>Ordinary at noting and drafting. His / her drafts need editing. Tries to handle correspondence in time if properly supervised</td>
                <td>Poor in noting and drafting. Careless in handling correspondence</td>
                <td>{staffData ? staffData.info7 : ""}</td>
              </tr>
              <tr>
                <td>8.</td>
                <td>Maintenance of Registers and records keeping</td>
                <td>Very neat and meticulous in the maintenance of registers and records</td>
                <td>Keeps registers and records clean and up to date</td>
                <td>Tries to maintain registers and records in a routine manner</td>
                <td>Does not maintain registers and records properly</td>
                <td>{staffData ? staffData.info8 : ""}</td>
              </tr>
              <tr>
                <td>9.</td>
                <td>Delivering results</td>
                <td>Superior performance that consistently exceeds job requirements</td>
                <td>Strong performance that consistently meets and frequently exceeds job requirements</td>
                <td>Capable satisfactory performance that consistently meets and occasionally exceeds job requirements</td>
                <td>Inadequate performance that is consistently below job requirements and clearly problematic</td>
                <td>{staffData ? staffData.info9 : ""}</td>
              </tr>
              <tr>
                <td>10.</td>
                <td>Offers assistance support and feedback to students, employees and customers</td>
                <td>Consistently demonstrate courtesy, tact, and discretion when interfacing with others.</td>
                <td>Maintain supportive relationship with all. Uses initiatives to improve outcomes, processes, or measurements</td>
                <td>Generally adequate performance but needs some improvement in order to consistently meet job requirement</td>
                <td>Frequently rude behaviour. Does not treat students and faculty with respect</td>
                <td>{staffData ? staffData.info10 : ""}</td>
              </tr>
              <tr>
                <td></td>
                <td style={{ textAlign: "center", verticalAlign: 'middle' }} colSpan={5}>Total (Out of 100)</td>
                <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                  {staffData ? staffData.totalinfo : ""}
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="content-box">
            <Table striped bordered hover>
              <thead>
                <tr className='text-center'>
                  <th>Sr. No.</th>
                  <th>Warning / punishments / Improvements informed in the Academic year</th>
                  <th>Remarks and Suggestions by Head of the Department / section head</th>
                </tr>
              </thead>
              <tbody>
                {staffData && staffData.remark && staffData.remark.map((data, index) => (
                  <tr key={index}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{data.remark1}</td>
                    <td>{data.remark2}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="content-box">
            <p><b>Remark by Principal whether the staff is Approved / Not Approved for Annual Increment:</b></p>
            <input
        type="text"
        value={remarkprincipal}
        onChange={(e) => setRemarkPrincipal(e.target.value)}
        required
      />
          </div>

          <div className="text-center mb-4" >
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              <Link to="/form1bprincipal" className="text-decoration-none text-white">
                Previous
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSave}>
              
                Save
              
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
             
                Submit
              
            </Button>
          </Col>
          </Row>
          </div>

        </Col>
      </Row>
     
    </Container>
  );
}

export default Form2APC;
