import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from './itemCard.module.css'; // Import CSS module
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { addToCart ,ProductReducer} from '../../ProductReducer';

function ItemCard({ id, name, image, price, category }) {
    // const { addToCart } = useProduct();
    const dispatch=useDispatch()
    const  isLoggedIn  = useSelector((state)=>state.authReducer.isLoggedIn);// Destructure addToCart function from useProduct
    const navigate = useNavigate(); // Get navigate function from react-router-dom
    // Function to handle adding item to cart
    //  dispatch(ProductReducer())
    const handleAddToCart = () => {

        console.log("kya koi hai",isLoggedIn);
        if (isLoggedIn) {
            // If user is logged in, add item to cart
           
            dispatch(addToCart({id, name, image, price, category}));
             // Call addToCart function from useProduct
             console.log("mera cart");
            toast.success(`${name} added to cart!`);
        } else {
          
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
