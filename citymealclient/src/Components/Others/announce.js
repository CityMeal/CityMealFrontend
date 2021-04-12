import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9CF00',
        marginTop: '3%',
        marginBottom: '5%',
        marginLeft: '3%',
        marginRight: '3%',
        textAlign: 'left'
    },
    text: {
        display: 'column',
        alignSelf: 'center',
    },
    mainfont: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem',
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
        <Box className={classes.root} maxWidth="xl">
            <div className={classes.text}>
                <p className={classes.mainfont}>• Pickup available time</p>
                <p className={classes.subfont}>&nbsp;&nbsp;&nbsp;&nbsp; a. all families and students: Monday - Friday, 9 am to 12 pm</p>
                <p className={classes.subfont}>&nbsp;&nbsp;&nbsp;&nbsp; b. members of the community: Monday-Friday, 3 pm to 5 pm </p>
                <p className={classes.mainfont}>• No registration or ID required</p>
            </div>

        </Box>)
}

export default Announce;