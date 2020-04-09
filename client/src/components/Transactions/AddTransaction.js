import React, { useState, useEffect, memo } from 'react';
// import style from './AddExistingProduct.module.css';
import { Select, MenuItem } from '@material-ui/core';

const AddTransaction = (props) => {

    const [qty, setQty] = useState()
    const [product, setProduct] = useState(props.products[0])
    const [customer, setCustomer] = useState(props.customer[0])
    const [type, setType] = useState('In')

    const textChangeHandler = (e) => {
        const val = e.target.value;
        switch (e.target.id) {
            case 'product': setProduct(val);
                break;
            case 'customer': setCustomer(val);
                break;
            case 'type': setType(val);
                break;
            case 'qty': setQty(val);
                break;
        }
    }

    function getData() {
        return {
            product,
            customer,
            type,
            qty
        }
    }

    return (
        <div>
            <h2>Add Existing Product</h2>
            <form>
                <div>
                    <label for='name'>Product: </label>
                    <Select labelId="demo-simple-select-required-label" id="product" value={product} onChange={textChangeHandler}>
                        {props.products.map(prod =>
                            <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                        )}
                    </Select>
                </div>
                <div>
                    <label for='name'>Customer: </label>
                    <Select labelId="demo-simple-select-required-label" id="customer" value={customer} onChange={textChangeHandler}>
                        {props.customer.map(cust =>
                            <MenuItem key={cust} value={cust}>{cust}</MenuItem>
                        )}
                    </Select>
                </div>
                <div>
                    <label for='name'>Type: </label>
                    <Select labelId="demo-simple-select-required-label" id="type" value={type} onChange={textChangeHandler}>
                        <MenuItem key='in' value='In'>In</MenuItem>
                        <MenuItem key='out' value='Out'>Out</MenuItem>
                    </Select>
                </div>
                <div>
                    <label for='qty'>Quantity</label>
                    <input id='qty' type='number' onChange={textChangeHandler} value={qty} />
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    props.addClick({ ...getData() })
                }}>Add</button>
            </form>
        </div>
    );
}

export default AddTransaction;