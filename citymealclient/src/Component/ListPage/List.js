import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  input: {
    paddingBottom: "5%",
    [theme.breakpoints.down('sm')]: {
      marginLeft: '30%',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '40%',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '40%',
    },
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
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // height: '15rem',
    paddingLeft: '5%',
  },
  // eachInfo: {
  //   display: 'flex',
  //   paddingBottom: '5%',
  //   justifyContent: 'flex-end',
  // }
}));

function EachList() {
  const classes = useStyles();

  return (
    <Box className={classes.list} maxWidth="xl" border={1}>
      <Box className={classes.pic} width={1 / 2}><img height="100%" width="100%" src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1618158659/GoogleMapTA_nkou2y.jpg"></img></Box>
      <Box className={classes.info} width={1 / 2}>
        {/* <Box className={classes.eachInfo}>Franklin Delano Roosevelt High School - 5800 20 Avenue, 11204</Box>
        <Box className={classes.eachInfo}>D, E, 2, 3</Box>
        <Box className={classes.eachInfo}>⭐️⭐️⭐️⭐️⭐️</Box>
        <Box className={classes.eachInfo}>❤️</Box> */}
        <p>Franklin Delano Roosevelt High School - 5800 20 Avenue, 11204</p>
        <p>Train: D, E, 2, 3</p>
        <p>⭐️⭐️⭐️⭐️⭐️</p>
        <p>❤️</p>
      </Box>
    </Box>
  )
}

function List() {
  const classes = useStyles();

  return (
    <div >
      <TextField className={classes.input} id="standard-search" label="zipcode" type="search" />
      <EachList />
      <EachList />
      <EachList />
    </div>
  );
}

export default List;
