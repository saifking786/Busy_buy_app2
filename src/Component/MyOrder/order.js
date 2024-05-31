
// importing styles
import styles from "./order.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
// render each order detail
export default function OrderDetail(props){

    // order details from props
    const {date,list,total}=props.order;
    const navigate=useNavigate()
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    if (!isLoggedIn) {
        navigate("/");
        return null; // or you can render a loading spinner or any other component
    }
    return(
        // single order container
        <>
      {isLoggedIn && (
        <div>
            {/* date of the order */}
            <h1 className={styles.orderHeading}>
                Ordered On: {date}
            </h1>

            {/* table containing order details */}
            <table>

                {/* first row of the table */}
                <tr>
                    <th>S.no</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>

                {/* rendering all the product's within order  */}
                {list.map((product,i) => <tr>
                                            <td>{i + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>x{product.quantity}</td>
                                            <td>₹{product.quantity * product.price}</td>
                                        </tr>)}
                
                {/* last row to show total amount of the order */}
                <tr>
                    <td colSpan={4}>Grand Total</td>
                    <td>₹{total}</td>
                </tr>

            </table>
        </div>
         )}
        </>
    )
}