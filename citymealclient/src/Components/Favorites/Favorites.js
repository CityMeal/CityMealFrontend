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

  const [currentZipcode, setCurrentZipcode] = React.useState(false);

  const [newZipcode, setNewZipcode] = React.useState("00000")

  const handleChange = (e) => {
    const { value } = e.target
    setNewZipcode(value)
  }

  return (
    <div className="profile">
      <Box className={classes.profile}>
        <p>username: citymeal</p>
        <label>zipcode:</label>{!currentZipcode && newZipcode}
        {currentZipcode &&
          <div>
            <TextField className={classes.editInput} id="standard-search" label="currentZipcode" type="search" value={newZipcode} onChange={handleChange} />
          </div>
        }
        <Button variant="contained" color="primary" onClick={() => setCurrentZipcode(!currentZipcode)} >{!currentZipcode ? 'edit' : 'submit'}</Button>
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


