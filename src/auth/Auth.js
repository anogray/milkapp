import db from "../config/firebase"
import React, { Component, useEffect, useState  } from 'react';
// var bcrypt = require('bcryptjs');
// import bcrypt from "bcryptjs"
import { useHistory, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Example = () => (
    <ReactLoading type={"spin"} color={"rgb(38 108 223)"} />
  );



 const Auth = ()=>{
   // console.log("locations",logins)
   let locations = useLocation();
   let history = useHistory();


   const [location, setlocation] = useState(locations)

   const DbAuthCall = async(detailsauth)=>{

    try{
        let res = await db.collection("authUsers").doc(detailsauth.name).get(detailsauth.name)
        let firebaseDetails = res.data();
    
        if(firebaseDetails.name==detailsauth.name && firebaseDetails.password==detailsauth.password )
        {
            let auth = true;
        //history.push("./items")
        //localStorage.setItem("isStored","true");
        history.push({pathname:"./items",auth:true})
        }
        else{
            history.push("/")
        }
    }
    catch(err){
        console.log("errrr",err)
        history.push("/")
    }

}

   useEffect(() => {
      
    console.log("locationss",location)
   let {obj} = location
   if(obj==undefined){
       history.push("/")
   }
   else{
    let detailsauth = location.obj.logins
    //console.log("detailsauth received",detailsauth)
   
    DbAuthCall(detailsauth);
   }
   }, [])

   



 return (
        <>
        </>
 )


// if(name=="hola")
// {}






}

export default Auth;

