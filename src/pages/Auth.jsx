import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from '../assets/image1.jpg'
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({ register }) {
    const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
    const navigate= useNavigate();
    const registerForm = register ? true : false;
    const [userData, setUserData] = useState({
        username:"",
        email: "",
        password:""
    })
const handleRegister= async (e)=>{
    e.preventDefault();
    console.log(userData);
    const {username,email,password} = userData;
    if(!username || !email || !password){
        alert("Please fill the form completely")
    }
    else{
        const result = await registerAPI(userData);
        console.log(result);

        if(result.status===200){
            alert("User registered successfully")
            setUserData({
                username:"",
                email: "",
                password:""
            })
            navigate('/login')
        }
        else{
            alert(result.response.data)
        }
    }
}
const handleLogin = async (e)=>{
    e.preventDefault();
    const {email,password} = userData;
    if(!email || !password){
        alert("Please fill the form completely")
    }
    else{
        const result = await loginAPI(userData);
        if (result.status===200){
            console.log(result);
            sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser) );
            sessionStorage.setItem("token",result.data.token);
            setIsAuthToken(true);
            alert("User logged in successfully")
            setUserData({
                username:"",
                email:"",
                password:""
            })
            navigate('/')
        }
        else{
            alert(result.response.data)
        }
    }
}
    return (
        <>
            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100vh", width: "100%" }}>
                <div className='w-75 container'>
                    <Link to={'/'} style={{ textDecoration: "none" }}> <i class="fa-solid fa-arrow-left me-2"></i> Back to home</Link>

                    <div className='card bg-success p-5 mt-3 rounded'>
                        <div className='row align-items-center'>
                            <div className='col-lg-6 col-md--6'>
                                <img src={authImage} alt="" width={"100%"} />

                            </div>
                            <div className='col-lg-6 col-md-6 p-3'>
                                <div className="d-flex  flex-column">

                                    <h2><i class="fa-brands fa-stack-overflow me-3 ms-5 fs-2"></i>Project Fair</h2>
                                    <h5>
                                        {
                                            registerForm ? "Sign Up your account" : "Sign into your account"
                                        }
                                    </h5>
                                    <Form>
                                        {
                                            registerForm &&
                                            <Form.Group md="4" controlId="validationCustom01">
                                            <Form.Label>User name</Form.Label>
                                            <Form.Control
                                            value={userData.username}
                                            onChange={(e)=>setUserData({...userData,username:e.target.value})}
                                                type="text"
                                                placeholder="User name"
                                            />
                                        </Form.Group>

                                        }
                                        

                                        <Form.Group md="4" controlId="validationCustom01">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                            value={userData.email}
                                            onChange={(e)=>setUserData({...userData,email:e.target.value})}

                                                type="email"
                                                placeholder=" Email"
                                            />
                                        </Form.Group>

                                        <Form.Group md="4" controlId="validationCustom01">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                            value={userData.password}
                                            onChange={(e)=>setUserData({...userData,password:e.target.value})}

                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Group>
                                        
                                    </Form>
                                    {
                                        registerForm?
                                        <div>
                                            <button className='btn btn-warning rounded mt-3' onClick={handleRegister}>Register</button>
                                            <p>Already a user? click here to <Link to={'/login'} style={{textDecoration:"none"}}>Login</Link> </p>
                                        </div>:
                                        <div>
                                            <Link>
                                            <button className='btn btn-warning rounded mt-3' onClick={handleLogin}>Login</button>
                                            </Link>
                                            <p>Already a user? click here to <Link to={'/register'} style={{textDecoration:"none"}}>Register</Link></p>
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}

export default Auth