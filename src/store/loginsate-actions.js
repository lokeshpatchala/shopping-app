import {authenticationActions} from './loginstate-slice';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { Dispatch } from 'react';
const app = initializeApp({ apiKey: "AIzaSyChYGzV3wLZu4p-nIx2pcxnsziTSfzZ8Tg",
authDomain: "shopping-14bdd.firebaseapp.com",
databaseURL: "https://shopping-14bdd-default-rtdb.firebaseio.com",
projectId: "shopping-14bdd",
storageBucket: "shopping-14bdd.appspot.com",
messagingSenderId: "1083543439808",
appId: "1:1083543439808:web:2db95203b8d9210a3ce025"});
const auth = getAuth(app);
const db = getFirestore(app);

export const loginCall=(email, password)=>{
    return  (dispatch)=>{
        const loginUser=async ()=>{
            try {
                console.log(email,password);
               let userInfo= await signInWithEmailAndPassword(auth, email, password);
               dispatch(authenticationActions.setLoginInfo({accessToken:userInfo.user.accessToken, username:userInfo.user.email}));
              } catch (err) {
                console.error(err);
                alert(err.message);
              }
        }
    
        loginUser();
    }
  
}

export const signUpWithUsernameAndPassword=(email,password)=>{
         return (dispatch)=>{
            let createUser=async()=>{
                try
                {
                    const userInfo = await createUserWithEmailAndPassword(auth, email, password);
                   dispatch(authenticationActions.setLoginInfo({accessToken:userInfo.accessToken, username:userInfo.email}))
    
                }
                catch(err)
                {
                  
                    console.error(err);
                    alert(err.message);
                     
                }
               
            }
          createUser();
         } 
}

export const initialAuthInitalization=()=>{
    return (dispatch)=>{
    let userInfo=localStorage.getItem('userInfo');
    userInfo= JSON.parse(userInfo);
    console.log(userInfo);
    dispatch(authenticationActions.setLoginInfo({accessToken:userInfo?.accessToken||'', username:userInfo?.username||''}));
    }
  
}

export const logOut=()=>{
    return (dispatch)=>{
        const logoutUser= async()=>{
            try
            {
               await signOut(auth);
               dispatch(authenticationActions.setLoginInfo({accessToken:'', username:''}));
            }
            catch(err){
               alert(err.message);
            }
        }
        logoutUser();
    }
   
}


