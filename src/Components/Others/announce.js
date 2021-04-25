import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#325288',
        backgroundColor: '#f6f3ef',
        position: 'relative',
        width: '100vw',
        margin: '2% 0 3% 0',
        padding: '1% 0 2% 0',
        textAlign: 'center',
        opacity: 0.8,
        fontSize: '0.9rem',
        boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
    },
    intro: {
        color: '#F4442E', //'#FF6663',//'#FD5200',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.2rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.5rem',
        },
    },
    mainfont: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5rem',
        },

    },
    subfont: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.6rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.3rem',
        },
    }
}));

function Announce() {
    const classes = useStyles();

    return (
        <Box className={classes.root} >
            <p className={classes.intro}><b>FIND FREE MEAL SITES NEAR YOU</b></p>
            <p className={classes.mainfont}><b>PICKUP TIME - NO REGISTRATION REQUIRED</b></p>
            <p className={classes.subfont}><b>Families / Students:</b>Mon - Fri, 9 AM to 12 PM. <b>Community Members:</b> Mon - Fri, 3 PM to 5 PM</p>
        </Box>)
}

export default Announce;