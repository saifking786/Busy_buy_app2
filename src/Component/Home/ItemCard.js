import React from 'react';
import { useProduct } from '../../ProductContext'; // Import useProduct from ProductContext
import styles from './itemCard.module.css'; // Import CSS module
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../../authContext';

function ItemCard({ id, name, image, price, category }) {
    const { addToCart } = useProduct();
    const {isLoggedIn} =useAuth()// Destructure addToCart function from useProduct
    const navigate = useNavigate(); // Get navigate function from react-router-dom

    // Function to handle adding item to cart
    const handleAddToCart = () => {

        console.log("kya",isLoggedIn);
        if (isLoggedIn) {
            // If user is logged in, add item to cart
            addToCart(id, name, image, price, category); // Call addToCart function from useProduct
            toast.success(`${name} added to cart!`); // Display success message using toast
        } else {
            // If user is not logged in, redirect to home page
            navigate('/');
        }
    };

    return (
        <div className={styles.itemCardContainer}>
            {/* Display item image */}
            <img src={image} alt={name} className={styles.image} />
            {/* Display item name */}
            <div className={styles.name}>{name}</div>
            {/* Display item price */}
            <div className={styles.price}>₹  {price}</div>
            {/* Button to add item to cart */}
            <button className={styles.button} onClick={handleAddToCart}>Add to cart</button>
        </div>
    );
}

export default ItemCard;
