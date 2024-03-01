import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'
import { deleteprojectApi, userProjectApi } from '../services/allAPI'

function MyProjects() {
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)

  const [userProject, setUserProject] = useState([])
  const getUserProject = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userProjectApi(reqHeader);
    console.log("Inside my projects=====");
    console.log(result.data);
    setUserProject(result.data);
  }
  useEffect(() => {
    getUserProject();
  }, [addProjectResponse,editProjectResponse])

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteprojectApi(id,reqHeader);
    console.log(result);
    if(result.status === 200){
      alert("Project deleted successfully")
      getUserProject();
    }
    else{

    }
  }
  return (
    <>
      <div className="card shadow p-5 ms-3 me-3 mb-5">
        <div className="d-flex mb-3">
          <h3 className='text-success ms-3'>My Projects</h3>
          <div className="ms-auto">
            <AddProject />
          </div>
        </div>
        <div>

          {
            userProject.length > 0 ?
              userProject.map((item) => (
                <div className="border d-flex align-items-center rounded p-2">
                  <h5>{item.title}</h5>
                  <div className="ms-auto">
                    <EditProject project={item}/>
                    <a href={item.github}>
                      <button className='btn'><i class="fa-brands fa-github text-success"></i></button>
                    </a>
                    <button className='btn'><i class="fa-solid fa-trash text-danger" onClick={()=>handleDelete(item._id)}></i></button>
                  </div>
                </div>
              )) :
              <p className='text-danger fw-bolder fs-4 mt-3'>No projects uploaded yet</p>

          }

        </div>
      </div>
    </>
  )
}

export default MyProjects