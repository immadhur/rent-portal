import React, { useState, useEffect, memo } from 'react';
import style from './AddExistingProduct.module.css';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
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

    return (
        <div>
            <h2>Add Existing Product</h2>
            <form>
                <div>
                    <label for='name'>Product Title</label>
                    <Select labelId="demo-simple-select-required-label" id="name" value={name} onChange={textChangeHandler}>
                        {props.products.map(prod =>
                            <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                        )}
                    </Select>
                </div>
                <div>
                    <label for='qty'>Quantity</label>
                    <input id='qty' type='number' onChange={textChangeHandler} value={qty} />
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    props.click('existing', { ...getData() })
                }}>Add</button>
            </form>
        </div>
    );
}

export default AddExistingProduct;