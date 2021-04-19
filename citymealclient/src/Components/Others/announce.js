import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        // border: 'solid red',
        // felexDirection: 'column',
        backgroundColor: '#F9CF00', //F9CF00
        height: 9.4 + 'em',        
        position: 'relative',
        margin: 0.5 + 'em',
        textAlign: 'center',
        opacity: 0.8,
        fontSize: '0.9rem',
    },
    // text: {
    //     // display: 'column',
    //     // alignSelf: 'center',
    // },
    // mainfont: {
    //     [theme.breakpoints.down('sm')]: {
    //         // fontSize: '0.7rem',
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         fontSize: '1.2rem',
    //     },
    //     [theme.breakpoints.up('lg')]: {
    //         fontSize: '1.5rem',
    //     },

    // },
    // subfont: {
    //     [theme.breakpoints.down('sm')]: {
    //         fontSize: '0.6rem',
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         fontSize: '1rem',
    //     },
    //     [theme.breakpoints.up('lg')]: {
    //         fontSize: '1.3rem',
    //     },

    // }
}));

function Announce() {
    const classes = useStyles();

    return (
        <Box className={classes.root} >
            {/* <div className={classes.text}> */}
                <h3> Pickup Time</h3>
                <p className={classes.subfont}>Families / Students: Mon - Fri, 9 am to 12 pm </p>
                <p className={classes.subfont}>Community Members: Mon - Fri, 3 pm to 5 pm</p> 
                <p className={classes.subfont}>No Registration Required</p>
            {/* </div> */}

        </Box>)
}

export default Announce;