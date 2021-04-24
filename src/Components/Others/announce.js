import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#325288',
        backgroundColor: '#f4eee8',
        position: 'relative',
        width: '100vw',
        marginTop: '3%',
        marginBottom: '3%',
        paddingTop: '2%',
        paddingBottom: '2%',
        textAlign: 'center',
        opacity: 0.8,
        fontSize: '0.9rem',
    },
    mainfont: {
        [theme.breakpoints.down('sm')]: {
            // fontSize: '0.7rem',
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
            <p className={classes.mainfont}><b>PICKUP TIME - NO REGISTRATION REQUIRED</b></p>
            <p className={classes.subfont}><b>Families / Students:</b>Mon - Fri, 9 AM to 12 PM. <b>Community Members:</b> Mon - Fri, 3 PM to 5 PM</p>
        </Box>)
}

export default Announce;