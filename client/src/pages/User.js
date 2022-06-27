import React from 'react'
import { Link } from 'react-router-dom'

function User({ userDetails }) {
    return (
        <div className='user-container'>
            <h1>Username = {userDetails.username}</h1>
            <h3>User ID = {userDetails.id}</h3>
            <h3>Email ID = {userDetails.email}</h3>
            <h3>Phone Number = {userDetails.phoneNo}</h3>
            <Link to='/'>Click to go to Inventory</Link>
        </div>
    )
}

export default User