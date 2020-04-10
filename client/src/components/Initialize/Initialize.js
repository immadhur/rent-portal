import React, { useState } from 'react';
import style from './Initialize.module.css';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
import AddCustomer from '../Customers/AddCustomer';
import AddProduct from '../Products/AddProduct'
import AddTransaction from '../Transactions/AddTransaction/AddTransaction';

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
                    <AddCustomer addClick={props.addCustomer} customers={props.customers}/> :
                    prodDialog ?
                        <AddProduct products={props.products} addClick={props.addProduct} /> :
                        transDialog ?
                            <AddTransaction productDetails={props.productDetails} products={props.products} 
                            customer={props.customers} addClick={props.addTransaction}/> :
                            null}
            </DialogBoxModel>
            <button onClick={prodClickHandler}>+ Product</button>
            <button onClick={custClickHandler}>+ Customer</button>
            <button onClick={transClickHandler}>+ Transaction</button>
        </div>
    );
}

export default Initialize;