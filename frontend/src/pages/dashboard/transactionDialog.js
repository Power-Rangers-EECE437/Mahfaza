import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    notesbox : {
        height: '200px',
    }
}))

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setOpen(false);
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get("Merchant"));
    
    fetch('/transaction/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: data.get('amount'),
        category: data.get('category'),
        merchant: data.get('merchant'),
        note: data.get('note'),
        date: data.get('date'),
        accountID: 0
      })
    })
  }
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Transaction +
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form below to add a new transaction
          </DialogContentText>
          <form className={classes.form} noValidate method="POST" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Merchant"
            name = "merchant"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            name = "category"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            name="amount"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Date"
            type="date"
            placeholder=''
            name="date"
            fullWidth
          />
          {/* https://material-ui.com/components/text-fields/ */}
          <TextField
            multiline
            // className={classes.notesbox}
            rows={4}
            margin="dense"
            id="name"
            label="Note"
            type="text"
            name="note"
            fullWidth
          />
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Transaction
          </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
