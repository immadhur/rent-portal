import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import style from './Home.module.css';
import { Redirect } from 'react-router-dom';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
import Navigation from '../Navigation/Navigation';
import Spinner from '../UI/Spinner/Spinner';
import Initialize from '../Initialize/Initialize';
import Products from '../Products/Products';
import Customer from '../Customers/Customers';
import Transactions from '../Transactions/Transaction';

const Home = (props) => {

    let [productsList, setProductsList] = useState([]);
    let [customerList, setCustomerList] = useState([]);
    let [transactionsList, setTransactionsList] = useState([]);
    let [showAddDialog, setShowAddDialog] = useState(false);
    let [prodLoading, setProdLoading] = useState(true);
    let [custLoading, setCustLoading] = useState(true);

    useEffect(() => {
        try {
            fetchAllData()
        } catch (err) {
            console.log(err);
        }

    }, [])

    async function fetchAllData() {
        await fetchProductData();
        await fetchCustomerData();
        await fetchTransactionData();
    }

    async function fetchProductData() {
        try {
            setProdLoading(true)
            const res = await axios.get('/product', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let products = res.data.products;
            console.log(products);
            setProductsList([...products]);
            console.log('In Product');
        } catch (error) {
            console.log(error);
        } finally {
            setProdLoading(false)
        }
    }

    async function fetchCustomerData() {
        try {
            setCustLoading(true);
            const res = await axios.get('/customer', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let customers = res.data.customers;
            console.log(customers);
            setCustomerList([...customers]);
        } catch (error) {
            console.log(error);
        } finally {
            setCustLoading(false);
        }
    }

    const fetchTransactionData = async () => {
        try {
            // setCustLoading(true);
            const res = await axios.get('/transaction', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let transactions = res.data.transaction;
            const trans = transactions.map(t => {
                console.log(t);
                const prod = productsList.filter(p => p._id == t.product_id)[0].product_title;
                const cust = customerList.filter(p => p._id == t.customer_id)[0].customer_name;
                return {
                    qty: t.quantity,
                    date: t.transation_date_time_,
                    product: prod,
                    customer: cust,
                    type: t.transation_type
                }
            })
            console.log(trans);
            setTransactionsList([...trans]);
        } catch (error) {
            console.log(error);
        } finally {
            setCustLoading(false);
        }
    }

    async function addCustomer(name) {
        try {
            const res = await axios.post('/customer', { customer_name: name }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            addDialogCloseHandler();
            fetchCustomerData();
        } catch (error) {
            console.log(error);
        }
    }

    async function addProduct(type, data) {
        try {
            if (type == 'new') {
                const res = await axios.post('/product', { ...data }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
            else {
                let prod = productsList.filter(p => p.product_title == data.product_title)[0];
                console.log(prod);
                const qty = Number(prod.qty_total) + Number(data.qty_total);
                const res = await axios.patch(`/product/${prod._id}`, { ...data, qty_total: qty }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
            addDialogCloseHandler();
            fetchProductData();
        } catch (error) {
            console.log('Add prod err ', error);
        }
    }

    function getDate() {
        var today = new Date();
        var date = +today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '/';
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + ' ' + time;
    }

    async function addTransaction(data) {
        try {
            const cust = customerList.filter(p => p.customer_name == data.customer)[0]
            const prod = productsList.filter(p => p.product_title == data.product)[0];
            const dataToSend = {
                transation_date_time_: getDate(),
                customer_id: cust._id,
                product_id: prod._id,
                transation_type: data.type,
                quantity: data.qty
            }
            const res = await axios.post('/transaction', { ...dataToSend }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            addDialogCloseHandler();
            fetchTransactionData();
        } catch (error) {
            console.log(error);
        }
    }


    const addDialogHandler = () => {
        setShowAddDialog(true);
    }

    const addDialogCloseHandler = () => {
        setShowAddDialog(false);
    }

    const getProductsFromList = () => {
        return productsList.map(x => x.product_title);
    }

    const getCustomersFromList = () => {
        return customerList.map(x => x.customer_name);
    }

    return (
        <>
            <div className={style.body}>
                <Navigation />
                <Initialize click={addDialogHandler} addProduct={addProduct}
                    closeDialog={addDialogCloseHandler} addDialog={addDialogHandler}
                    addCustomer={addCustomer} showDialog={showAddDialog} addTransaction={addTransaction}
                    products={[...getProductsFromList()]} customers={[...getCustomersFromList()]} />
                <Products products={productsList} loading={prodLoading} />
                <Customer customers={customerList} loading={custLoading} />
                <Transactions transactions={transactionsList} loading={false} />
            </div>
        </>
    );
}

export default Home;