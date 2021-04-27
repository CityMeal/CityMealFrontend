import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { FaUser } from 'react-icons/fa'
import { FaMapMarkedAlt } from 'react-icons/fa'
import {get, put} from '../../api'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        [theme.breakpoints.between('xs', 'sm')]: {
            height: '72vh',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            height: '81vh',
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            height: '63.3vh',
        },
        [theme.breakpoints.up('xl')]: {
            height: '69vh',
        },
        color: '#325288'
    },
    msg: {
        display: 'flex',
        justifyContent: 'center',
        width: '90vw',
        backgroundColor: '#f6f3ef',
        marginTop: '3%',
        marginLeft: '5%',
        marginRight: '5%',
        boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
        color: '#325288',
        [theme.breakpoints.down('sm')]: {
            marginTop: '5%',
        },
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
        fontSize: '1.5rem',
        paddingRight: '2%',
        [theme.breakpoints.down('sm')]: {
            marginTop: '5%',
        },
    },
    currentProfileDiv: {
        marginTop: '3%',
        marginLeft: '3%',
    },
    currentProfile: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '3%',
        paddingBottom: '3%',
        marginBottom: '25%',
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

function Profile(props) {

    console.log(props.userSignedIn.token)
    console.log(props.userSignedIn.currentUser)
    const classes = useStyles();

    const [currentZipcode, setCurrentZipcode] = React.useState('true')
    const [currentBtn, setCurrentBtn] = React.useState('EDIT')
    const [submitClicked, setSubmitClicked] = React.useState(false)

    const [updatedUser, setUpdatedUser] = React.useState({
        username: props.userSignedIn.currentUser.username,
        email: props.userSignedIn.currentUser.email,
        address: props.userSignedIn.currentUser.address,
        city: props.userSignedIn.currentUser.city,
        zipcode: props.userSignedIn.currentUser.zipcode,
    })
    console.log(updatedUser)

    function handleClick(e) {
        console.log('I clicked Edit', e.target)
        setCurrentZipcode(!currentZipcode)
        setCurrentBtn('SUBMIT')
    }

    //HANDLE UPDATE USER CHANGE
    function handleUpdateChange(e) {
        const {name, value} = e.target;
        setUpdatedUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    
    }

const updateUser = async () => {
    console.log(props.userSignedIn.currentUser)
    console.log(updatedUser)
    // setSubmitClicked(true)
    const updatedData = await put('/user', updatedUser, props.userSignedIn.token)
    console.log(updatedData)
    props.giveUpdatedUser(updatedData)
};



    return (
        <div>
            <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Account Setting</p></Box>
            <Box className={classes.root}>
                <Box className={classes.profile}>
                    {currentBtn === 'EDIT' ?
                        (currentZipcode &&
                            <div className={classes.currentProfileDiv}>
                                <div className={classes.currentProfile}>
                                    <FaUser size={40} style={{ marginRight: '20%' }}>
                                    </FaUser>
                                    {updatedUser.username}
                                </div>
                                <div className={classes.currentProfile}>
                                    <FaMapMarkedAlt size={50} style={{ marginRight: '1em' }}>
                                    </FaMapMarkedAlt>
                                    {updatedUser.zipcode}
                                    {/* {props.userSignedIn.currentUser.zipcode} */}
                                </div>
                            </div>
                        )
                        :
                        <form className={classes.editform}>
                            {!currentZipcode &&
                                <div>
                                    <TextField
                                        className={classes.editInput}
                                        id="standard-search"
                                        name="username"
                                        label="username"
                                        value= {updatedUser.username}
                                        // {props.userSignedIn.currentUser.username}
                                        onChange= {handleUpdateChange} />
                                        {/* {props.handleChange} */}
                                    <TextField
                                        className={classes.editInput}
                                        id="standard-search"
                                        name="zipcode"
                                        label="zipcode"
                                        value={updatedUser.zipcode}
                                        // {props.userSignedIn.currentUser.zipcode}
                                        onChange={props.handleChange} />
                                </div>
                            }
                        </form>
                    }

                    <Button
                        className={classes.editform}
                        variant="outlined"
                        color="primary"
                        onClick={currentBtn === 'EDIT' ? handleClick : updateUser}
                    >{currentBtn}
                    </Button>
                    <Button
                        className={classes.editform}
                        Button variant="outlined"
                        color="secondary"
                        onClick={props.deleteUser}>
                        Delete Account
                </Button>

                </Box>
            </Box>
        </div >
    )
}
export default Profile