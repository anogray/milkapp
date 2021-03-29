import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import React, { Component, useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import MaterialUIPickers from "./Calendar"
import moment from "moment";
import { Button, TextField } from "@material-ui/core";

import db from "../config/firebase"
import "../styles.css"

import ReactLoading from 'react-loading';
import auth from "../auth/Auth"
import { useHistory, useLocation } from "react-router";
import AddModal from "./AddModal";


const useStyles = makeStyles({
  table: {
    minWidth: 100,
    maxWidth: 350,
    margin: "10px",
    padding: "10%",
  },
  roottabsize: {
    width: "64%",
  },
  input:{
    width:"4ch",
    margin: "auto"
  }
});

// function createData(Serie, NInicial, NFinal, NSelos) {
//   return { Serie, NInicial, NFinal, NSelos };
// }

// const rows = [
//   createData("ab", "XXXXX", "XXXXX", "XXXXX"),
//   createData("cd", "XXXXX", "XXXXX", "XXXXX"),
//   createData("ef", "XXXXX", "XXXXX", "XXXXX"),
//   createData("gh", "XXXXX", "XXXXX", "XXXXX"),
// ];
let rows = [];
console.log("rowlength",rows.length)


export default function AcccessibleTable(props) {

//auth("hola","")
let location = useLocation();
let history = useHistory();


  const classes = useStyles();
  const [locations, setlocations] = useState(location)
  const [data, setData] = useState({});
  const [currAmt, setcurrAmt] = useState(0);
  const [clear, setclear] = useState({})
  const [allData, setallData] = useState({"full-cream":"","toned":""});
  const [isvalid, setisvalid] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fromModalDate, setfromModalDate] = React.useState(new Date(moment(moment().format("DD-MM-yyyy"),"DD-MM-yyyy").valueOf()));
  const [epochFromtime, setepochFromtime] = useState(moment(fromModalDate,"DD-MM-yyyy").valueOf());

  const handlefromModalDate = (date) => {
    let newTo = date
    setfromModalDate(newTo);
    let newEpoch = moment(newTo,"DD-MM-yyyy").valueOf()
    setepochFromtime(newEpoch)
    //console.log("ModalDate",newTo,"modalEpoch",newEpoch)
    //console.log("from",epochFromtime)
};

  console.log("DateModal",fromModalDate,"epoch",epochFromtime)
  
  const formulaFull = {half:28,full:55}
  const formulaToned = {half:23,full:45}
  const formulaBread = {atta:35, brown:40}

  
const ValidAuth = (locations,isStored)=>{

    if(isStored==="true")
    {
      setisvalid(true);
      return
    }

  else if(locations.auth==undefined)
  {
     //console.log("false locations",locations)
  alert("Please Log in First ")
  history.push("/");
  }

else{
  alert("Logged In")
  setisvalid(true);
  
  localStorage.setItem("isStored","true");
  console.log("true locations",locations)
  return
}
}


  //get the 3 letters of current day
  const Example = ({ type, color }) => (
    <ReactLoading type={"spin"} color={"rgb(38 108 223)"} />
  );
  

  let dayName = String(moment()._d)
  dayName = dayName.substring(0,3);

  console.log("totalCurrDate",dayName)
  let currDate = moment().format("DD-MM-yyyy");
  console.log("fullcurrDate",currDate)
  let epochtime = moment(currDate,"DD-MM-yyyy").valueOf()
  console.log("epoch time",epochtime)
  // let nextp = "15-08-2015"
  // epochtime = moment(nextp,"DD-MM-yyyy").valueOf()
  // console.log("epoch time",epochtime)
let ab = 2;


  useEffect(() => {
    const isStored = localStorage.getItem("isStored");
    console.log("getitem",isStored)
    ValidAuth(locations,isStored);

    // if(!isStored){
    //   history.push("/");
    // }
    // else{
    //     setisStore(true);
    }, [])
  
  useEffect(() => {
        const dataCall = async() => {
          let idx=0;
          await db.collection("milkdata").onSnapshot((snapshot) => {
            console.log("snapshot",snapshot,idx)
           //setallData(snapshot.docs.map(doc=>({date:doc.id, dataBody:doc.data()})))
           {setallData(snapshot.docs.map((doc)=>{
             console.log("doc",doc);
            return ({dataBody:doc.data()})}))}
        })

      }
      dataCall();
    },[])

    // useEffect(() => {
    //   console.log("modal UseEffect",modalIsOpen)
    // }, [modalIsOpen]);
    
    const compareDescDay = (allData)=>{
      //console.log(" sort order",allData,allData[0])
      let sortedArr = allData.sort(
        (a,b) => {
          return b.dataBody.epoch - a.dataBody.epoch
        }
      )
      return sortedArr;

    }

    if(allData.length){
      //console.log("compareto",allData)
    rows = compareDescDay(allData)
    }


    function openModal() {
      setIsOpen(true);
    }
     
      function closeModal(){
        setIsOpen(false);
      }



  const handleRow = async(e)=>{
    e.preventDefault();

    let checkAll = {}
    if(currAmt!=0)
    {
      if(!data["full-cream"])
    { checkAll["full-cream"] = 0;
    }
    else{
      checkAll["full-cream"] = data["full-cream"];
    }
    if(!data["toned"])
    { checkAll["toned"] = 0;
    }
    else{
      checkAll["toned"] = data["toned"];
    }

    // if(data["full-cream"]=="")
    // {
    //   data["full-cream"]=0
    // }
    // if(data["toned"]=="" )
    // {
    //   data["toned"]=0
    // }
    // if(!data["toned"]){
    //   data["toned"]=0
    // }
    if(!data["attabread"])
    { checkAll["attabread"] = 0;
    }
    else{
      checkAll["attabread"] = data["attabread"];
    }
    if(!data["brownbread"])
    { checkAll["brownbread"] = 0;
    }
    else{
      checkAll["brownbread"] = data["brownbread"];
    }
    
    let saveData=''
    console.log("midalOff",modalIsOpen)
    if(!modalIsOpen){
     
       saveData = {...checkAll,currDate:currDate,dayName,currAmt:currAmt,epoch:epochtime}

    }
    else if(modalIsOpen==true){

    currDate = moment(epochFromtime).format("DD-MM-yyyy")
    let dayName = String(fromModalDate)
    dayName = dayName.substring(0,3)
    // console.log("ModalDate",fromModalDate,"modalEpoch",epochFromtime,"currDate",currDate,"day",dayName)

      saveData = {...checkAll,currDate:currDate,dayName,currAmt:currAmt,epoch:epochFromtime}
      // console.log("SendindModalData",saveData)
    
      closeModal()
      setfromModalDate(new Date(moment(moment().format("DD-MM-yyyy"),"DD-MM-yyyy").valueOf()));
      setepochFromtime(moment(fromModalDate,"DD-MM-yyyy").valueOf());
    }


    try{
      let res = await db.collection("milkdata").doc(currDate).set(saveData)
      console.log("res",res)
      //console.log("db response",db)
    }
    catch(err){
      console.log("errres",err)
    }
    // let obj={}
    setData({...data , "full-cream":"", "toned":"", "brownbread":"","attabread":""})

     setcurrAmt(0)
    }
  }

  const handleChange = (e)=>{

    let chdata = {...data,[e.target.name]:e.target.value}
      
      setData(chdata)

    currAmount(chdata)
  }

  const currAmount = (chdata)=>{

    // console.log("setted data",chdata)

    let full = chdata["full-cream"];
    let toned = chdata["toned"];
    let attaBread = chdata["attabread"];
    let brownBread = chdata["brownbread"];

    let currAmt = 0;

    if(full)
    {
      if(full.length)
      {
        let fullarr = full.split(".")
        //console.log("array full",fullarr)
        currAmt = fullarr.length>1? (formulaFull.full*fullarr[0]+formulaFull.half):(formulaFull.full*fullarr[0])
      }
      
    }
    if(toned)
    {
      if(toned.length)
      {
        let tonedarr = toned.split(".")
        currAmt += tonedarr.length>1? (formulaToned.full*tonedarr[0]+formulaToned.half):(formulaToned.full*tonedarr[0])       
      }
    }

    if(attaBread){
      currAmt+= +(attaBread*formulaBread["atta"])
    }

    if(brownBread){
      currAmt+= +(brownBread*formulaBread["brown"])
    }
    console.log("currAmt",currAmt,typeof(currAmt))
    currAmt = +currAmt;
    console.log("After currAmt",currAmt,typeof(currAmt))

    // console.log("Amt current",currAmt);
    setcurrAmt(currAmt)
  }

  const headingTable = (
      <>
                {!modalIsOpen && <TableCell align="center">DATE</TableCell>}
                <TableCell align="center">FULL CREAM</TableCell>
                <TableCell align="center">TONED</TableCell>
                <TableCell align="center">ATTA BREAD</TableCell>
                <TableCell align="center">BROWN ATTA BREAD</TableCell>
                <TableCell align="center">AMOUNT (₹)</TableCell>
      </>
  )

  const selectedRow = (
            <>
              <TableRow>
                {!modalIsOpen && <TableCell align="center">{currDate} ({dayName})</TableCell>}
                  <TableCell align="center">
                    <form className={classes.input} noValidate autoComplete="off">
                      <TextField id="standard-basic" value={data["full-cream"]} name="full-cream" label="Enter" onChange={handleChange}/>
                    </form>
                  </TableCell>
    
                  <TableCell align="center">
                    <form className={classes.input} noValidate autoComplete="off">
                      <TextField id="standard-basic" value={data["toned"]} name="toned" label="Enter" onChange={handleChange} />
                    </form>
                    </TableCell>
    
                    <TableCell align="center">
                    <form className={classes.input} noValidate autoComplete="off">
                      <TextField id="standard-basic" value={data["attabread"]} name="attabread" label="Enter" onChange={handleChange} />
                    </form>
                    </TableCell>
    
                    <TableCell align="center">
                    <form className={classes.input} noValidate autoComplete="off">
                      <TextField id="standard-basic" value={data["brownbread"]} name="brownbread" label="Enter" onChange={handleChange} />
                    </form>
                  </TableCell>
    
                  <TableCell align="center">
                    {currAmt}
                  </TableCell>
                  
                  <TableCell align="center">
                    <Button variant="contained" color="primary" name="add" onClick={handleRow}>
                      SAVE
                    </Button>
                  </TableCell>
              </TableRow>
          </>
  )
  const headerTableContent = (
    <>
                
    </>
  )


  const tableContent = (
    <Box m={"10%"}>
    
    <AddModal headCell = {headingTable} tableCell = {headerTableContent} selectedRow={selectedRow} 
    handleRow={handleRow} modalIsOpen={modalIsOpen} closeModal={closeModal} openModal={openModal}
    fromModalDate={fromModalDate} epochFromtime={epochFromtime} handlefromModalDate={handlefromModalDate}
    />

        <TableContainer  component={Paper}>
         <MaterialUIPickers Dateprop= {epochtime} Data={rows}/>
            <Table aria-label="caption table">
            <TableHead>
                <TableRow>
                
                {headingTable}
                              
                </TableRow>
               
                {selectedRow}

              </TableHead>
              <TableBody>
              {
                  rows.length ? rows.map((row,idx) => {
                  
                  {/* if(idx<=1) */}
                  {
                    return (
                  <TableRow key={row.dataBody.currDate}>
                    <TableCell align="center">{row.dataBody.currDate} ({row.dataBody.dayName})</TableCell>
                    <TableCell align="center">{row.dataBody["full-cream"]}</TableCell>
                    <TableCell align="center">{row.dataBody.toned}</TableCell>
                    <TableCell align="center">{row.dataBody.attabread}</TableCell>
                    <TableCell align="center">{row.dataBody.brownbread}</TableCell>
                    <TableCell align="center">{row.dataBody.currAmt}</TableCell>
                  </TableRow>
                    )
                  }
                  }
                  ) : ""
                }
              </TableBody>
            </Table>
        </TableContainer>
       { (rows.length==0) && 
        <div className="loader" style={{"margin-left":"550px"}}>{Example("spinningBubbles","rgb(38 108 223)")}</div>}
        </Box>
  )

 

  return (
    <React.Fragment>
        {isvalid && tableContent}
        </React.Fragment>
  )
       
      
}
