import React, { useState, useEffect, memo } from 'react';
import { Select, MenuItem } from '@material-ui/core';

const AddExistingProduct = (props) => {

    const [qty, setQty] = useState()
    const [name, setName] = useState(props.products[0])

    const textChangeHandler = (e) => {
        const val = e.target.value;
        const id = e.target.id;
        if (id == 'name')
            setName(val)
        else
            setQty(val);
    }

    function getData() {
        return {
            product_title: name,
            qty_total: qty,
        }
    }

    const addbuttonHandler = (e) => {
        e.preventDefault();
        if (qty)
            props.click('existing', { ...getData() })
    }

    return (
        <div>
            <h2>Add Existing Product</h2>
            <form className='form'>
                <div className='formItem'>
                    <label htmlFor='name'>Product Title</label>
                    <Select className='formInput' labelId="demo-simple-select-required-label" id="name" value={name || ''} onChange={textChangeHandler}>
                        {props.products.map(prod =>
                            <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                        )}
                    </Select>
                </div>
                <div className='formItem'>
                    <label htmlFor='qty'>Quantity</label>
                    <input className='formInput' id='qty' type='number' onChange={textChangeHandler} value={qty || ''} />
                </div>
                <button onClick={addbuttonHandler}>Add</button>
            </form>
        </div>
    );
}

export default AddExistingProduct;