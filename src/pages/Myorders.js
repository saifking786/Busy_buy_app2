import React from 'react';
import { useProduct } from '../ProductContext';
import OrderDetail from '../Component/MyOrder/order';
import { Link } from 'react-router-dom';
import styles from '../styles/myorder.module.css';

function MyOrder() {
 
  const {myOrders}=useProduct();
  

  
  return(

      // conditions to show/hide spinner
      <>
          <div className={styles.mainContainer}>

              {/* page heading */}
              <h1 className={styles.orderHeading}>
                  My Orders
              </h1>

              {/* to show message if no order in list */}
              {myOrders.length === 0?
                  <>  
                      {/* message of no order */}
                      <h1>You haven't placed any order yet !!</h1>
                      {/* link to redirect to home page */}
                      <Link to="/">!!! Start Shopping !!!</Link>
                  </>
                  :
                  // if contains order than render them one by one
                  // order list container
                  <div className={styles.orderListContainer}>
                      {myOrders.map((order,i) => <OrderDetail key={i} order={order} />)}
                  </div>
              }
          </div>
      </>
  );
}

export default MyOrder;
