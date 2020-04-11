import React, { useState } from 'react';
import AddNewProduct from './AddNewProduct';
import AddExistingProduct from './AddExistingProduct';

const AddProduct = (props) => {

    const [newProdViewVisibility, setNewProdViewVisibility] = useState(false)
    const [typeViewVisibility, setTypeViewVisibility] = useState(true);

    const typeClickHandler = (type) => {
        type == 'new' ?
            setNewProdViewVisibility(true) :
            setNewProdViewVisibility(false);
        setTypeViewVisibility(false);
    }

    const typeView = 
    <form>
        <h2>Add Product</h2>
        <div>
            <button style={{magrin:'10px'}} onClick={() => typeClickHandler('existing')}>Existing Product</button>
            <button style={{magrin:'10px'}} onClick={() => typeClickHandler('new')}>New Product</button>
        </div>
    </form>

    return (
        <>
            {typeViewVisibility ?
                typeView :
                newProdViewVisibility?
                <AddNewProduct  products={props.products} click={props.addClick}/>:
                <AddExistingProduct products={props.products} click={props.addClick}/>
            }
        </>
    );
}

export default AddProduct;