import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import style from './Initialize.module.css';
import { Redirect } from 'react-router-dom';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
import Navigation from '../Navigation/Navigation';
import Spinner from '../UI/Spinner/Spinner';
import AddCustomer from '../Customers/AddCustomer';
import AddProduct from '../Products/AddProduct'
import AddTransaction from '../Transactions/AddTransaction';

const Initialize = (props) => {

    const [prodDialog, setProdDialog] = useState(false);
    const [custDialog, setCustDialog] = useState(false);
    const [transDialog, setTransDialog] = useState(false);

    const prodClickHandler = () => {
        setProdDialog(true);
        props.addDialog();
    }

    const custClickHandler = () => {
        setCustDialog(true);
        props.addDialog();
    }

    const transClickHandler = () => {
        setTransDialog(true);
        props.addDialog();
    }

    const closeDialogHandler = () => {
        setProdDialog(false);
        setCustDialog(false);
        setTransDialog(false);
        props.closeDialog();
    }
    return (
        <div className={style.body}>
            <DialogBoxModel show={props.showDialog} close={closeDialogHandler}>
                {custDialog ?
                    <AddCustomer addClick={props.addCustomer} /> :
                    prodDialog ?
                        <AddProduct products={props.products} addClick={props.addProduct} /> :
                        transDialog ?
                            <AddTransaction products={props.products} customer={props.customers} addClick={props.addTransaction}/> :
                            null}
            </DialogBoxModel>
            <button onClick={prodClickHandler}>+ Product</button>
            <button onClick={custClickHandler}>+ Customer</button>
            <button onClick={transClickHandler}>+ Transaction</button>
        </div>
    );
}

export default Initialize;