import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import userSignedIn from '../../App'


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
    const BASE_URL = "http://localhost:3030"

    console.log(props)

    const [currentZipcode, setCurrentZipcode] = React.useState(true);

    // const [state, setState] = React.useState({
    //     username: props.currentUser.username,
    //     zipcode: props.currentUser.zipcode
    // })

    // function handleChange(e) {
    //     const value = e.target.value;
    //     console.log(e.target.name, value)
    //     setState({
    //         ...state,
    //         [e.target.name]: value
    //     });
    // }

    function onClick() {
        setCurrentZipcode(!currentZipcode)
    }

    //add delete user function
    function handleClick() {
        // console.log('delete account')
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
                        <TextField className={classes.editInput} id="standard-search" name={props.currentUser.username} label="username" value={props.currentUser.username} onChange={props.handleChange} />
                        <TextField className={classes.editInput} id="standard-search" name={props.currentUser.zipcode} label="zip code" value={props.currentUser.zipcode} onChange={props.handleChange} />
                    </form>
                }
                <Button className={classes.editform} variant="contained" color="primary" onClick={onClick} >{currentZipcode ? 'edit' : 'submit'}</Button>
                <Button className={classes.editform} variant="outlined" color="primary" onClick={handleClick}>Delete Account</Button>

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
            <ShowProfile currentUser={props.currentUser} handleChange={props.handleChange} />
        </div>
    )
}


export default Profile;