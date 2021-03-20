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

import moment from "moment";
import { Button, TextField } from "@material-ui/core";

import db from "../config/firebase"
// import "../styles.css"


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

export default function AcccessibleTable() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [currAmt, setcurrAmt] = useState(0);
  const [clear, setclear] = useState({})
  const [allData, setallData] = useState({"full-cream":"","toned":""});
  
  const formulaFull = {half:10,full:20}
  const formulaToned = {half:5,full:10}

  let currDate = moment().format("DD-MM-yyyy");

  let epochtime = moment(currDate,"DD-MM-yyyy").valueOf()
  //console.log("epoch time",epochtime)
  // let nextp = "15-08-2015"
  // epochtime = moment(nextp,"DD-MM-yyyy").valueOf()
  // console.log("epoch time",epochtime)


  
  useEffect(() => {
        const dataCall = async() => {
          await db.collection("milkdata").onSnapshot(snapshot => {
           // console.log("inside useffect")
           //setallData(snapshot.docs.map(doc=>({date:doc.id, dataBody:doc.data()})))
           setallData(snapshot.docs.map(doc=>({dataBody:doc.data()})))
        })

      }
      dataCall();
    },[])
  
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

  const handleRow = async(e)=>{
    e.preventDefault();
    if(currAmt!=0)
    {
    if(data["full-cream"]=="")
    {
      data["full-cream"]=0
    }
    if(data["toned"]=="")
    {
      data["toned"]=0
    }
    let saveData = {...data,currDate:currDate,currAmt:currAmt,epoch:epochtime}
    let res = await db.collection("milkdata").doc(currDate).set(saveData)
    //console.log("db response",db)
    // let obj={}
     setData({...data , "full-cream":"", "toned":""})
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

    // console.log("Amt current",currAmt);
    setcurrAmt(currAmt)
  }
  
 // console.log("db receeoved",rows)

  return (
//{`${classes.roottabsize}`}
    <TableContainer className={""} component={Paper}>
      <Box mx={""}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center">FULL CREAM</TableCell>
              <TableCell align="center">TONED</TableCell>
              <TableCell align="center">AMOUNT (₹)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{currDate}</TableCell>

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
                {currAmt}
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary" name="add" onClick={handleRow}>
                  SAVE
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? rows.map((row) => (
              <TableRow key={row.dataBody.currDate}>
                <TableCell align="center">{row.dataBody.currDate}</TableCell>
                <TableCell align="center">{row.dataBody["full-cream"]}</TableCell>
                <TableCell align="center">{row.dataBody.toned}</TableCell>
                <TableCell align="center">{row.dataBody.currAmt}</TableCell>
              </TableRow>
            )):""}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
