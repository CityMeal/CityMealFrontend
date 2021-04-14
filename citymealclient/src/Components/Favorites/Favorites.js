import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  msg: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F9CF00',
    marginLeft: '5%',
    marginRight: '5%',
  },
  fontSize: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2rem',
    },
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '3%',
    marginBottom: '5%',
  },
  pic: {
    display: 'flex',
    height: '15rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: '3%',
    fontSize: '1.5rem'
  },
  editInput: {
    marginBottom: '3%'
  },
  currentProfile: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  editform: {
    marginTop: '2%',
  }
}));

function EachList() {
  const classes = useStyles();

  return (
    <Box className={classes.list} maxWidth="xl" border={1} borderRadius={16}>
      <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1618158659/GoogleMapTA_nkou2y.jpg" alt="map" /></Box>
      <Box className={classes.info} width={1 / 2}>
        <p>Franklin Delano Roosevelt High School - 5800 20 Avenue, 11204</p>
        <p>Train: D, E, 2, 3</p>
        <p>⭐️⭐️⭐️⭐️⭐️</p>
        <p>❤️</p>
      </Box>
    </Box>
  )
}

function ShowProfile() {
  const classes = useStyles();

  const [currentZipcode, setCurrentZipcode] = React.useState(true);
  // const [newZipcode, setNewZipcode] = React.useState("00000")
  const [state, setState] = React.useState({
    username: "citymeal",
    zipcode: "00000"
  })



  // const handleChange = (e) => {
  //   const { value } = e.target
  //   setNewZipcode(value)
  // }
  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  //add delete user function
  function handleClick() {
    console.log('delete account')
  }

  return (
    <div>
      <Box className={classes.profile}>
        {/* <p>username: citymeal</p> */}

        {/* <label>zipcode:</label>{!currentZipcode && newZipcode}
        {currentZipcode &&
          <div>
            <TextField className={classes.editInput} id="standard-search" label="currentZipcode" type="search" value={newZipcode} onChange={handleChange} />
          </div>
        } */}
        <div >
          <div className={classes.currentProfile}><label>username:</label>{currentZipcode && state.username}</div>
          <div className={classes.currentProfile}><label>zipcode:</label>{currentZipcode && state.zipcode}</div>
        </div>

        {!currentZipcode && <form className={classes.editform}>
          <label>
            username
        <input
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
          </label>
          <label>
            zip code
        <input
              type="text"
              name="zipcode"
              value={state.zipcode}
              onChange={handleChange}
            />
          </label>
        </form>}
        <Button className={classes.editform} variant="contained" color="primary" onClick={() => setCurrentZipcode(!currentZipcode)} >{currentZipcode ? 'edit' : 'submit'}</Button>
        <Button className={classes.editform} color="primary" onClick={handleClick}>Delete Account</Button>

      </Box>
    </div>
  )
}

function Profile() {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Profile</p></Box>
      <ShowProfile />
    </div>
  )
}

function Favorites() {
  const classes = useStyles();


  return (
    <div>
      <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Favorite Meal Sites</p></Box>
      <EachList />
      <Profile />
    </div>
  );
}

export default Favorites;


