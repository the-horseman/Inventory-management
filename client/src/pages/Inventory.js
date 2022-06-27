import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

function Inventory({ userDetails }) {

	// State for All the products
	const [listOfProducts, setListOfProducts] = useState([]);

	// Getting all the products
	useEffect(() => {
		axios.get("http://localhost:3001/products", {
			headers: {
				accesstoken: localStorage.getItem("accessToken"),
			}
		}).then((response) => {
			setListOfProducts(response.data);
			console.log(listOfProducts);
		});
	}, []);

	// Creating a new Product
	const createProduct = () => {
		axios.post("http://localhost:3001/products/create", {
			name: document.getElementById("add-product-name").value,
			description: document.getElementById("add-product-description").value,
			price: parseInt(document.getElementById("add-product-price").value),
			category: document.getElementById("add-product-category").value,
		}, {
			headers: {
				accesstoken: localStorage.getItem("accessToken"),
			}
		}).then((response) => {
			if (response.data.error) {
				alert(response.data.error);
			} else {
				alert("Product Created Successfully");
				setListOfProducts([...listOfProducts, response.data]);
			}
		})
	};

	return (
		<>
			<h1 id='inventory-head'>Inventory</h1>
			<div className='user-detils'>
				<h3>Hi {userDetails.username} !</h3>
			</div>
			<div className='inventory-container'>
				<div className='left-products'>
					{listOfProducts.map((value, key) => {
						return (
							<div key={value.id} className='product'>
								<h4 className='product-name'>{value.ItemName}</h4>
								<h5 className='product-description'>{value.description}</h5>
								<h5 className='product-price'>{value.price}</h5>
								<h5 className='product-category'>{value.category}</h5>
							</div>
						);
					})}
				</div>
				<div className="right-add-product">
					<h3>Add Product</h3><br />
					Product Name : <input type="text" id='add-product-name' /> <br />
					Product Price : <input type="text" id='add-product-price' /> <br />
					Product Description : <input type="text" id='add-product-description' /> <br />
					Product Category : <input type="text" id='add-product-category' /> <br />
					<button id='add-product-button' onClick={createProduct}>Add Product</button>
				</div>
			</div>
			<Link to="/category">Click To Add or View Categories</Link>
		</>
	)
}

export default Inventory