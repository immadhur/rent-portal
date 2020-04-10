import React, { useState } from 'react';

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

    const addbuttonHandler = (e) => {
        e.preventDefault();
        if (name && qty && price){
            let isDuplicate=props.products.filter(c=>c.toLowerCase()===name.toLowerCase()).length>0
            if(!isDuplicate)
                props.click('new', { ...getData() })
        }
    }

    return (
        <div>
            <h2>Add New Product</h2>
            <form className='form'>
                <div className='formItem'>
                    <label htmlFor='name'>Product Title</label>
                    <input className='formInput' id='name' type='text' onChange={textChangeHandler} value={name || ''} />
                </div>
                <div className='formItem'>
                    <label htmlFor='qty'>Quantity</label>
                    <input  className='formInput' id='qty' type='number' onChange={textChangeHandler} value={qty || ''} />
                </div>
                <div className='formItem'>
                    <label htmlFor='price'>Price/day</label>
                    <input className='formInput'  id='price' type='number' onChange={textChangeHandler} value={price || ''} />
                </div>
                <button onClick={addbuttonHandler}>Add</button>
            </form>
        </div>
    );
}

export default AddNewProduct;