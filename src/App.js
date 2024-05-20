import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import {AuthProvider} from "./authContext"
import Navbar from "./Component/Navbar/Navbar";
import Home from "./pages/Home";
import MyOrder from "./pages/Myorders";
import Cart from "./pages/Cart";
import { ProductProvider } from "./ProductContext";
function App() {
  const router= createBrowserRouter([
    {
      path:"/",
      element:<Navbar />,
      children:[
        { index:true, element: <Home />},
        {path:'/myorder',element:<MyOrder />},
        {path:'/cart',element:< Cart /> },
        {path:'/signup', element:<SignUp />},
        {path:'/signin', element:<SignIn />}
      ]
    }
  ])
  return (
    <>
         <AuthProvider>
          <ProductProvider>

        <RouterProvider router={router} /> 

        </ProductProvider> 
       </AuthProvider>  
    </>
  );
}

export default App;
