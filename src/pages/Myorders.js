import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderDetail from '../Component/MyOrder/order';
import styles from '../styles/myorder.module.css';

function MyOrder() {
    const myorders = useSelector((state) => state.ProductReducer.myorders);

    return (
        <>
            <div className={styles.mainContainer}>
                <h1 className={styles.orderHeading}>
                    My Orders
                </h1>

                {myorders.length === 0 ? 
                    <>  
                        <h1>You haven't placed any order yet !!</h1>
                        <Link to="/">!!! Start Shopping !!!</Link>
                    </>
                    :
                    <div className={styles.orderListContainer}>
                        {myorders.map((order, i) => <OrderDetail key={i} order={order} />)}
                    </div>
                }
            </div>
        </>
    );
}

export default MyOrder;
