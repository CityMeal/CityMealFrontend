import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '30vh',
        backgroundColor: '#F9CF00',
        marginLeft: '15%',
    },
    font: {
        fontSize: '1.2rem'
    }
}));

function Announce() {
    const classes = useStyles();

    return (
        <Box className={classes.root} maxWidth="xl" width={2 / 3}>
            <p className={classes.font} variant="h3">1. Pickup available time</p>
            <p className={classes.font} variant="h4">- all families and students: Monday - Friday, 9 am to 12 pm</p>
            <p className={classes.font} variant="h4"> - members of the community: Monday-Friday, 3 pm to 5 pm</p>
            <p className={classes.font} variant="h3">2. No registration or ID required</p>
        </Box>)
}

export default Announce;