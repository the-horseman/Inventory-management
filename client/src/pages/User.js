import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function User({ setUserDetails, userDetails }) {

    function changeUser({ tochange, id }) {
        const val = prompt(`Enter the new value of ${tochange}`);
        if (val == null || val == "") return;
        axios.post("http://localhost:3001/users/edit", {
            tochange: tochange,
            val: val,
            id: id
        }, {
            headers: {
                accesstoken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("User Edited Successfully, You will have to login again with new credentials");
                document.getElementById("logout-butt").click();
            }
        })
    }

    const changePassword = () => {
        const oldval = prompt("Enter the old password");
        if (oldval == null || oldval == "") return;
        const val = prompt("Enter the new password");
        if (val == null || val == "") return;
        if (val == oldval) {
            alert("New password cannot be same as old password");
            return;
        }
        axios.post("http://localhost:3001/users/edit", {
            tochange: "Password",
            val: val,
            id: userDetails.id
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("User Edited Successfully, You will have to login again with new credentials");
                document.getElementById("logout-butt").click();
            }
        })
    };

    return (
        <div className='user-container'>
            <h1>
                Username = {userDetails.username}
                <button onClick={() => { changeUser({ tochange: "Name", id: userDetails.id }) }}>Change</button>
            </h1>
            <h3>User ID = {userDetails.id}</h3>
            <h3>
                Email ID = {userDetails.email}
                <button onClick={() => { changeUser({ tochange: "Email", id: userDetails.id }) }}>Change</button>
            </h3>
            <h3>
                Phone Number = {userDetails.phoneNo}
                <button onClick={() => { changeUser({ tochange: "Phone No", id: userDetails.id }) }}>Change</button>
            </h3>
            <button onClick={changePassword}>Change Password</button><br /><br />
            <Link to='/'>Click to go to Inventory</Link>
        </div>
    )
}

export default User