import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Home.module.css';
import Navigation from '../Navigation/Navigation';
import Spinner from '../UI/Spinner/Spinner';
import Initialize from '../Initialize/Initialize';
import Products from '../Products/Products';
import Customer from '../Customers/Customers';
import Transactions from '../Transactions/Transaction';
import SummaryReport from '../Reports/SummaryReport/SummaryReport';
import InventoryReport from '../Reports/InventoryReport/InventoryReport';

const Home = (props) => {

    let [productsList, setProductsList] = useState([]);
    let [customerList, setCustomerList] = useState([]);
    let [transactionsList, setTransactionsList] = useState([]);
    let [transactionRes, settransactionRes] = useState([]);
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
        const prod = await fetchProductData();
        const cust = await fetchCustomerData();
        await fetchTransactionData(prod, cust);
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
            setProductsList([...products]);
            return [...products]; //as state is not getting updated on first render
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
            setCustomerList([...customers]);
            return [...customers];//as state is not getting updated on first render
        } catch (error) {
            console.log(error);
        } finally {
            setCustLoading(false);
        }
    }

    const fetchTransactionData = async (prod, cust) => {
        try {
            // setCustLoading(true);
            const res = await axios.get('/transaction', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let transactions = res.data.transaction;
            settransactionRes(transactions);
            const trans = transactions.map(t => {
                const product = prod ?
                    prod.filter(p => p._id == t.product_id)[0].product_title :
                    productsList.filter(p => p._id == t.product_id)[0].product_title;
                const customer = cust ?
                    cust.filter(p => p._id == t.customer_id)[0].customer_name :
                    customerList.filter(p => p._id == t.customer_id)[0].customer_name;
                return {
                    date: t.transation_date_time_,
                    customer,
                    product,
                    qty: t.quantity,
                    type: t.transation_type
                }
            })
            setTransactionsList([...trans]);
        } catch (error) {
            console.log(error);
        } finally {
            setCustLoading(false);
        }
    }

    async function addCustomer(name) {
        try {
            await axios.post('/customer', { customer_name: name }, {
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
                await axios.post('/product', { ...data }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
            else {
                let prod = productsList.filter(p => p.product_title == data.product_title)[0];
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
            await axios.post('/transaction', { ...dataToSend }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            await addProduct('existing', {
                product_title: data.product,
                qty_total: data.type === 'In' ? Number(data.qty) : Number(data.qty) * -1,
            })
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

    const getProductsForSummary=()=>{
        return productsList.map(p=>{
            return {
            product:p.product_title,
            qty:p.qty_total
        }})
    }

    return (
        <>
            {prodLoading || custLoading ? <Spinner /> :
                <div className={style.body}>

                    <Navigation />
                    <Initialize click={addDialogHandler} addProduct={addProduct}
                        closeDialog={addDialogCloseHandler} addDialog={addDialogHandler}
                        addCustomer={addCustomer} showDialog={showAddDialog} addTransaction={addTransaction}
                        products={[...getProductsFromList()]} productDetails={[...productsList]} customers={[...getCustomersFromList()]} />
                    <Products products={productsList} loading={prodLoading} />
                    <Customer customers={customerList} loading={custLoading} />
                    <Transactions transactions={transactionsList} loading={false} />
                    <SummaryReport productsList={getProductsForSummary()}/>
                    <InventoryReport products={productsList} transactions={transactionRes}/>
                </div>
            }
        </>
    );
}

export default Home;