import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebaseInit";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

export const ProductUser = createAsyncThunk('users/product',
    async (_, thunkAPI) => {
        const { authReducer } = thunkAPI.getState();
        const { isLoggedIn, userLoggedIn } = authReducer;
        if (!isLoggedIn) return;
        const unsub = onSnapshot(doc(db, "buybusy-redux", userLoggedIn.id), (doc) => {
            if (doc.exists()) {
                const docData = doc.data();
                const cartData = docData.cart;
                const orderData = docData.orders;
                thunkAPI.dispatch(setCart(cartData));
                thunkAPI.dispatch(setMyOrders(orderData));
                let sum = 0;
                cartData.forEach((u) => {
                    sum += u.price * u.quantity;
                });
                thunkAPI.dispatch(setTotal(sum));
            }
        });
    }
)

export const addToCart = createAsyncThunk('users/addtocart',
    async ({ id, name, image, price, category }, thunkAPI) => {
        const { ProductReducer, authReducer } = thunkAPI.getState();
        const { cart } = ProductReducer;
        const { userLoggedIn } = authReducer;
        const itemExists = cart.some(item => item.id === id);
        let updatedCart;
        if (!itemExists) {
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
            updatedCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        }
        const docRef = doc(db, "buybusy-redux", userLoggedIn.id);
        const result = await updateDoc(docRef, { cart: updatedCart });
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        thunkAPI.dispatch(setTotal(sum));
        thunkAPI.dispatch(setCart(updatedCart));
        toast.success("Item added to cart!");
    }
);

export const removeToCartQuant = createAsyncThunk('users/removetocartquant',
    async ({ id }, thunkAPI) => {
        const { ProductReducer, authReducer } = thunkAPI.getState();
        const { cart } = ProductReducer;
        const { userLoggedIn } = authReducer;
        const updatedCart = cart
            .map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter((u) => u.quantity !== 0);
        thunkAPI.dispatch(setCart(updatedCart));
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        thunkAPI.dispatch(setTotal(sum));
        const docRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(docRef, { cart: updatedCart });
        toast.success("Item quantity decreased!");
    }
);

export const incToCartQuant = createAsyncThunk('users/inctocartquant',
    async ({ id }, thunkAPI) => {
        const { ProductReducer, authReducer } = thunkAPI.getState();
        const { cart } = ProductReducer;
        const { userLoggedIn } = authReducer;
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        thunkAPI.dispatch(setCart(updatedCart));
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        thunkAPI.dispatch(setTotal(sum));
        const docRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(docRef, { cart: updatedCart });
        toast.success("Item quantity increased!");
    }
);

export const removeCart = createAsyncThunk('users/removecart',
    async ({ id }, thunkAPI) => {
        console.log("yahan hai id", id);
        const { ProductReducer, authReducer } = thunkAPI.getState();
        const { cart } = ProductReducer;
        const { userLoggedIn } = authReducer;
        const updatedCart = cart.filter((item) => item.id !== id);

        thunkAPI.dispatch(setCart(updatedCart));
        let sum = 0;
        updatedCart.forEach((u) => {
            sum += u.price * u.quantity;
        });
        thunkAPI.dispatch(setTotal(sum));
        const docRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(docRef, { cart: updatedCart });
        toast.success("Item removed from cart!");
    }
);

export const purchaseAll = createAsyncThunk('users/purchaseall',
    async (_, thunkAPI) => {
        const purchaseD = getDate();
        const { ProductReducer, authReducer } = thunkAPI.getState();
        const { cart, total, myorders } = ProductReducer;
        const { userLoggedIn } = authReducer;
        const newOrder = { date: purchaseD, list: cart, total: total };
        const orderData = [newOrder, ...myorders];
        thunkAPI.dispatch(setMyOrders(orderData));
        const docRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(docRef, { orders: orderData });
        thunkAPI.dispatch(setCart([]));
        await updateDoc(docRef, { cart: [] });
        toast.success("Purchase successful!");
    }
);

export const clearCart = createAsyncThunk('users/clearcart',
    async (_, thunkAPI) => {
        const { ProductReducer, authReducer } = thunkAPI.getState();
        const { cart, total } = ProductReducer;
        const { userLoggedIn } = authReducer;
        if (cart.length === 0) {
            console.error("Nothing to remove in Cart!!");
            return;
        }
        const userRef = doc(db, 'buybusy', userLoggedIn.id);
        await updateDoc(userRef, { cart: [] });
        thunkAPI.dispatch(setCart([]));
        thunkAPI.dispatch(setTotal(0));
        console.log("Cart cleared!!");
        toast.success("Cart cleared!");
    }
);


   const productSlice = createSlice({
    name: 'product',
    initialState: {
        cart: [],
        itemInCart: 0,
        myorders: [],
        total: 0,
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setMyOrders: (state, action) => {
            state.myorders = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        }
    }
});

export const { setCart, setMyOrders, setTotal } = productSlice.actions;
export const ProductReducer = productSlice.reducer;