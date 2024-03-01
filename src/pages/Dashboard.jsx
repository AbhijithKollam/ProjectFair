import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import MyProjects from '../components/MyProjects'

function Dashboard() {
  const [userName ,setUserName] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const existingUserData = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserName(existingUserData.username)
        
    }
  } , [])
  return (
    <>
      <Header dashboard={"dashboard"} />
      <h2 className='mt-5 ms-3'> Welcome <span style={{ color: "orange" }}>{userName}</span></h2>
      <Row>
        <Col md={8} lg={8}>
          <MyProjects/>
        </Col>
        <Col md={4} lg={4}>
          <Profile />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard