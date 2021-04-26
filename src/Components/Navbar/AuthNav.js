import React from 'react';
import styled from 'styled-components'
import { Button, Menu, MenuItem, List, ListItem, Tabs, Avatar } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { userNameBtnStyle, mobileStyle, dropDown, themes2, useMediaQuery, tabStyle } from './meulist'

function AuthNav(props) {

    const userNameBtnClass = userNameBtnStyle()
    const dropDownClass = dropDown()

    const mobile = mobileStyle()
    const desktop = tabStyle()

    const menuList = ['HOME', 'LIST', 'FAVORITES', 'PROFILE', 'SIGNOUT']

    const webMenu = useMediaQuery(themes2.breakpoints.up('laptop'))

    const [anchorEl, setAnchorEl] = React.useState(null)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    console.log(value, webMenu, !webMenu)

    return (
        <div >
            {!webMenu ?
                <div>

                    <Button className={userNameBtnClass.root} variant="square" onClick={handleClick}>{props.userSignedIn.currentUser.username}</Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                        {
                            menuList.map((option) => (
                                <Link className={dropDownClass.userDropdownLink} to={option === 'SIGNOUT' ? '/HOME' : option} key={`${option}label`}>
                                    <MenuItem className={dropDownClass.userDropdown} onClick={option === 'SIGNOUT' ? props.logout : handleClose} >{option}</MenuItem>
                                </Link>
                            ))
                        }
                    </Menu>
                </div>
                :
                <div>
                    <Tabs indicatorColor="#325288" variant="fullwidth" value={value} onChange={handleChange} className={desktop.root}>
                        {
                            menuList.map((option, index) => (
                                <Link to={option === 'SIGNOUT' ? '/HOME' : option} className={desktop.list} key={`${option}label`}>
                                    {/* <div>{option}</div> */}
                                    <Tab onClick={option === 'SIGNOUT' ? props.logout : null} label={option} value={index} {...a11yProps(index)} className="MuiTabs-flexContainer" >{option}</Tab>
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