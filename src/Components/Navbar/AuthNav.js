import React from 'react';
import styled from 'styled-components'
import { Button, Menu, MenuItem, List, ListItem, Tabs ,Avatar} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import {mobileStyle, themes2, useMediaQuery, tabStyle} from './meulist'
import { PersonPinSharp } from '@material-ui/icons';

function AuthNav(props){
    const mobile = mobileStyle()
    const desktop = tabStyle()

    const menuList = ['HOME', 'LIST', 'FAVORITES', 'PROFILE', 'SIGN OUT']

    const webMenu = useMediaQuery(themes2.breakpoints.up('laptop'))

    const [anchorEl, setAnchorEl] = React.useState(null)
    
    const [value, setValue] = React.useState(0);


   const handleClick = (event) => {
       setAnchorEl(event.currentTarget)
   }

    const handleClose = () => {
        setAnchorEl(null)

    };

    const handleChange = (event, newValue) => {
        console.log(event.currentTarget)
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }
      
    console.log(value)

    return (
        <div >
            {!webMenu ?
            <div>
                <Avatar  className={mobile.name} variant = "square" onClick={handleClick}>{props.userSignedIn.currentUser.username}I</Avatar>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                {
                    menuList.map((option) => (
                        <Link to={option === 'SIGN OUT' ? '/HOME' : option} className={mobile.link} key={`${option}label`}>
                            <MenuItem onClick={option === 'SIGN OUT' ? props.logout : handleClose} >{option}</MenuItem>
                        </Link>
                    ))
                }
            </Menu>
            </div>
            : 
            <div>
                <Tabs variant= "fullWidth" value={value} onChange={handleChange} className={desktop.root}>
                {
                    menuList.map((option, index) => (
                        <Link to={option === 'SIGN OUT' ? '/HOME' : `/${option}`} className={desktop.list} key={`${option}label`} >
                            <Tab  onClick={option === 'SIGN OUT' ? props.logout : null}label={option} {...a11yProps(index)} className ="MuiTabs-flexContainer" >{option}</Tab>
                        </Link>
                    ))
                }
            </Tabs>
            </div>
            }
        </div>
        
    )

}

export default AuthNav;