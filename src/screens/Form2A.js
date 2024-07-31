import React, { useEffect, useState } from "react";
import { Container,Row, Col,Form,Button, Alert, Table} from "react-bootstrap";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, addDoc , onSnapshot, collection, query, where, getDocs} from "firebase/firestore";
import {signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadBytes } from "@firebase/storage";
import Footer from './Footer';

function Form2A() {
  const [isEditable, setIsEditable] = useState(true); // default to editable

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");
  const [info3, setInfo3] = useState("");
  const [info4, setInfo4] = useState("");
  const [info5, setInfo5] = useState("");
  const [info6, setInfo6] = useState("");
  const [info7, setInfo7] = useState("");
  const [info8, setInfo8] = useState("");
  const [info9, setInfo9] = useState("");
  const [info10, setInfo10] = useState("");
  const [remark, setRemark] = useState([]);

  const [email, setEmail] = useState("");
 const [totalinfo, setTotalinfo] = useState('');
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


  const Total = () => {
    setTotalinfo(info1 + info2 + info3 + info4 + info5 + info6 + info7 + info8 + info9 + info10);
  };


  useEffect(() => {
    Total();
  }, [info1, info2, info3, info4, info5, info6, info7, info8, info9, info10]);

  const handleAddRemark = () => {
    setRemark([prevRemark => [...prevRemark,
      {
        remark1: '',
        remark2: '',
      }
    ]]);
  };

  const handleRemoveRemark = (index) => {
    setRemark(prevRemark => prevRemark.filter((remarkitem, i) => i !== index));
  };

  // const handleSave = async (e) => {
  //   {
  //     e.preventDefault();
  //     const staffRef = doc(db, "staff", user.uid);
  //     const docRef = doc(staffRef, "partB", 'CateroryI');
  //     const data = {
  //      info1,
  //       info2,
  //       info3,
  //       info4,
  //       info5,
  //       info6,
  //       info7,
  //       info8,
  //       info9,
  //       info10,
  //       totalinfo,
  //       remark,
  //     };

  //     if (
  //       info1 === "" ||
  //       info2 === "" ||
  //       info3 === "" ||
  //       info4 === "" ||
  //       info5 === "" ||
  //       info6 === "" ||
  //       info7 === "" ||
  //       info8 === "" ||
  //       info9 === "" ||
  //       info10 === "" ||
  //       totalinfo === ""
  //     ) {
  //       alert("Please fill all the fields");
  //       return;
  //     }
      
  //     else if (isNaN(totalinfo) || totalinfo < 0) {
  //       alert("Please enter a valid number for 'Total'");
  //       return;
  //     } 
    
  //     // Save data to Firestore
  //     await setDoc(docRef, data);
  //     alert("Data saved");
  //   };
  //   // navigate('/form2b');
  // };

  // const handleSubmit = async (e) => {
  //   {
  //     e.preventDefault();
  //     const staffRef = doc(db, "staff", user.uid);
  //     const docRef = doc(staffRef, "partB", 'CateroryI');
  //     const data = {
  //      info1,
  //       info2,
  //       info3,
  //       info4,
  //       info5,
  //       info6,
  //       info7,
  //       info8,
  //       info9,
  //       info10,
  //       totalinfo,
  //       remark,
  //     };

  //     if (
  //       info1 === "" ||
  //       info2 === "" ||
  //       info3 === "" ||
  //       info4 === "" ||
  //       info5 === "" ||
  //       info6 === "" ||
  //       info7 === "" ||
  //       info8 === "" ||
  //       info9 === "" ||
  //       info10 === "" ||
  //       totalinfo === ""
  //     ) {
  //       alert("Please fill all the fields");
  //       return;
  //     }
      
  //     else if (isNaN(totalinfo) || totalinfo < 0) {
  //       alert("Please enter a valid number for 'Total'");
  //       return;
  //     } 
    
  //     // Save data to Firestore
  //     await setDoc(docRef, data);
  //     alert("Data saved");
  //   };
  //   navigate('/formsubmission');
  // };

  const handleSave = async (e) => {
    e.preventDefault();
    
    const staffRef = doc(db, "staff", user.uid);
    const docRef = doc(staffRef, "partB", 'CateroryI');
    
    const data = {
      info1,
      info2,
      info3,
      info4,
      info5,
      info6,
      info7,
      info8,
      info9,
      info10,
      totalinfo,
      remark, // Ensure remark contains only objects with plain data
    };
  
    try {
      if (
        info1 === "" ||
        info2 === "" ||
        info3 === "" ||
        info4 === "" ||
        info5 === "" ||
        info6 === "" ||
        info7 === "" ||
        info8 === "" ||
        info9 === "" ||
        info10 === "" ||
        totalinfo === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
  
      if (isNaN(totalinfo) || totalinfo < 0) {
        alert("Please enter a valid number for 'Total'");
        return;
      }
  
      // Save data to Firestore
      await setDoc(docRef, data);
      alert("Data saved");
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const staffRef = doc(db, "staff", user.uid);
    const docRef = doc(staffRef, "partB", 'CateroryI');
    
    const data = {
      info1,
      info2,
      info3,
      info4,
      info5,
      info6,
      info7,
      info8,
      info9,
      info10,
      totalinfo,
      remark, // Ensure remark contains only objects with plain data
    };
  
    try {
      if (
        info1 === "" ||
        info2 === "" ||
        info3 === "" ||
        info4 === "" ||
        info5 === "" ||
        info6 === "" ||
        info7 === "" ||
        info8 === "" ||
        info9 === "" ||
        info10 === "" ||
        totalinfo === ""
      ) {
        alert("Please fill all the fields");
        return;
      }
  
      if (isNaN(totalinfo) || totalinfo < 0) {
        alert("Please enter a valid number for 'Total'");
        return;
      }
  
      // Save data to Firestore
      await setDoc(docRef, data);
      alert("Data saved");
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
    navigate('/formsubmission');
  };
  

  const fetchData = async (e) => {
    const staffRef = doc(db, "staff", user.uid);
    const docRef = doc(staffRef, "partB", 'CateroryI');
  
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        
       setInfo1(data.info1 || "");
        setInfo2(data.info2 || "");
        setInfo3(data.info3 || "");
        setInfo4(data.info4 || "");
        setInfo5(data.info5 || "");
        setInfo6(data.info6 || "");
        setInfo7(data.info7 || "");
        setInfo8(data.info8 || "");
        setInfo9(data.info9 || "");
        setInfo10(data.info10 || "");
        setTotalinfo(data.totalinfo || "");
        setRemark(data.remark || []);

      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchData(user.uid);
    }
  }, [user]);


 
  return (
    <Container fluid >
      <Row>
      <Col md={11} className="mx-auto " >
      <h1 className="text-center">Part B: Scoring Indicators</h1>
           
      <h1 className="text-center"></h1>

      {/* <p className='text-center' >
       NOTE: 1. Proof to be submitted for all claims and to be verified by HOD's in
        presence of respective faculty.
        <br />
        2. Upload document for below activities. To change the document, upload new document again.
      </p> */}

      <Form onSubmit={handleSubmit}>

        <Table striped bordered hover>
          <thead>
            <tr className='text-center' >
              <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
              <th style={{ verticalAlign: 'middle'}}>Grade / Indicators</th>
              <th style={{ verticalAlign: 'middle'}}>Best (9-10)</th>
              <th style={{ verticalAlign: 'middle'}}>Good (6-8)</th>
              <th style={{ verticalAlign: 'middle'}}>Average (4-5)</th>
              <th style={{ verticalAlign: 'middle'}}>Poor (1-3)</th>
              <th style={{ verticalAlign: 'middle'}}>Score</th>
            </tr>
          </thead>

          {/* <Form.Group className="mb-3" controlId="theorysub"> */}
          <tbody className='text-center'>
            <tr>
              <td className='text-center'>1.</td>
              <td>
                <Col>
                 Intelligence
                </Col>
             </td>

              <td className='text-center'> Extraordinary proficient and resourceful and understands new and difficult matters</td>

              <td>
              <p className='text-center'>Quite able to handle new matters</p>
              </td>
    
              <td className='text-center'> Normally understands new situations after proper explanations and handles it if given all directions </td>

              <td>
              Poor Comprehension to perform a function despite prior instructions
              </td>

              <td>  <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info1}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo1(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo1(1);
                              }
                            }}
                  
                  min={1}
                  max={10} 
                /></td>
            </tr>

            <tr>
              <td>2.</td>
              <td>
                <Col> Discipline </Col>
              </td>

              <td className='text-center'>Exemplary Conduct </td>

              <td>
              <p className='text-center'>Observes the code of conduct</p>
              </td>
              <td>
              Tries to follow the general code of conduct
              </td>
              <td>
              Indifferent to the general code of conduct
              </td>
              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info2}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo2(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo2(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td>3.</td>
              <td>
                <Col>
                Punctuality and promptness in attending office, keeping appointment discharge of official duties and observance of time limits as per standing orders
                </Col>
              </td>

              <td className='text-center'> Exceptionally punctual and prompt </td>

              <td>
              <p className='text-center'>Always punctual and prompt</p>
              </td>
              <td>
              Usually punctual and prompt
              </td>
              <td>
              Not punctual and prompt
              </td>
              <td>
                <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info3}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo3(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo3(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td>4.</td>
              <td>
                <Col>
                Responsibility and Dependability</Col>
              </td>

              <td className='text-center'> 
              Very conscientious & dependable in performance of his / her job. Always ready to take responsibility</td>

              <td>
              Conscientious and steady worker has a good record of dependability
              </td>

              <td>
              Carries out his responsibility in a routine manner
              </td>

              <td>
              Often fails to perform his/her duty shirks responsibility
              </td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info4}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo4(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo4(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td>5.</td>
              <td>
                <Col>Interest in the Assignment and the capacity to see that the work is done</Col>
              </td>

              <td > 
              Has initiative and takes keen interest</td>

              <td>
              Takes adequate interest
              </td>

              <td>
                Does his/ her work in a routine way
              </td>

              <td>
              Indifferent in the discharge of his / her duties
              </td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info5}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo5(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo5(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>

            </tr>

            <tr>
              <td>6.</td>
              <td>
                <Col>
                Technical and general knowledge about the job he / she is doing
                </Col>
              </td>

              <td > 
              Has an unusually thorough and comprehensive mastery of his / her field of work. Strives to expand his/ her frontier of knowledge</td>

              <td>
              Knows his / her job thoroughly
              </td>
              
              <td>
              Possess just adequate knowledge required for the job</td>

              <td>
              Knowledge inadequate. Has not yet gained competence
              </td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info6}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo6(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo6(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td>7.</td>
              <td>
                <Col>
                Ability to prepare notes, drafts and handle correspondence
                </Col>
              </td>

              <td > 
              Very precise in noting and drafting. Very prompt and accurate at correspondence his / her drafts need no editing</td>

              <td>
              Precise in noting and drafting. Good at corresponde his / her drafts seldom require editing
              </td>
              
              <td>
              Ordinary at noting and drafting. His / her drafts need editing. Tries to handle correspondence in time if properly supervised</td>

              <td>
              Poor in noting and drafting. Careless in handling correspondence
              </td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info7}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo7(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo7(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td>8.</td>
              <td>
                <Col>
                Maintenance of Registers and records keeping
                </Col>
              </td>

              <td > 
              Very neat and meticulous in the maintenance of registers and records</td>

              <td>
              Keeps registers and records clean and up to date
              </td>
              
              <td>
              Tries to maintain registers and records in a routine manner</td>

              <td>
              Does and maintain registers and records properly
              </td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info8}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo8(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo8(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td>9.</td>
              <td>
                <Col>
                Delivering results
                </Col>
              </td>

              <td > 
              Superior performance that consistently exceeds job requirements</td>

              <td>
              Strong performance that consistently meets and frequently exceeds job requirements
              </td>
              
              <td>
              Capable satisfactory performance that consistently meets and occasionally exceeds job requirements</td>

              <td>
              Inadequate performance that is consistently below job requirements and clearly problematic
              </td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info9}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo9(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo9(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td>10.</td>
              <td>
                <Col>
                Offers assistance support and feedback to students, employees and customers
                </Col>
              </td>

              <td > 
              Consistently demonstrate courtesy, tact, and discretion when interfacing with others.</td>

              <td>
              Maintain supportive relationship with all. Uses initiatives to improve outcomes, processes, or measurements
              </td>
              
              <td>
              Generally adequate performance but needs some improvement in order to consistently meet job requirement</td>

              <td>
              Frequently rude behaviour. Does not treat students and faculty with respect
              </td>

              <td>
              <Form.Control
                  type="text"
                  style={{ textAlign: "center" }}
                  value={info10}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                setInfo10(Math.max(1, Math.min(10, value)));
                              } else {
                                setInfo10(1);
                              }

                  }
                  }
                  min={1}
                  max={10}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td style={{ textAlign: "center", verticalAlign: 'middle' }} colSpan={5}>Total (Out of 100)</td>
             
              <td style={{ textAlign: "center", verticalAlign: 'middle' }}>
                 {totalinfo}
              </td>
            </tr>

          </tbody>
        </Table>

        <div className="content-box">
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
            <th style={{ verticalAlign: 'middle'}}>Sr. No.</th>
            <th style={{ verticalAlign: 'middle'}}>Warning / punishments / Improvements informed in the Academic year</th>
            <th style={{ verticalAlign: 'middle'}}>Remarks and Suggestions by Head of the Department / section head</th>
           
            </tr>
          </thead>

          {remark.map((remarkitem, index) => (
            <tbody key={index} >
              <tr >
                <td className='text-center'>{index + 1}</td>
                <td>

                 <Form.Group className="mb-3" controlId="remark1">
                 <Form.Text className="text-muted">
            (Minimum characters: 50, Maximum characters: 500)
          </Form.Text>
                  <Form.Control
                    as="textarea"
                    rows={3} 
                    value={remarkitem.remark1}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const newRemark = remark.map((remarkitem, i) => 
                        i === index ? { ...remarkitem, remark1: e.target.value } : remarkitem);
                      setRemark(newRemark);
                    } }
                      
                      />

                  </Form.Group>
                
                </td>

                <td>
                <Form.Group className="mb-3" controlId="remark2">
                <Form.Text className="text-muted">
            (Minimum characters: 50, Maximum characters: 500)
          </Form.Text>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={remarkitem.remark2}
                    style={{ textAlign: "center" }}
                    onChange={(e) => {
                      const newRemark = remark.map((remarkitem, i) => 
                        i === index ? { ...remarkitem, remark2: e.target.value } : remarkitem);
                      setRemark(newRemark);
                    }}
                      />
                  </Form.Group>

                </td>
                
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveRemark(index)} >
                    Remove
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
          
        </Table>


        <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddRemark} >
            <Link className="text-decoration-none text-white">Add Remarks </Link>
          </Button>
          </Col>
          </Row>
          </div>
      </div>  
        
      </Form>
      
       

      <div className="text-center mb-4" >
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              <Link to="/form1" className="text-decoration-none text-white">
                Previous
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSave} >
              <Link className="text-decoration-none text-white">
                Save
              </Link>
              
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              <Link className="text-decoration-none text-white">
                Submit
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

export default Form2A;
