import React , { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory} from 'react-router-dom';

//from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side
function Copyright() {
  return ( ''
  //   <Typography variant="body2" color="textSecondary" align="center">
  //     <Link style={linkStyle} color="inherit" href="https://material-ui.com/">
  //     By clicking Create account, you agree to our
  //     Terms and have read and acknowledge our Privacy Statement.
  //     </Link>{' '}  
  //     {new Date().getFullYear()}
  //     {'.'}
  //   </Typography>
  );
}

const linkStyle = {
  color: '#556cd6',
  textDecoration: 'None',
  fontSize: '0.875rem',
  fontFamily: "Roboto",
  fontWeight: 400,
  lineHeight: 1.43,
  letterSpacing: '0.01071em',
};
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/Mahfaza_Logo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#3da9ff',
      // theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor : '#3da9ff',
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUpSide() {  
  const classes = useStyles();
  const history = useHistory()

  const [emailError, setemailError] = useState(false)
  const [passwordError, setpasswordError] = useState(false)
  const [userExistsError, setuserExistsError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.get('First Name'),
          last_name: data.get('Last Name'),
          password: data.get('password'),
          email: data.get('email')
        })
      }).then(response => response.json()).then(data => {
        //check for errors
        console.log(data);
        setemailError(false);
        setpasswordError(false);
        setuserExistsError(false);
        if (data["errors"]){
        if(data["errors"]["password"]){
          setpasswordError(true);
          console.log("Enter a gd pass pls")
        }
        if(data["errors"]["email"]){
          setemailError(true);
          console.log("Enter a valid email")
        }
        }
        else if (data["code"] == 11000)
        {
          setuserExistsError(true);
        }
        else{
          // else no error
          //login user
          console.log(data)
          localStorage.setItem('loggedStatus', true);
          localStorage.setItem('token', data["token"]);
          return data;
        }
      }).then(data=>{

         fetch('/account', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            owner: data["user"]["_id"],
            balance: 0,
            name: 'default',
            currency: "lollar"
          })
        })
          history.push('/dashboard');
      })
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate method="POST" onSubmit={handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="First Name"
              label="First Name"
              type="First_Name"
              id="First_Name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Last Name"
              label="Last Name"
              type="Last_Name"
              id="Last_Name"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={emailError? true : userExistsError? true : false}
              helperText = {emailError? "Please enter a valid email" : userExistsError? "User already exists" : ""}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={passwordError? true : false}  //this will show err message only when there is error
              helperText="Password must be 12 characters long"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Account
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link style={linkStyle} to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}