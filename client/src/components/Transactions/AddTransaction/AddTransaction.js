import React, { useState } from 'react';
import { Select, MenuItem } from '@material-ui/core';

const AddTransaction = (props) => {

    const [qty, setQty] = useState()
    const [product, setProduct] = useState(props.products[0])
    const [customer, setCustomer] = useState(props.customer[0])
    const [type, setType] = useState('In')
    const [currQty, setCurrQty] = useState(getCurrQty())

    const textChangeHandler = (e, id) => {
        const val = e.target.value;
        switch (id) {
            case 'product': setProduct(val);
                setCurrQty(getCurrQtyFromProduct(val));
                break;
            case 'customer': setCustomer(val);
                break;
            case 'type': setType(val);
                updateCurrQty(qty, val);
                break;
            case 'qty': setQty(val);
                updateCurrQty(val, type);
                break;
        }
    }

    function updateCurrQty(qty, type){
        return qty?
        type === 'In' ?
                    setCurrQty(Number(getCurrQty()) + Number(qty)) :
                    setCurrQty(Number(getCurrQty()) - Number(qty)):
                    '';
    }

    function getCurrQty() {
        let prod = props.productDetails.filter(p => p.product_title === product)[0];
        if(prod)
            return Number(prod.qty_total)-Number(prod.qty_booked);
    }

    function getCurrQtyFromProduct(prod) {
        let product = props.productDetails.filter(p => p.product_title === prod)[0];
        if(product)
            return prod.qty_total;
    }

    function getData() {
        console.log(product);
        return {
            product,
            customer,
            type,
            qty,
            currQty
        }
    }

    const addbuttonHandler = (e) => {
        e.preventDefault();
        if (qty) {
            if (type == 'Out' && currQty < 0)
                return;
            props.addClick({ ...getData() })
        }
    }

    return (
        <div>
            <h2>Add Transaction</h2>
            <form className='form'>
                <div className='formItem'>
                    <label htmlFor='product'>Product: </label>
                    <Select className='formInput' labelId="demo-simple-select-required-label" id="product"
                        value={product} onChange={(e) => textChangeHandler(e, 'product')}>
                        {props.products.map(prod =>
                            <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                        )}
                    </Select>
                </div>
                <div className='formItem'>
                    <label htmlFor='customer'>Customer: </label>
                    <Select className='formInput' labelId="demo-simple-select-required-label" id="customer" value={customer}
                        onChange={(e) => textChangeHandler(e, 'customer')}>
                        {props.customer.map(cust =>
                            <MenuItem key={cust} value={cust}>{cust}</MenuItem>
                        )}
                    </Select>
                </div>
                <div className='formItem'>
                    <label htmlFor='type'>Type: </label>
                    <Select className='formInput' labelId="demo-simple-select-required-label" id="type"
                        value={type} onChange={(e) => textChangeHandler(e, 'type')}>
                        <MenuItem key='in' value='In'>In</MenuItem>
                        <MenuItem key='out' value='Out'>Out</MenuItem>
                    </Select>
                </div>
                <div className='formItem'>
                    <label htmlFor='qty'>Quantity ({currQty})</label>
                    <input className='formInput' required id='qty' type='number' onChange={(e) => textChangeHandler(e, 'qty')} value={qty || ''} />
                </div>
                <button type='submit' onClick={addbuttonHandler}>Add</button>
            </form>
        </div>
    );
}

export default AddTransaction;