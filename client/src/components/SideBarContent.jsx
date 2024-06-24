import { useState } from 'react';
import { Button, List, ListItem, Box, styled } from '@mui/material';
import ComposeMail from './ComposeMail';
import { SIDEBAR_DATA } from '../config/sidebar.config';
import { CreateOutlined } from '@mui/icons-material';
import { NavLink, useParams } from 'react-router-dom';
import { routes } from '../routes/routes';

const Container = styled(Box)`
    padding: 8px;
    & > ul {
        padding: 10px 0 0 5px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        & > a {
            text-decoration: none;
            color: inherit;
        }
        & > a > li > svg {
            margin-right: 20px;
        }
    }
`

const ComposeButton = styled(Button)`
    background: #FFBF78;
    color: #001d35;
    border-radius: 10px;
    padding: 15px;
    min-width: 140px;
    text-transform: none;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Shadow applied */

    &:hover {
        background-color: #FF7D29;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
    }
`

const SideBarContent = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const { type } = useParams();

    const onComposeClick = () => {
        setOpenDrawer(true);
    }

    return (
        <Container>
            <ComposeButton onClick={() => onComposeClick()}>
                <CreateOutlined style={{ marginRight: 10 }} />Compose
            </ComposeButton>
            <List>
                {
                    SIDEBAR_DATA.map(data => (
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                            <ListItem style={type === data.name.toLowerCase() ? {
                                backgroundColor: '#FFBF78',
                                borderRadius: '5px 5px 5px 5px'
                            } : {}}><data.icon fontSize="small" />{data.title}</ListItem>
                        </NavLink>
                    ))
                }
            </List>
            <ComposeMail open={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Container>
    )
}

export default SideBarContent;