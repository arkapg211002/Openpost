import React, { useState } from 'react';
import { AppBar, Toolbar, Box, InputBase, styled } from '@mui/material';
import {
    Menu as MenuIcon, Tune, Search
} from '@mui/icons-material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import { openpost } from '../constants/constant';

const StyledAppBar = styled(AppBar)`
    background: #FEFFD2;
    box-shadow: none;
`;

const SearchWrapper = styled(Box)`
    background: #FFEEA9;
    margin-left: 80px;
    border-radius: 8px;
    min-width: 690px;
    max-width: 720px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow here */
    transition: border 0.3s ease; /* Add smooth transition for border */
    
    & > div {
        width: 100%;
    }

    &:hover {
        border: 2px solid #000000; /* Add border on hover */
    }
`;

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;

    & > a {
        color: inherit;
        transition: box-shadow 0.3s ease, transform 0.3s ease;
        display: inline-flex; /* Use inline-flex to make border-radius apply correctly */
        align-items: center; /* Align icon vertically */
        padding: 10px;
        border-radius: 50%; /* Make the icon circular */
        overflow: hidden; /* Ensure overflow is hidden */
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Shadow applied */
    }

    & > a:hover {
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
        transform: translateY(-2px);
        background: #FFEEA9;
    }
`;

const Header = ({ toggleDrawer }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuClicked, setMenuClicked] = useState(false);

    const handleMenuClick = () => {
        setMenuClicked(!isMenuClicked); // Toggle the menu click state
        toggleDrawer(); // Trigger the drawer toggle action
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Perform the search action, e.g., redirect to a search page or display results
            console.log('Search query:', searchQuery);
            // You can replace the console.log with your search logic
        }
    };

    return (
        <StyledAppBar position="static">
            <Toolbar>
                {isMenuClicked ? (
                    <Tune color="primary" onClick={handleMenuClick} sx={{ cursor: 'pointer', transition: 'color 0.3s ease' }} />
                ) : (
                    <MenuIcon color="action" onClick={handleMenuClick} sx={{ cursor: 'pointer', transition: 'color 0.3s ease' }} />
                )}
                <img src={openpost} alt="logo" style={{ width: 110, marginLeft: 15 }} />
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search..."
                    />
                    <Tune color="action" />
                </SearchWrapper>

                <OptionsWrapper>
                    <a href="mailto:arkapratimghosh2002@gmail.com" target="_blank" rel="noopener noreferrer">
                        <EmailIcon color="action" />
                    </a>
                    <a href="https://www.linkedin.com/in/arkapratim-ghosh21102002/" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon color="action" />
                    </a>
                    <a href="https://github.com/arkapg211002" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon color="action" />
                    </a>
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;
