

import { ListItem, Checkbox, Typography, Box, styled } from "@mui/material";
import { StarBorder, Star } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from "../services/api.urls";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

const Wrapper = styled(ListItem)`
   padding: 0 0 0 10px;
    background: #FFEEA9;
    cursor: pointer;
    transition: border-color 0.3s ease; /* Add transition for smooth effect */

    border-left: 1px solid rgba(0, 0, 0, 0.1); /* Light border effect on hover */
    border-top: 1px solid rgba(0, 0, 0, 0.1); /* Top border on hover */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* Bottom border on hover */
    
    & > div {
        display: flex;
        width: 100%;
    }

    & > div > p {
        font-size: 14px;
    }

    &:hover {
        border-left: 4px solid #FFBF78; /* Light border effect on hover */
        border-top: 1px solid rgba(0, 0, 0, 0.3); /* Top border on hover */
        border-bottom: 1px solid rgba(0, 0, 0, 0.3); /* Bottom border on hover */
    }
`;

const Indicator = styled(Typography)`
    font-size: 12px !important;
    background: #FF7D29;
    color: #222;
    border-radius: 4px;
    margin-right: 6px;
    padding: 0 4px;
`;

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
})

const Email = ({ email, setStarredEmail, selectedEmails, setSelectedEmails }) => {
    const toggleStarredEmailService = useApi(API_URLS.toggleStarredMails);

    const navigate = useNavigate();

    const toggleStarredEmail = () => {
        toggleStarredEmailService.call({ id: email._id, value: !email.starred });
        setStarredEmail(prevState => !prevState);
    }

    const handleChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
        } else {
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    }

    return (
        <Wrapper>
            <Checkbox
                size="small"
                checked={selectedEmails.includes(email._id)}
                onChange={() => handleChange()}
            />
            {
                email.starred ?
                    <Star fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredEmail()} />
                    :
                    <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredEmail()} />
            }
            <Box onClick={() => navigate(routes.view.path, { state: { email: email } })}>
                <Typography style={{ width: 200 }}>To:{email.to.split('@')[0]}</Typography>
                <Indicator>Inbox</Indicator>
                <Typography>{email.subject} {email.body && '-'} {email.body}</Typography>
                <Date>
                    {(new window.Date(email.date)).getDate()}&nbsp;
                    {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                </Date>
            </Box>
        </Wrapper>
    )
}

export default Email;