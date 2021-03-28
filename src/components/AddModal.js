import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TableCell } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React, { Component, useState } from 'react';

import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default function AddModal(props) {

  console.log("fxnprops",props)


  let currModalDate = moment().format("DD-MM-yyyy");
  let epochModaltime = moment(currModalDate,"DD-MM-yyyy").valueOf()

   // const [modalIsOpen,setIsOpen] = React.useState(false);
    // const [fromModalDate, setfromModalDate] = React.useState(new Date(epochModaltime));
    // const [epochFromtime, setepochFromtime] = useState(currModalDate)


    // console.log("modalDate",fromModalDate)
    // let curr=moment(fromModalDate).format("DD-MM-yyyy")
    // console.log("String date",curr)

    
     
    //   const handlefromModalDate = (date) => {
    //     let newTo = date
    //     setfromModalDate(newTo);
    //     let newEpoch = moment(newTo,"DD-MM-yyyy").valueOf()
    //     setepochFromtime(newEpoch)
        
    //     //console.log("from",epochFromtime)

    // };
    
    // function openModal() {
    //   setIsOpen(true);
    // }
     
    //   function closeModal(){
    //     setIsOpen(false);
    //   }

      const handleRow = ()=>{
        
      }

    return (
        <div>
        <Button variant="contained" color="primary" name="previous" onClick={props.openModal}>Add Forgot Previous ?</Button>
        <Modal
        isOpen={props.modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={props.closeModal}
          contentLabel="Example Modal"
        >
        <button onClick={props.closeModal}>close</button>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Choose Day"
            format="dd-MM-yyyy"
            value={props.fromModalDate}
            onChange={props.handlefromModalDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        </MuiPickersUtilsProvider>
        {props.headCell}
        {props.selectedRow}
        
        </Modal>
            
        </div>
    )
}
