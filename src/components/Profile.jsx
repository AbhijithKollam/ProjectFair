import React from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';

function Profile() {
    const [open, setOpen] = useState(false);
    return (

        <>
            <div className='card shadow p-5 mb-5'>
                <div className='d-flex justify-content-between'>
                    <h2>Profile</h2>
                    <button className='btn btn-outline-info' onClick={() => setOpen(!open)}>
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                </div>
                <Collapse in={open}>
                <div>
                    <label htmlFor="profile" className='text-center mb-2 mt-3'>
                        <input type="file" id='profile' style={{ display: "none" }} />
                        <img className='rounded' src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=" alt="" width={'200px'} height={"200px"} />

                    </label>
                    <div className=''>
                        <div >
                        <input type="text" className='form-control' placeholder='Github Link'/>
                        <input type="text" className='form-control mt-3 mb-3' placeholder='LinkedIn Link' />
                        </div>
                       
                        <button className='btn btn-success rounded w-100 form-control'>Update</button>
                    </div>
                </div>
                </Collapse>
            </div>

        </>
    )
}

export default Profile