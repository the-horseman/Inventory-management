import React from 'react'
import axios from 'axios';

function EachCategory({ listOfCategory, setListOfCategory }) {

	// Delete the category
	function deletecategory(id) {
		axios.delete(`http://localhost:3001/category/${id}`, {
			headers: {
				accesstoken: localStorage.getItem("accessToken"),
			}
		}).then((response) => {
			if (response.data.error) {
				alert(response.data.error);
			} else {
				alert("category Deleted Successfully");
				setListOfCategory(
					listOfCategory.filter((val) => {
						return val.id != id;
					})
				);
			}
		});
	}

	// Edit the category
	function changeCategory({ tochange, id }) {
		const val = prompt(`Enter the new value of ${tochange}`);
		if (val == null || val == "") return;
		axios.post("http://localhost:3001/category/edit", {
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
				alert("Category Edited Successfully");
				if (tochange == "Name") {
					setListOfCategory(listOfCategory.map((value) => {
						if (value.id == id) value.CatName = val;
						return value;
					}));
				} else {
					setListOfCategory(listOfCategory.map((value) => {
						if (value.id == id) value.description = val;
						return value;
					}));
				}
			}
		})
	}


	return (
		<div className='left-category'>
			{listOfCategory.map((value, key) => {
				return (
					<div key={value.id} className='category'>
						<h4 className='category-name'>
							Name = {value.CatName}
							<button onClick={() => { changeCategory({ tochange: "Name", id: value.id }) }}>Change</button>
						</h4>
						<h5 className='category-description'>
							Dsecription = {value.description}
							<button onClick={() => { changeCategory({ tochange: "Description", id: value.id }) }}>Change</button>
						</h5>
						<button onClick={() => { deletecategory(value.id) }}>Delete</button>
					</div>
				);
			})}
		</div>
	)
}

export default EachCategory