import React from 'react';
import Filter from './Filter'
import Rating from './Rating'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
  // zipcodeInput: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   paddingBottom: '5%',
  //   position: 'relative',
  //   top: -4 + 'em',
  //   left: 3 + 'em',
  // },
  list: {
    // border: 0.5 +'px solid black',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey')
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
  // link: {
  //   textDecoration: 'none',
  //   color: '#D9D9D9',
  //   backgroundColor: '#4484CE',
  //   textAlign: 'center',
  //   width: '50%',
  //   paddingTop: '2%',
  //   paddingBottom: '2%',
  // },
  // twolists: {
  //   display: 'flex',
  //   flexDirection: 'row',
  // },
  // showList: {
  //   [theme.breakpoints.down('md')]: {
  //     display: 'block',
  //   },
  //   [theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   }
  // },
  // showListLg: {
  //   [theme.breakpoints.down('md')]: {
  //     display: 'none',
  //   },
  //   [theme.breakpoints.up('md')]: {
  //     display: 'block',
  //   }
  // },
  favBtn: {
    border: 'none',
    backgroundColor: 'white',
    width: '5%',
    marginTop: '3%',
    cursor: 'pointer',
  },
  listDiv: {
    // border: solid red;
    width: 100 + '%',
    height: 24 + 'em',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'scroll',
    position: 'absolute',
    boxSizing: 'border-box',
    marginTop: -4 + 'em',
  }

}));


const divStyle = {
  // border: 'solid green',
  width: 100 + '%',
  // height: 27 + 'em',
  position: 'relative',
  top: 0 + 'em',
}

const directionStyle = {
  // border: 'solid red',
  position: 'relative',
  left: -0.5 + 'em',
}

function List(props) {
  const classes = useStyles();

  // const classes = useStyles();
  // console.log(props.allLocations)
  // console.log(props.locations)
  return (
    <div style={divStyle}>
      {/* <FilterStyle> */}
      <Filter />
      {/* <div className={classes.zipcodeInput}><TextField id="standard-search" label="zipcode" type="search" /></div> */}
      {/* </FilterStyle> */}
      <ListWrapper>
        {props.locations.map(location => (
          <Box className={classes.list} maxWidth="xl" key={location.id} >
            <Box className={classes.pic} borderRadius={16} width={1 / 2}><img height="auto" width="100%" padding-left="3%" src="https://res.cloudinary.com/dqduwnrb1/image/upload/v1618158659/GoogleMapTA_nkou2y.jpg" alt="map" /></Box>
            <Box className={classes.info} width={1 / 2}>
              <p>{location.name}</p>
              <p>{location.city}</p>
              <Rating />
              <Button variant="contained" color="primary" style={directionStyle}><a style={{ textDecoration: "none", color: "white" }} href="https://www.google.com/maps" target="_blank">GET DIRECTION</a></Button>

              {/* This material ui button doesn't work, but I'll leave it hear for now */}
              {/* <Button onClick={props.addFav} name={location.id}>test</Button> */}
              {/* This normal button works */}
              <button className={classes.favBtn} onClick={props.addFav} name={location.id}>❤️</button>
            </Box>
          </Box>
        ))}
      </ListWrapper>
    </div>
  )
}

// function TwoLists(props) {
//   const classes = useStyles();

//   return (
//     <Box className={classes.twolists}>
//       <EachList />
//       <EachList />
//     </Box>

//   )
// }

// function List(props) {
//   console.log(props.locations)
//   const classes = useStyles();
//   return (
//     <div >
//       <Filter />
//       <div className={classes.zipcodeInput}><TextField id="standard-search" label="zipcode" type="search" /></div>
//       <div className={classes.showList}><EachList siteLocations={props.locations}/></div>
//       {/* <div className={classes.showListLg}><TwoLists /></div> */}
//     </div>
//   );
// }

export default List;
