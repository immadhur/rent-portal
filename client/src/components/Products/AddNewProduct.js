import React, { useState, useEffect, memo } from 'react';
// import style from './Initialize.module.css';

const AddNewProduct = (props) => {

    const [name, setName] = useState();
    const [qty, setQty] = useState()
    const [price, setPrice] = useState();

    const textChangeHandler = (e) => {
        const val = e.target.value;
        switch (e.target.id) {
            case 'name': setName(val);
                break;
            case 'qty': setQty(val);
                break;
            case 'price': setPrice(val);
                break;
        }
    }

    function getData() {
        return {
            product_title: name,
            qty_total: qty,
            qty_booked: 0,
            price: price
        }
    }

    return (
        <div>
            <h2>Add New Product</h2>
            <form>
                <label for='name'>Product Title</label>
                <input id='name' type='text' onChange={textChangeHandler} value={name} />
                <label for='qty'>Quantity</label>
                <input id='qty' type='number' onChange={textChangeHandler} value={qty} />
                <label for='price'>Price/day</label>
                <input id='price' type='number' onChange={textChangeHandler} value={price} />
                <button onClick={(e) => {
                    e.preventDefault();
                    console.log(name)
                    props.click('new', {...getData()})
                }}>Add</button>
            </form>
        </div>
    );
}

export default AddNewProduct;