import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { allProjectApi } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken, setIsToken] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [allproject, setAllProject] = useState([])
  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectApi(searchKey, reqHeader);
      console.log("result for all project=========");
      console.log(result);
      setAllProject(result.data)
    }
  }
  useEffect(() => {
    getAllProject();
  }, [searchKey])
  console.log("searchkey===", searchKey);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  })

  return (
    <>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-column mt-5 mb-5'>
        <h2>All Projects</h2>
        <div className='mt-5 w-25 d-flex'>
          <input
            onChange={(e) => setSearchKey(e.target.value)}
            className='form-control' type="text" placeholder='Search Project using Technology' />
          <i class="fa-solid fa-magnifying-glass  mt-3 ms-2"></i>
        </div>
      </div>
      <Row className='m-5'>
        {
          allproject.length > 0 ?
            allproject.map((item) => (
              <Col sm={12} lg={4} md={4}>
                <Projectcard project={item} />
              </Col>
            )) :
            <div>
              {
                isToken ?
                  <p>No projects uploaded yet</p> :
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img src="https://st3.depositphotos.com/1717437/18622/v/450/depositphotos_186223678-stock-illustration-incognito-unknown-person-silhouette-man.jpg" alt="" height={"300px"} width={"300px"} />
                    <p className='text-danger fs-4'> Please <Link style={{textDecoration:"none"}} to={'/login'} >Login</Link> to view projects</p>
                  </div>

              }
            </div>
        }

      </Row>
    </>
  )
}

export default Project