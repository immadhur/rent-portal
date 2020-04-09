import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import style from './Customers.module.css';
import { Redirect } from 'react-router-dom';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
import Navigation from '../Navigation/Navigation';
import Spinner from '../UI/Spinner/Spinner';

const Customers = (props) => {
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Customers</h1>
            {props.loading ? <Spinner /> :
                <div className={style.custContainer}>
                    {props.customers.map(cust =>
                        <div key={cust._id} className={style.Customer}> {cust.customer_name}</div>
                    )}
                </div>
            }
        </div>
    );
}

export default Customers;