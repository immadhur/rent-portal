import React from 'react';
import style from './Products.module.css';
import Spinner from '../UI/Spinner/Spinner';

const Products = (props) => {
    let prodList = [...props.products];
    prodList.sort((a, b) => a.product_title > b.product_title ? 1 : -1);
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Products</h1>
            {props.loading ? <Spinner /> :
                <div className={style.prodContainer}>
                    {prodList.map(prod =>
                        <div key={prod._id} className={style.Product}>
                            <div className={style.ProductTitle}> {prod.product_title}</div>
                            <div className={style.ProductTxt}>
                                <label>Quantity Total: </label>
                                <label>{prod.qty_total}</label>
                            </div>
                            <div className={style.ProductTxt}>
                                <label>Quantity Booked: </label>
                                <p>{prod.qty_booked}</p>
                            </div>
                            <div className={style.ProductTxt}>
                                <label>Quantity Available: </label>
                                <p>{Number(prod.qty_total)-Number(prod.qty_booked)}</p>
                            </div>
                            <div className={style.ProductTxt}>
                                <label>Price/day: </label>
                                <p>{prod.price}</p>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default Products;