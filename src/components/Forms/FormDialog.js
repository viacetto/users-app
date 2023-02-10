import * as React from 'react';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { InputDefault } from '../Inputs/InputDefault.js';
//mail validator
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//initial errors state 
const initialErrors = {
  name: false,
  surname: false,
  mail: false
}

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState(initialErrors)

  let initialValues;
  //initial values for adding form
  if (props.type === "add") {
    initialValues = {
      name: '',
      surname: '',
      mail: ''
    }
  }
  //initial values for editing form
  if (props.type === "edit") {
    initialValues = {
      id: props.row.id,
      name: props.row.name,
      surname: props.row.surname,
      mail: props.row.mail
    }
  }
  const [formValues, setFormValues] = React.useState(initialValues)

  //change values state on inputs change
  const inputHandler = (e) => {
    if (e.target.id === "name")
      setFormValues({ ...formValues, name: e.target.value })
    if (e.target.id === "surname")
      setFormValues({ ...formValues, surname: e.target.value })
    if (e.target.id === "mail")
      setFormValues({ ...formValues, mail: e.target.value })
  }

  //open modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //close modal
  const handleClose = (e) => {
    //if  clicked on cancel
    if (e.target.id === "cancel") {
      setOpen(false);
      setFormValues(initialValues)
      setErrors(initialErrors)
      return
    }

    //if  check if inputs are invalid
    const nameInvalid = formValues.name.trim() === ""
    const surnameinValid = formValues.surname.trim() === ""
    const mailInvalid = formValues.mail.trim() === "" || !validateEmail(formValues.mail)

    //set state of errors according to outcome
    setErrors({
      name: nameInvalid,
      surname: surnameinValid,
      mail: mailInvalid
    })

    //if any input is invalid, prevent from clicking confirm
    if (nameInvalid || surnameinValid || mailInvalid) {
      return
    }

    //if there are no errors, run adding or editing functions
    if (e.target.id === "add")
      props.userAdd(formValues)
    if (e.target.id === "edit") {
      props.userEdit(formValues)
    }

    //closing and clearing modal
    setOpen(false);
    setFormValues(initialValues)
    setErrors(initialErrors)
  };

  return (
    <>
      {props.type === "add" ? (
        <Button onClick={handleClickOpen} aria-label="add" sx={{ margin: '20px 0' }} variant="contained" endIcon={<AddIcon />}>
          Add
        </Button>)
        :
        (
          <IconButton onClick={handleClickOpen} className="edit_btn">
            <EditIcon />
          </IconButton>
        )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: '0' }} >Add</DialogTitle>
        <DialogContent>
          <InputDefault error={errors.name} required id={"name"} label={"Name"} value={formValues.name} onChange={inputHandler} />
          <InputDefault error={errors.surname} required id={"surname"} label={"Surname"} value={formValues.surname} onChange={inputHandler} />
          <InputDefault error={errors.mail} required id={"mail"} label={"Email"} value={formValues.mail} onChange={inputHandler} />
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose}>Cancel</Button>
          <Button id={props.type === "edit" ? "edit" : "add"} onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}