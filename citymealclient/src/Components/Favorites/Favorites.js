import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Rating from '../ListComponent/Rating'
import { FaHeart } from 'react-icons/fa'

const useStyles = makeStyles((theme) => ({
  listWrap: {
    width: '100%',
    marginTop: '1%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflow: 'scroll',
    boxSizing: 'border-box',
  },
  msg: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F9CF00',
    marginTop: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
  },
  fontSize: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    // [theme.breakpoints.up('md')]: {
    //   fontSize: '1.5rem',
    // },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2rem',
    },
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '60em',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '3%',
    marginBottom: '5%',
    boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
    [theme.breakpoints.up('lg')]: {
      width: '30em',
    },
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
    paddingLeft: '8%',
  },
  directionBtn: {
    width: '50%',
    marginTop: '6%',
    marginBottom: '3%',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '90%',
      fontSize: '0.7rem'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '70%',
    },
  },
  favBtn: {
    border: 'none',
    backgroundColor: 'white',
    width: '5%',
    cursor: 'pointer',
    marginTop: '3%',
  },
}));

function constructStreetViewURL(favorite) {
  let url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${favorite.latitude},${favorite.longitude}&key=${process.env.REACT_APP_API_KEY}`
  return url
}

function Favorites(props) {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Favorite Meal Sites</p></Box>
      <Box>
        <div className={classes.listWrap}>
          {Array.isArray(props.favorites) && props.favorites.map(favorite => (
            <Box className={classes.list} maxWidth="xl" key={favorite.id} >
              <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src={constructStreetViewURL(favorite)} alt="map" /></Box>
              <Box className={classes.info} width={1 / 2}>
                <p>{favorite.name}</p>
                <p>{favorite.city}</p>
                <Rating />
                {/* <button className={classes.favBtn} onClick={props.deleteFav} name={favorite.id} ><FaHeart color={'red'} /></button> */}
                <button className={classes.favBtn} onClick={props.deleteFav} name={favorite.id} >❤️</button>
                <Button variant="contained" color="primary" className={classes.directionBtn}><a style={{ textDecoration: "none", color: "white" }} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a></Button>
              </Box>
            </Box>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default Favorites;


