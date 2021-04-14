import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  zipcodeInput: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '5%',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '5%',
    marginRight: '5%',
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
    // height: '15rem',
    paddingLeft: '5%',
  },
  link: {
    textDecoration: 'none',
    color: '#D9D9D9',
    backgroundColor: '#4484CE',
    textAlign: 'center',
    width: '50%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  twolists: {
    display: 'flex',
    flexDirection: 'row',
  },
  showList: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  showListLg: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  },

}));

function EachList() {
  const classes = useStyles();

  return (
    <Box className={classes.list} maxWidth="xl" >
      <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1618158659/GoogleMapTA_nkou2y.jpg" alt="map" /></Box>
      <Box className={classes.info} width={1 / 2}>
        <p>Franklin Delano Roosevelt High School - 5800 20 Avenue, 11204</p>
        {/* <Button variant="contained" color="primary"><a style={{ textDecoration: "none", color: "white" }} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a></Button> */}
        <a className={classes.link} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a>
        <p>⭐️⭐️⭐️⭐️⭐️</p>
        <p>❤️</p>
      </Box>
    </Box>
  )
}

function TwoLists() {
  const classes = useStyles();

  return (
    <Box className={classes.twolists}>
      <EachList />
      <EachList />
    </Box>

  )
}

function List() {
  const classes = useStyles();
  return (
    <div >
      {/* <div className={classes.zipcodeInput}><TextField id="standard-search" label="zipcode" type="search" /></div> */}
      <div className={classes.showList}><EachList /></div>
      <div className={classes.showListLg}><TwoLists /></div>
    </div>
  );
}

export default List;
