import React from 'react';
import Profile from './Profile'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Rating from '../ListComponent/Rating'

const directionStyle = {
  // border: 'solid red',
  position: 'relative',
  left: -0.5 + 'em',
}

const ListWrapper = styled.div`
  // border: solid red;
  width: 100%;
  height:24em;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  // position: absolute;
  box-sizing: border-box;
  // margin-top: -4em;
  margin-bottom: 5%;

`


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
  // console.log("favorites", props.favorites)
  return (
    <div>
      <Box>
        {/* < Button onClick={props.getFav} > test</Button > */}
        {Array.isArray(props.favorites) && props.favorites.map(favorite => (
          <Box className={classes.list} maxWidth="xl" key={favorite.id} >
            <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1618158659/GoogleMapTA_nkou2y.jpg" alt="map" /></Box>
            <Box className={classes.info} width={1 / 2}>
              <p>{favorite.name}</p>
              <p>{favorite.city}</p>
              <Rating />
              <Button variant="contained" color="primary" style={directionStyle}><a style={{ textDecoration: "none", color: "white" }} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a></Button>
              <button className={classes.favBtn} onClick={props.deleteFav} name={favorite.id} >❤️</button>
            </Box>
          </Box>
        ))}
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
      <EachList favorites={props.favorites} deleteFav={props.deleteFav} />
      <Profile userSignedIn={props.userSignedIn} currentUser={props.user} updateUser={props.updateUser} handleChange={props.handleUser} deleteUser={props.deleteUser} />
    </div>
  );
}

export default Favorites;


