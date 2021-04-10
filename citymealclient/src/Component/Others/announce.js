import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9CF00',
        marginLeft: '11%',
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '5%',
        paddingRight: '5%',
        textAlign: 'center'
    }
}));

function Announce() {
    const classes = useStyles();

    return (
        <Box className={classes.root} maxWidth="xl" width={2 / 3}>
            {/* <p className={classes.font}>1. Pickup available time</p>
            <p className={classes.font}>- all families and students: Monday - Friday, 9 am to 12 pm</p>
            <p className={classes.font}> - members of the community: Monday-Friday, 3 pm to 5 pm</p>
            <p className={classes.font}>2. No registration or ID required</p> */}
            <h3>1. Pickup available time</h3>
            <h4>- all families and students: Monday - Friday, 9 am to 12 pm</h4>
            <h4> - members of the community: Monday-Friday, 3 pm to 5 pm</h4>
            <h3>2. No registration or ID required</h3>
        </Box>)
}

export default Announce;