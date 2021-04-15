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

function useFetch(url, opts) {
    const [response, setResponse] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        fetch(url, opts)
            .then((res) => {
                setResponse(res.data)
                setLoading(false)
            })
            .catch(() => {
                setHasError(true)
                setLoading(false)
            })
    }, [url])
    return [response, loading, hasError]
}

function App() {
    const [response, loading, hasError] = useFetch("api/data")
    return (
        <>
            {loading ? <div>Loading...</div> : (hasError ? <div>Error occured.</div> : (response.map(data => <div>{data}</div>)))}
        </>
    )
}



function ShowProfile() {
    const classes = useStyles();

    const [currentZipcode, setCurrentZipcode] = React.useState(true);

    const [state, setState] = React.useState({
        username: "citymeal",
        zipcode: "00000"
    })

    function handleChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    //add delete user function
    function handleClick() {
        console.log('delete account')
    }

    return (
        <div>
            <Box className={classes.profile}>
                {currentZipcode &&
                    <div className={classes.currentProfileDiv}>
                        <div className={classes.currentProfile}><label>username:</label>{state.username}</div>
                        <div className={classes.currentProfile}><label>zipcode:</label>{state.zipcode}</div>
                    </div>
                }


                {!currentZipcode &&
                    <form className={classes.editform}>
                        <TextField className={classes.editInput} id="standard-search" name="username" label="username" type="search" value={state.username} onChange={handleChange} />
                        <TextField className={classes.editInput} id="standard-search" name="zipcode" label="zip code" type="search" value={state.zipcode} onChange={handleChange} />
                    </form>
                }
                <Button className={classes.editform} variant="contained" color="primary" onClick={() => setCurrentZipcode(!currentZipcode)} >{currentZipcode ? 'edit' : 'submit'}</Button>
                <Button className={classes.editform} variant="outlined" color="primary" onClick={handleClick}>Delete Account</Button>

            </Box>
        </div>
    )
}

function Profile() {
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.msg} maxWidth="xl"><p className={classes.fontSize}>Profile</p></Box>
            <ShowProfile />
        </div>
    )
}


export default Profile;