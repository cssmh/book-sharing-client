import { createContext, useEffect, useState } from "react";
import {  GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);
const AuthProviders = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] =useState(true);


    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email,password) =>{
        setLoading(true);
         return signInWithEmailAndPassword(auth,email,password)
    }

    const handleUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
   

    useEffect(()=>{
      const unSubscribe =  onAuthStateChanged(auth,currentUser =>{
          console.log('user in ',currentUser);

          const userEmail = currentUser?.email || user?.email
          const loggedUser = {email:userEmail}
          setUser(currentUser);
          setLoading(false);
          if(currentUser){
            // const loggedUser = {email : currentUser.email}
            // console.log(loggedUser);
            axios.post('https://book-sharing-server.vercel.app/jwt', loggedUser,{withCredentials: true})
            .then(res=>{
                console.log('token',res.data)
            })

          }
          else{
            axios.post('https://book-sharing-server.vercel.app/logout',loggedUser,{withCredentials: true})
            .then(res=>{
                console.log('token response',res.data);
              })
        }
        });
        return () =>{
            unSubscribe();
        }
    },[user?.email])

    const logOut =()=>{
        setLoading(true)
        return signOut(auth);
    }
   
    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        loading,
        handleUpdateProfile,
        googleLogin 
  

       
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;