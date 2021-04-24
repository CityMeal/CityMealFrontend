
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { FaUser } from 'react-icons/fa'
import { FaMapMarkedAlt } from 'react-icons/fa'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '3%',
        color: '#325288'
    },
    msg: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f4eee8',
        marginTop: '3%',
        marginLeft: '5%',
        marginRight: '5%',
        boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
        color: '#325288'
    },
    fontSize: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.7rem',
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
        paddingBottom: '3%',
        fontSize: '1.5rem'
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
    const classes = useStyles();

    const [currentZipcode, setCurrentZipcode] = React.useState('true')
    const [currentBtn, setCurrentBtn] = React.useState('EDIT')
    function handleClick(e) {
        console.log('I clicked Edit', e.target)
        setCurrentZipcode(!currentZipcode)
        setCurrentBtn('SUBMIT')

    }
    return (
        <div>
            <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Account Setting</p></Box>
            <div className={classes.root}>
                <Box className={classes.profile}>
                    {currentBtn === 'EDIT' ?
                        (currentZipcode &&
                            <div className={classes.currentProfileDiv}>
                                <div className={classes.currentProfile}>
                                    <FaUser size={40} style={{ marginRight: '20%' }}>
                                    </FaUser>
                                    {props.userSignedIn.currentUser.username}
                                </div>
                                <div className={classes.currentProfile}>
                                    <FaMapMarkedAlt size={50} style={{ marginRight: '1em' }}>
                                    </FaMapMarkedAlt>
                                    {props.userSignedIn.currentUser.zipcode}
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
                                        value={props.userSignedIn.currentUser.username}
                                        onChange={props.handleChange} />
                                    <TextField
                                        className={classes.editInput}
                                        id="standard-search"
                                        name="zipcode"
                                        label="zipcode"
                                        value={props.userSignedIn.currentUser.zipcode}
                                        onChange={props.handleChange} />
                                </div>
                            }
                        </form>
                    }

                    <Button
                        className={classes.editform}
                        variant="outlined"
                        color="primary"
                        onClick={currentBtn === 'EDIT' ? handleClick : props.updateUser}
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
            </div >
        </div >
    )
}
export default Profile