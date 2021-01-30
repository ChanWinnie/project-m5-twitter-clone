import React from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { NavLink } from "react-router-dom";
import { styling } from "../GlobalStyles";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

const Sidebar = () => {
    const { status, currentUser } = React.useContext(CurrentUserContext);

    return (
        <SideBar tabIndex="-1">
            <CatLogo>
                <Logo />
            </CatLogo> 
            <Nav> 
                <div>
                    <SideBarLink 
                    to="/" exact 
                    tabIndex="0" 
                    aria-label="Homepage"> 
                        <span><FiHome size={20}/></span>Home         
                    </SideBarLink>
                </div> 
                {status === "idle" && 
                <div>
                    <SideBarLink 
                    to={`/${currentUser.handle}`} exact  
                    tabIndex="0" 
                    aria-label="Profile">
                        <span><FiUser size={20}/></span>Profile
                    </SideBarLink>  
                </div> }
                <div>
                    <SideBarLink 
                    to="/notifications" exact  
                    tabIndex="0" 
                    aria-label="Notifications">                 
                            <span><FiBell size={20}/></span>Notifications
                    </SideBarLink >
                </div>
                <div>
                    <SideBarLink 
                    to="/bookmarks" 
                    exact  
                    tabIndex="0"
                    aria-label="Bookmarks">
                        <span><FiBookmark size={20}/></span> Bookmarks
                    </SideBarLink> 
                </div>
            </Nav>    
        </SideBar>
    )
};

const SideBar = styled.div`
    margin-left: 125px;
    border-right: ${styling.border};
    padding: 25px;
    min-height: 100vh;
`;

const CatLogo = styled.div`
    margin-left: 10px;
`;

const Nav = styled.nav`
    margin: 10px;
`;

const SideBarLink = styled(NavLink)`
    display: inline-flex;
    margin-bottom: 10px;
    padding: 10px 15px;
    color: black;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    border: none;
    border-radius: 35px;

    & span {
        margin-right: 15px;
    } 

    &:hover {
        color: ${styling.violet};
        background-color: ${styling.lavender};
    }

    &.active {
        color: ${styling.violet};
    }
    
    &:focus{
      outline: ${styling.focusOutline};;
    }
`;

export default Sidebar;