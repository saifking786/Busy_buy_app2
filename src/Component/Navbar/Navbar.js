import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../authContext';
import styles from '../../styles/navbar.module.css'; // Import CSS module
// Make sure the path is correct according to your project structure
import { Outlet } from 'react-router-dom';

function Navbar() {
  // Accessing authentication state and functions
  const { isLoggedIn, signout } = useAuth();
  console.log("mera",isLoggedIn);
  return (
    <>
      {/* Navigation bar */}
      <nav className={styles.nav}> {/* Use the CSS module */}
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">Busy Buy</Link>
        </div>
        {/* Navigation links */}
        <ul className={styles.navLinks}> {/* Use the CSS module */}
          <li><Link to="/">Home</Link></li>
          {/* Conditional rendering based on authentication status */}
          
          {isLoggedIn ? (
            <>
              <li><Link to="/myorder">My Orders</Link></li> 
              {/* Updated link text */}
              <li><Link to="/cart">Cart</Link></li>
              {/* Welcome message with username */}
              <li className={styles.welcome}>Welcome</li>
              {/* Log out button */}
              <li onClick={signout}>Log Out</li>
            </>
          ) : (
            <li><Link to='/signin'>Sign In</Link></li>
          )}
        </ul>
      </nav>
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </>
  );
}

export default Navbar;
