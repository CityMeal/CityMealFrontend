
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
        marginBottom: '3%',
        color: '#325288'
    },
    msg: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F9CF00',
        marginTop: '3%',
        marginLeft: '5%',
        marginRight: '5%',
        boxShadow: (2 + 'px ' + 3 + 'px ' + 3 + 'px ' + 2 + 'px ' + ' lightgrey'),
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
    label: {
        fontSize: '1rem',
        marginRight: '10%',
        paddingLeft: '3%',
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
    console.log(updatedUser)
    props.giveUpdatedUser(updatedData)

    // fetch(`${BASE_URL}/user`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userSignedIn.token}`,
    //   },
    //   body: JSON.stringify({
    //     username: userSignedIn.currentUser.username,
    //     zipcode: userSignedIn.currentUser.zipcode,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setUserSignedIn((prevState) => ({
    //       ...prevState,
    //       currentUser: data.user,
    //     }));
    //     console.log(data.user);
    //     localStorage.removeItem("user");
    //     localStorage.setItem("user", JSON.stringify(data.user));
    //     history.push("/PROFILE");
    //   })
    //   .catch((err) => console.log(err));
    // history.push("/HOME");
    // console.log(localStorage.getItem("user"));
    // console.log(userSignedIn.currentUser);
};

    return (
        <div>
            <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Profile</p></Box>
            <div className={classes.root}>
                <Box className={classes.profile}>
                    {currentBtn === 'EDIT' ?
                        (currentZipcode &&
                            <div className={classes.currentProfileDiv}>
                                <div className={classes.currentProfile}>
                                    <FaUser size={50} style={{ marginRight: '20%' }}>
                                        <label className={classes.label}>username:</label>
                                    </FaUser>
                                    {updatedUser.username}
                                    {/* {props.userSignedIn.currentUser.username} */}
                                </div>
                                <div className={classes.currentProfile}>
                                    <FaMapMarkedAlt size={50}>
                                        <label className={classes.label}>zipcode:</label>
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
                        variant="contained"
                        color="primary"
                        onClick={currentBtn === 'EDIT' ? handleClick : updateUser}
                    >{currentBtn}
                    </Button>
                    <Button
                        className={classes.editform}
                        variant="outlined"
                        color="primary"
                        onClick={props.deleteUser}>
                        Delete Account
                </Button>

                </Box>
            </div >
        </div>
    )
}
export default Profile