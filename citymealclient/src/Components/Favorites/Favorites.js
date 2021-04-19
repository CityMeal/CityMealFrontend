import React from 'react';
import Profile from './Profile'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Rating from '../ListPage/Rating'


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
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2%',
  },
  ratingBtn: {
    marginLeft: '2%',
  },
  favBtn: {
    border: 'none',
    backgroundColor: 'white',
    width: '5%',
    cursor: 'pointer',
    marginTop: '3%',
  },
}));

function EachList(props) {
  const classes = useStyles();

  return (
    <div>
      {/* < Button onClick={props.getFav} > test</Button > */}
      <Box className={classes.list} maxWidth="xl" border={1} borderRadius={16}>
        <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1618158659/GoogleMapTA_nkou2y.jpg" alt="map" /></Box>
        <Box className={classes.info} width={1 / 2}>
          <p>Franklin Delano Roosevelt High School - 5800 20 Avenue, 11204</p>
          <p>Train: D, E, 2, 3</p>
          <Box className={classes.rating}>
            <Rating />
            <Button className={classes.ratingBtn} variant="contained" color="primary">rate this site</Button>
          </Box>

          <button className={classes.favBtn} onClick={props.deleteFav}>❤️</button>
        </Box>
      </Box>
    </div >

  )
}

function Favorites(props) {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Favorite Meal Sites</p></Box>
      {/* <EachList getFav={props.getFav} /> */}
      <EachList locations={props.locations} />
      <Profile currentUser={props.user} handleChange={props.handleUser} updateUser={props.updateUser} deleteUser={props.deleteUser} />
    </div>
  );
}

export default Favorites;


