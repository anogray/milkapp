import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import React, { Component, useState, useEffect } from "react";

import moment from "moment";



  export default function MaterialUIPickers(props) {

    let epochFrom = props.Dateprop
    let epochTo = props.Dateprop

    const [fromDate, setfromDate] = React.useState(new Date(epochFrom));
    const [toDate, settoDate] = React.useState(new Date(epochTo));
    const [epochFromtime, setepochFromtime] = useState(epochFrom)
    const [epochTotime, setepochTotime] = useState(epochTo)
    const [currCalc, setcurrCalc] = useState(0)

    // let currDate = moment().format("DD-MM-yyyy");
  //   let no = "20-03-2021"
  // console.log("no",no,moment(no,"DD-MM-yyyy").valueOf())

    const handleFromDate = (date) => {
        let newTo = date
        setfromDate(newTo);
        let newEpoch = moment(newTo,"DD-MM-yyyy").valueOf()
        setepochFromtime(newEpoch)
        //console.log("from",epochFromtime)

    };

    const handleToDate = (date) => {
        let newTo = date
        settoDate(newTo);
        let newEpoch = moment(newTo,"DD-MM-yyyy").valueOf()
        setepochTotime(newEpoch)
        //console.log("tooo",newEpoch)

    };

    const handleClick = ()=>{
        
        let calAmt = 0;
        if(props.Data)
        {
            //console.log("from To",epochFromtime,epochTotime)
            if(epochFromtime<=epochTotime)
            {
            let calcAmt = props.Data.map((row) => {
                //console.log("Clicked data",row,epochFromtime,epochTotime)

                if(epochFromtime <= row.dataBody.epoch &&  row.dataBody.epoch <=epochTotime){
                        calAmt+=row.dataBody.currAmt;
                        
                    }

                   // console.log("got inside map",row.dataBody.epoch)   
            }
            
            )
            setcurrCalc(calAmt)
            console.log("totalAmount",calAmt)
        }
        else{
            //console.log("Range Invalid")
            setcurrCalc(0)
            alert("Range Invalid")
            
        }
            
        }

    }
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          {/* <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd-MM-yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={fromDate}
            onChange={handleFromDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          /> */}
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="FROM DATE"
            format="dd-MM-yyyy"
            value={fromDate}
            onChange={handleFromDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <h1 className="amt">₹ {currCalc}</h1>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="TO DATE"
            format="dd-MM-yyyy"
            value={toDate}
            onChange={handleToDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <Button variant="contained" color="secondary" name="calc" onClick={handleClick}>
                  CALCULATE
                </Button>
                {/* <div>
                <h1 className="amt">₹ {currCalc}</h1>
                </div> */}
                
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
  