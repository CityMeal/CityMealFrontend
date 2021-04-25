import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Rating from '../ListComponent/Rating'


const useStyles = makeStyles((theme) => ({
  msg: {
    display: 'flex',
    justifyContent: 'center',
    width: '90vw',
    color: '#325288',
    backgroundColor: '#f6f3ef',
    marginTop: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
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
  listWrap: {
    width: '100vw',
    marginTop: '1%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '60em',
    margin: '2% 0 2% 0',
    padding: '2%',
    boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
    [theme.breakpoints.up('lg')]: {
      width: '30em',
      padding: '2%',
      margin: '1%',
    },
  },
  pic: {
    display: 'flex',
    height: '15rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '0'
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '8%',
  },
  directionBtn: {
    // width: '50%',
    marginTop: '10%',
    marginBottom: '3%',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '0.7rem'
    },
  },
  favBtn: {
    border: 'none',
    backgroundColor: 'white',
    width: '5%',
    cursor: 'pointer',
    marginTop: '6%',
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
      <Box style={{ height: '100%' }}>

        <div className={classes.listWrap}>

          {Array.isArray(props.favorites) && props.favorites.map(favorite => (
            <Box className={classes.list} maxWidth="xl" key={favorite.id} >
              <Box className={classes.pic} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src={constructStreetViewURL(favorite)} alt="map" /></Box>
              <Box className={classes.info}>
                <Box style={{ marginBottom: '13%', color: '#325288' }}> {favorite.siteAddress} </Box>
                <Box style={{ marginBottom: '13%', color: '#325288' }}> {favorite.city} </Box>
                <Rating />
                <button className={classes.favBtn} onClick={props.deleteFav} name={favorite.id} >❤️</button>
                <Button variant="contained" color="primary" className={classes.directionBtn}><a style={{ textDecoration: "none", color: "white" }} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a></Button>
              </Box>
            </Box>
          ))}

        </div>

      </Box >
    </div >
  );
}

export default Favorites;