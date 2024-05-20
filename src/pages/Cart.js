import React from 'react';
import { useProduct } from '../ProductContext'; // Import useProduct from ProductContext
import styles from '../styles/cart.module.css'; // Import CSS module
import ItemCardCart from '../Component/Cart/ItemCardCart'; // Import ItemCardCart component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Cart() {
    const { cart, total, purchaseAll, clearCart } = useProduct(); // Destructure values from useProduct

    // Function to handle purchase action
    const totalValue = () => {
        purchaseAll(); // Call purchaseAll function from useProduct
        console.log("chalo yhi hi shi");
        clearCart(); // Call clearCart function from useProduct
    };

    return (
        <div className={styles.homeContainer}>
            {/* Purchase section */}
            <div className={styles.purchaseContainer}>
                {/* Display total value */}
                <p>₹ {total}</p>
                {/* Link to myorder page with a Purchase button */}
                <Link to='/myorder'>
                    <button onClick={totalValue}>Purchase</button>
                </Link>
            </div>
            {/* Cart items */}
            <div className={styles.homeContainer2}>
                {cart.map((u) => (
                    <ItemCardCart
                        key={u.id}
                        id={u.id}
                        name={u.name}
                        image={u.image}
                        price={u.price}
                        category={u.category}
                        quantity={u.quantity}
                    />
                ))}
            </div>
        </div>
    );
}

export default Cart;
