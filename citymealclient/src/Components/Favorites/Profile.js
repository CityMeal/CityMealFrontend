import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    msg: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F9CF00',
        marginLeft: '5%',
        marginRight: '5%',
    },
    fontSize: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2rem',
        },
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '3%',
        fontSize: '1.5rem'
    },
    currentProfileDiv: {
        marginLeft: '3%',
    },
    currentProfile: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '3%',
        paddingBottom: '3%',
    },
    editform: {
        marginTop: '2%',
        marginLeft: '3%',
    },
    editInput: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '3%',
    },
}));




function ShowProfile(props) {
    const classes = useStyles();

    const [currentZipcode, setCurrentZipcode] = React.useState(true);

    function handleClick() {
        // { props.updateUser }
        setCurrentZipcode(!currentZipcode)
    }

    return (
        <div>
            <Box className={classes.profile}>
                {currentZipcode &&
                    <div className={classes.currentProfileDiv}>
                        <div className={classes.currentProfile}><label>username:</label>{props.currentUser.username}</div>
                        <div className={classes.currentProfile}><label>zipcode:</label>{props.currentUser.zipcode}</div>
                    </div>
                }


                {!currentZipcode &&
                    <form className={classes.editform}>
                        <TextField className={classes.editInput} id="standard-search" name="username" label={props.currentUser.username} value={props.currentUser.username} onChange={props.handleChange} />
                        <TextField className={classes.editInput} id="standard-search" name="zipcode" label={props.currentUser.zipcode} value={props.currentUser.zipcode} onChange={props.handleChange} />
                    </form>
                }
                <Button className={classes.editform} variant="contained" color="primary" onClick={!currentZipcode ? props.updateUser: handleClick}>{currentZipcode ? 'edit' : 'submit'}</Button> 
                <Button className={classes.editform} variant="outlined" color="primary" onClick={props.deleteUser}>Delete Account</Button>

            </Box>
        </div>
    )
}

function Profile(props) {
    // console.log(props)
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Profile</p></Box>
            <ShowProfile currentUser={props.currentUser} handleChange={props.handleChange} updateUser={props.updateUser} deleteUser={props.deleteUser} />
        </div>
    )
}


export default Profile;