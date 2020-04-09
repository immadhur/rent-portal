import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import style from './Products.module.css';
import { Redirect } from 'react-router-dom';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
import Navigation from '../Navigation/Navigation';
import Spinner from '../UI/Spinner/Spinner';

const Products = (props) => {
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Products</h1>
            {props.loading ? <Spinner /> :
                <div className={style.prodContainer}>
                    {props.products.map(prod =>
                        <div key={prod._id} className={style.Product}> {prod.product_title} : {prod.qty_total}</div>
                    )}
                </div>
            }
        </div>
    );
}

export default Products;