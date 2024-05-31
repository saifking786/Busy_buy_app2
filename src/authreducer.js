import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from './firebaseInit';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { toast } from "react-toastify";

// Async thunks for creating a user and signing in
const initialState={ userList: [], isLoggedIn: false, userLoggedIn: [],check:true };


// Async thunk for getting list of all the users within the firebase database
export const getInitialUserList = createAsyncThunk(
    "auth/userList",
    async (args,thunkAPI) => {
        let token = window.localStorage.getItem("token");
        let user = window.localStorage.getItem("index");
        // console.log("user",JSON.parse(user));
        let manlist=  JSON.parse(user);
        // console.log("user",manlist.id);
        if (token && user) {
            thunkAPI.dispatch(setLoggedIn(true));
            thunkAPI.dispatch(setUserLoggedIn(manlist));
        }
        const unsub = onSnapshot(collection(db, "buybusy-redux"),(snapShot) => {
            const users = snapShot.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            });
            // storing the userlist inside initialState variable
            console.log("ye hai users",users);
            thunkAPI.dispatch(setUserList(users));
        });
        const snapshot = await collection(db, "buybusy-redux").get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return users;
    }
);



// AsyncThunk for creating new user in database
export const createUserThunk = createAsyncThunk(
    "auth/createUser",
    async (data,thunkAPI) => {
       
        // getting userList from initialState
        const {authReducer} = thunkAPI.getState();
        const {userList} = authReducer;
         
        // checking whether user's email already exist or not
        const index =userList.findIndex((user) => user.email === data.email);
        
        // if email address already exits inside database
        if(index !== -1){
            return;
        }

        // if email not found create new user 
        const docRef =await addDoc(collection(db, "buybusy-redux"), {
            name:data.name,
            email:data.email,
            password:data.password,
            cart:[],
            orders:[]
        });
        // notification 
       
    }
)


// AsyncThunk for signIn user
export const createSessionThunk = createAsyncThunk(
    "auth/createSession",
    async (data,thunkAPI) => {
       
        // getting userList from initialState
        const {authReducer} = thunkAPI.getState();
        const {userList} = authReducer;
        console.log("ye hai uselist",userList);
        // finding user inside the userList
        const index = userList.findIndex((user) => user.email === data.email);
       
        // if user not found show notification
        if(index === -1){
            toast.error('Email either in correct or not in use !!');;
            return ;
        }
        // console.log("kya re");
        // if email found in database then match password
        if(userList[index].password === data.password){

            console.log("kya re kkkk",index);
            
            // logging in user and storing its data in local variable
            thunkAPI.dispatch(setLoggedIn(true));
            console.log("userlist[index]",userList[index])
            thunkAPI.dispatch(setUserLoggedIn(userList[index]));
            
            // generating user's login token and store user's data 
            window.localStorage.setItem("token",true);
            window.localStorage.setItem("index",JSON.stringify(userList[index]));
            thunkAPI.dispatch(signinornot(true));
        }
        else{
            // if password doesn't match in database
            thunkAPI.dispatch(signinornot(false));
            return;
        }
    }
);


// AsyncThunk for SignOut
export const removeSessionThunk = createAsyncThunk(
    "auth/removeSession",
    () => {

        // removing user' data and token from local storage
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
    }
)



const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers:{
        // to set userList 
        setUserList: (state,action) => {
            state.userList=action.payload;
        },
        // whether user isLoggedIn or not
        setLoggedIn: (state,action) => {
            state.isLoggedIn = action.payload;
            console.log("mai logedin");
        },
        // data of loggedIn user
        setUserLoggedIn: (state,action) => {
            state.userLoggedIn = action.payload;
        },
        signinornot:(state,action) => {
            state.check=action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeSessionThunk.fulfilled, (state,action) => {
            // removing user's token and data from initialState
            state.isLoggedIn=false;
            state.userLoggedIn=null;
        })
    }
});


export const { setUserList, setLoggedIn, setUserLoggedIn, signinornot } = authSlice.actions;
export const authReducer = authSlice.reducer;
// export const authSelector = (state) => state.authReducer;

