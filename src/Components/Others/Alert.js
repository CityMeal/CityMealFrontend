import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'red',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Alerts() {
    const classes = useStyles();
    console.log("alert!!")

    return (
        <div className={classes.root}>
            <Alert severity="success" color="info">
                SUCCESS!
            </Alert>
        </div>
    );
}
