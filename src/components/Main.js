import React, { useState, useEffect } from 'react';
import db from "../config/firebase"
import firebase from "firebase"
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import AcccessibleTable from '../components/MaterialCheck';



const Main = () => {
    const data = [{  
        name: 'Ayaan',  
        age: 26  
        },{  
        name: 'Ahana',  
        age: 22  
        },{  
        name: 'Peter',  
        age: 40   
        },{  
        name: 'Virat',  
        age: 30  
        },{  
        name: 'Rohit',  
        age: 32  
        },{  
        name: 'Dhoni',  
        age: 37  
        }]  
    
         const columns = [{  
            Header: 'Name',  
            accessor: 'name'  
           },{  
           Header: 'Age',  
           accessor: 'age'  
           }]  
           
    
    return ( 
        <div style={{margin:"300px"}}>
        <AcccessibleTable/>
        {/*<ReactTable  
            data={data}  
            columns={columns}  
            // defaultPageSize = {6}  
            // pageSizeOptions = {[2,4, 6]}  
        />  */}
         </div>
     );
}
 
export default Main;