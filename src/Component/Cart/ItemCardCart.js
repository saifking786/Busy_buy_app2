import React from 'react';
import { useProduct } from '../../ProductContext';
import styles from './itemCardCart.module.css';

function ItemCardCart({ id, name, image, price, category, quantity }) {
    // Accessing functions from ProductContext
    const { removeCart, incToCartQuant, removeToCartQuant } = useProduct();

    // Function to remove item from cart
    const removeAddToCart = () => {
        removeCart(id); 
    };

    // Function to increase quantity of item in cart
    const inc = () => {
        incToCartQuant(id);
    };

    // Function to decrease quantity of item in cart
    const dec = () => {
        removeToCartQuant(id);
    };

    return (
        <>
            {/* Item Card Container */}
            <div className={styles.itemCardContainer}>
                {/* Item Image */}
                <img src={image} alt={name} className={styles.image} />
                {/* Item Name */}
                <div className={styles.name}>{name}</div>
                {/* Item Price */}
                <div className={styles.price}> ₹ {price}</div>
                {/* Quantity Controls */}
                <div className={styles.king}>
                    {/* Increase Quantity */}
                    <p className={styles.change} onClick={inc}>+</p>
                    {/* Display Quantity */}
                    <p className={styles.quantity}>{quantity}</p>
                    {/* Decrease Quantity */}
                    <p className={styles.change} onClick={dec}>-</p>
                </div>
                {/* Remove From Cart Button */}
                <button className={styles.button} onClick={removeAddToCart}>Remove From Cart</button>
            </div>
        </>
    );
}

export default ItemCardCart;
