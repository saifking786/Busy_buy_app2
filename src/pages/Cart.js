import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/cart.module.css'; // Import CSS module
import ItemCardCart from '../Component/Cart/ItemCardCart'; // Import ItemCardCart component
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
// import { clearCart, purchaseAll, productUser } from '../ProductReducer'; // Ensure correct import paths
import { clearCart,purchaseAll } from '../ProductReducer';
import { ProductUser } from '../ProductReducer';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.ProductReducer.cart); // Corrected state slice name
    const total = useSelector((state) => state.ProductReducer.total); // Corrected state slice name
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
     const navigate=useNavigate()
     console.log("cart",cart);
    useEffect(() => {
        dispatch(ProductUser()); // Corrected function name
    }, [dispatch]);

    // Function to handle purchase action
    const handlePurchase = () => {
        dispatch(purchaseAll());
        dispatch(clearCart());
    };
    if (!isLoggedIn) {
        navigate("/");
        return null; // or you can render a loading spinner or any other component
    }
    return (
        <>
            {isLoggedIn && (
                <div className={styles.homeContainer}>
                    {/* Purchase section */}
                    <div className={styles.purchaseContainer}>
                        {/* Display total value */}
                        <p>₹ {total}</p>
                        {/* Link to myorder page with a Purchase button */}
                        <Link to='/myorder'>
                            <button onClick={handlePurchase}>Purchase</button>
                        </Link>
                    </div>
                    {/* Cart items */}
                    <div className={styles.homeContainer2}>
                        {cart.map((item) => (
                            <ItemCardCart
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                category={item.category}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;
