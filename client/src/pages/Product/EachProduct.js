import React from 'react'
import axios from 'axios';

function EachProduct({ listOfProducts, setListOfProducts }) {

    // Delete the product
    function deleteProduct(id) {
        axios.delete(`http://localhost:3001/products/${id}`, {
            headers: {
                accesstoken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("Product Deleted Successfully");
                setListOfProducts(
                    listOfProducts.filter((val) => {
                        return val.id != id;
                    })
                );
            }
        });
    }

    // Edit the product
    function changeProduct({ tochange, id }) {
        const val = prompt(`Enter the new value of ${tochange}`);
        if (val == null || val == "") return;
        axios.post("http://localhost:3001/products/edit", {
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
                alert("Product Edited Successfully");
                if (tochange == "Name") {
                    setListOfProducts(listOfProducts.map((value) => {
                        if (value.id == id) value.ItemName = val;
                        return value;
                    }));
                } else if (tochange == "Price") {
                    setListOfProducts(listOfProducts.map((value) => {
                        if (value.id == id) value.price = val;
                        return value;
                    }));
                } else {
                    setListOfProducts(listOfProducts.map((value) => {
                        if (value.id == id) value.description = val;
                        return value;
                    }));
                }
            }
        })
    }

    function getCategoryname(id) {
        axios.get(`http://localhost:3001/category/${id}`).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
                return null;
            } else {
                console.log("catname = ", response.data);
                return response.data;
            }
        });
    }

    return (
        <div className='left-products'>
            {listOfProducts.map((value, key) => {
                return (
                    <div key={value.id} className='product'>
                        <h4 className='product-name'>
                            Name = {value.ItemName}
                            <button onClick={() => { changeProduct({ tochange: "Name", id: value.id }) }}>Change</button>
                        </h4>
                        <h5 className='product-price'>
                            Price = {value.price}
                            <button onClick={() => { changeProduct({ tochange: "Price", id: value.id }) }}>Change</button>
                        </h5>
                        <h5 className='product-description'>
                            Description = {value.description}
                            <button onClick={() => { changeProduct({ tochange: "Description", id: value.id }) }}>Change</button>
                        </h5>
                        <h5 className='product-category'>Category = {getCategoryname(value.InvntCategoryId)}</h5>
                        <button onClick={() => { deleteProduct(value.id) }}>Delete</button><br /><br />
                    </div>
                );
            })}
        </div>
    )
}

export default EachProduct