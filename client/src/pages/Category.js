import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Category({ userDetails }) {

    // State for All the category
    const [listOfCategory, setListOfCategory] = useState([]);

    // Getting all the category
    useEffect(() => {
        axios.get("http://localhost:3001/category", {
            headers: {
                accesstoken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            setListOfCategory(response.data);
            console.log(listOfCategory);
        });
    }, []);

    // Creating a new Category
    const createCategory = () => {
        axios.post("http://localhost:3001/category/create", {
            name: document.getElementById("add-category-name").value,
            description: document.getElementById("add-category-description").value,
        }, {
            headers: {
                accesstoken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("Category Created Successfully");
                setListOfCategory([...listOfCategory, response.data]);
            }
        })
    };

    return (
        <>
            <h1 id='category-head'>Category</h1>
            <div className='user-detils'>
                <h3>Hi {userDetails.username} !</h3>
            </div>
            <div className='category-container'>
                <div className='left-category'>
                    {listOfCategory.map((value, key) => {
                        return (
                            <div key={value.id} className='category'>
                                <h4 className='category-name'>{value.CatName}</h4>
                                <h5 className='category-description'>{value.description}</h5>
                            </div>
                        );
                    })}
                </div>
                <div className="right-add-category">
                    <h3>Add Category</h3><br />
                    Category Name : <input type="text" id='add-category-name' /> <br />
                    Category Description : <input type="text" id='add-category-description' /> <br />
                    <button id='add-category-button' onClick={createCategory}>Add Category</button>
                </div>
            </div>
            <Link to="/">Go Back to Products</Link>
        </>
    )
}

export default Category