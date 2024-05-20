
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [namei,setNamei]=useState(null);
  // Retrieve authentication state from local storage on component mount
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userIndex = window.localStorage.getItem("index");
   console.log("ye",JSON.parse(userIndex).name);
     setNamei(JSON.parse(userIndex).name);
    if (token && userIndex) {
      setLoggedIn(true);
      setUserLoggedIn(JSON.parse(userIndex));
    }
  }, []);

  // Getting all users from the database on first render of the page
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "buybusy"), (snapShot) => {
      const users = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUserList(users);
    });
  }, []);

  // Creating a new user
  async function createUser(data) {
    const index = userList.findIndex((user) => user.email === data.email);
    if (index !== -1) {
      return;
    }
    const docRef = await addDoc(collection(db, "buybusy"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
      order: [],
    });
  }

  // Sign in user
  async function signin(data) {
    const index = userList.findIndex((user) => user.email === data.email);
    if (index === -1) {
      return false;
    }
    if (userList[index].password === data.password) {
      setLoggedIn(true);
      setUserLoggedIn(userList[index]);
      console.log("userlist",userList[index].name);
      window.localStorage.setItem("token", true);
      window.localStorage.setItem("index", JSON.stringify(userList[index]));
      console.log("lllllll", JSON.stringify(userList[index]).name);
      return true;
    } else {
      return false;
    }
  }

  // Sign out function
  function signout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("index");
    setLoggedIn(false);
    setUserLoggedIn(null);
  }

  return (
    <AuthContext.Provider
      value={{
        createUser,
        isLoggedIn,
        setLoggedIn,
        signin,
        userLoggedIn,
        setUserLoggedIn,
        signout,
        namei
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
