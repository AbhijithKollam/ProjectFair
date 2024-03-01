import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";

// 1.Register user
export const registerAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "")
}

// 2.Login user
export const loginAPI = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "")
}

// 3.Add projects
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI('post', `${BASE_URL}/project/add`, reqBody, reqHeader)
}

// 4.get home projects (3 items)
export const homeProjectApi = async () => {
    return await commonAPI('GET', `${BASE_URL}/project/home-project`, '', '')
}


//5. get all project
// search key is passed as query parameter
// syntax : path?key=value
export const allProjectApi = async (searchKey, reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/project/all-project?search=${searchKey}`, '', reqHeader)
}

//6 get user Project
export const userProjectApi = async (reqHeader) => {
    return await commonAPI('GET', `${BASE_URL}/project/user-project`, '' , reqHeader)
}

// 7. update user project
export const editUserProjectApi = async (id,reqBody,reqHeader) => {
    return await commonAPI('PUT', `${BASE_URL}/project/edit/${id}`, reqBody , reqHeader)
}

// 8. delete a project
export const deleteprojectApi = async (id,reqHeader) => {
    return await commonAPI('DELETE', `${BASE_URL}/project/remove/${id}`, {} , reqHeader)
}