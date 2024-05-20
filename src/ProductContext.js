import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAuth } from './authContext';
import { db } from './firebaseInit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context for product-related data and functions
const ProductContext = createContext();

// Custom hook to access product context
export function useProduct() {
    return useContext(ProductContext);
}

// Product provider component to manage product-related state and functions
export function ProductProvider({ children }) {
    const { isLoggedIn, userLoggedIn } = useAuth();
    const [cart, setCart] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [total, setTotal] = useState(0);

    // Function to get the current date in the required format
    function getDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    useEffect(() => {
        if (!isLoggedIn) return;
        // Subscribe to changes in the user's document in Firestore
        const unsub = onSnapshot(doc(db, 'buybusy', userLoggedIn.id), (doc) => {
            if (doc.exists()) {
                const docData = doc.data();
                const cartData = docData.cart;
                const orderData = docData.order;
                setCart(cartData);
                setMyOrders(orderData);
                // Calculate total price of items in cart
                let sum = 0;
                cartData.forEach((u) => {
                    sum += u.price * u.quantity;
                });
                setTotal(sum);
            }
        });

        return () => unsub();
    }, [userLoggedIn]);

    // Function to add an item to the cart
    async function addToCart(id, name, image, price, category) {
        const itemo = cart.includes(id);
        let updatedCart;
        if (!itemo) {
            // If item not in cart, add it
            const data = {
                id,
                name,
                image,
                price,
                category,
                quantity: 1,
            };
            updatedCart = [data, ...cart];
        } else {
            // If item already in cart, increase its quantity
            updatedCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        }
        // Update cart in Firestore
        const docRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(docRef, { cart: updatedCart });

        // Calculate total price of items in updated cart
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        setTotal(sum);
        setCart(updatedCart);
    }

    // Function to decrease quantity of an item in cart
    async function removeToCartQuant(id) {
        const updatedCart = cart
            .map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter((u) => u.quantity !== 0);

        // Update cart in state and Firestore
        setCart(updatedCart);
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        setTotal(sum);
        const docRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(docRef, { cart: updatedCart });
    }

    // Function to increase quantity of an item in cart
    async function incToCartQuant(id) {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        // Update cart in state and Firestore
        setCart(updatedCart);
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        setTotal(sum);
        const docRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(docRef, { cart: updatedCart });
    }

    // Function to remove an item from cart
    async function removeCart(id) {
        const updatedCart = cart.filter((item) => item.id !== id);

        // Update cart in state and Firestore
        setCart(updatedCart);
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        setTotal(sum);
        const docRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(docRef, { cart: updatedCart });
    }

    // Function to purchase all items in cart
    async function purchaseAll() {
        const purchaseD = getDate();
        const newOrder = { date: purchaseD, list: cart, total: total };
        const updatedOrders = [newOrder, ...myOrders];
        setMyOrders(updatedOrders);
        // Update orders and clear cart in Firestore
        const docRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(docRef, { order: updatedOrders });
        setCart([]);
        await updateDoc(docRef, { cart: [] });
    }

    // Function to clear cart
    async function clearCart() {
        if (cart.length === 0) {
            console.error("Nothing to remove in Cart!!");
            return;
        }

        // Clear cart in state and Firestore
        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, { cart: [] });
        setCart([]);
        setTotal(0);
        console.log("Cart cleared!!");
    }

    // Provide product context to children components
    return (
        <ProductContext.Provider value={{
            clearCart,
            purchaseAll,
            removeCart,
            incToCartQuant,
            removeToCartQuant,
            addToCart,
            myOrders,
            cart,
            total,
            getDate
        }}>
            {/* Render children components */}
            <ToastContainer />
            {children}
        </ProductContext.Provider>
    );
}
