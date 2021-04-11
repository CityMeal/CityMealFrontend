import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9CF00',
        marginLeft: '6%',
        marginBottom: '5%',
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '5%',
        paddingRight: '9%',
        textAlign: 'left'
    },
    // mainfont: {
    //     [theme.breakpoints.down('sm')]: {
    //         fontSize: '0.8rem',
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         fontSize: '1.8rem',
    //     },
    //     [theme.breakpoints.up('lg')]: {
    //         fontSize: '2.3rem',
    //     },

    // },
    // subfont: {
    //     [theme.breakpoints.down('sm')]: {
    //         fontSize: '0.6rem',
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         fontSize: '1.5rem',
    //     },
    //     [theme.breakpoints.up('lg')]: {
    //         fontSize: '2rem',
    //     },

    // }
}));

function Announce() {
    const classes = useStyles();

    return (
        <Box className={classes.root} maxWidth="xl" width={3 / 4}>
            <div>
                {/* <p className={classes.mainfont}>1. Pickup available time</p>
                <p className={classes.subfont}> - all families and students: Monday - Friday, 9 am to 12 pm</p>
                <p className={classes.subfont}> - members of the community: Monday-Friday, 3 pm to 5 pm </p>
                <p className={classes.mainfont}>2. No registration or ID required</p>
                 */}

                <p>1. Pickup available time</p>
                <p> - all families and students: Monday - Friday, 9 am to 12 pm</p>
                <p> - members of the community: Monday-Friday, 3 pm to 5 pm </p>
                <p>2. No registration or ID required</p>
            </div>

        </Box>)
}

export default Announce;