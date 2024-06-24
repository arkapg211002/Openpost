import { useState } from 'react';

import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material';
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = {
    height: '60%',
    width: '70%',
    maxWidth: '70%',
    maxHeight: '80%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
}

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #FFBF78;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #FFBF78;
    color: #222;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow */
    transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Add transitions */

    &:hover {
        background-color: #FF7D29; /* Change background color on hover */
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3); /* Adjust shadow on hover */
    }
`

const ComposeMail = ({ open, setOpenDrawer }) => {
    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config = {
        Username: process.env.REACT_APP_USERNAME,
        Password: process.env.REACT_APP_PASSWORD,
        Host: 'smtp.elasticemail.com',
        Port: 2525,
    }

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendEmail = async (e) => {
        e.preventDefault();

        if (window.Email) {
            window.Email.send({
                ...config,
                To: data.to,
                From: "arkapratimghosh2002@gmail.com",
                Subject: data.subject,
                Body: data.body
            }).then(
                message => alert("Email Sent", message)
            );
        }

        const payload = {
            to: data.to,
            from: "arkapratimghosh2002@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Arkapratim Ghosh',
            starred: false,
            type: 'sent'
        }

        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDrawer(false);
            setData({});
        } else {

        }
    }

    const closeComposeMail = (e) => {
        e.preventDefault();

        const payload = {
            to: data.to,
            from: "arkapratimghosh2002@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Arkapratim Ghosh',
            starred: false,
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDrawer(false);
            setData({});
        } else {

        }
    }

    return (
        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header>
            <RecipientWrapper>
                <InputBase placeholder='To' name="to" onChange={(e) => onValueChange(e)} value={data.to} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </RecipientWrapper>
            <TextField
                multiline
                rows={20}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body}
            />
            <Footer>
                <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;