import React, { useState } from 'react';

import './EmailList.css';

const DisplayNewEmail = ({ email }) => {
    const emailClick = (emailId) => {
        // TODO: handle opening email...
        console.log(emailId);
    };

    return (
       <div 
            className="email-entry"
            onClick={() => { emailClick("EMAIL CLICKED"); }}
        >
            <div className="email-details">
                <div className="email-sender">{email.sender}</div>
                <div className="email-subject">{email.subject}</div>
                <div className="email-body-preview">{email.body.slice(0, 50)}...</div>
            </div>
            <div className="email-time">{new Date(email.time_sent).toLocaleString()}</div>
       </div> 
    );
};

const WhiteUnderlay = () => {
    return (
        <div className="white-underlay"></div>
    );
};

const EmailList = () => {
    const [emails, setEmails] = useState([
        {
            sender: "Name1@example.com",
            subject: "Meeting Reminder",
            body: "Don't forget about the meeting tomorrow at 10 AM.",
            time_sent: "2024-12-26 10:45:00",
        },
        {
            sender: "Jane Smith",
            subject: "Holiday Greetings",
            body: "Wishing you a joyful holiday season and a happy New Year!",
            time_sent: "2024-12-25 09:30:00",
        },
        {
            sender: "John Doe",
            subject: "Meeting Reminder",
            body: "Don't forget about the meeting tomorrow at 10 AM.",
            time_sent: "2024-12-26 10:45:00",
        },
        {
            sender: "Jane Smith",
            subject: "Holiday Greetings",
            body: "Wishing you a joyful holiday season and a happy New Year!",
            time_sent: "2024-12-25 09:30:00",
        },
        {
            sender: "John Doe",
            subject: "Meeting Reminder",
            body: "Don't forget about the meeting tomorrow at 10 AM.",
            time_sent: "2024-12-26 10:45:00",
        },
        {
            sender: "Jane Smith",
            subject: "Holiday Greetings",
            body: "Wishing you a joyful holiday season and a happy New Year!",
            time_sent: "2024-12-25 09:30:00",
        },
        {
            sender: "John Doe",
            subject: "Meeting Reminder",
            body: "Don't forget about the meeting tomorrow at 10 AM.",
            time_sent: "2024-12-26 10:45:00",
        },
        {
            sender: "Jane Smith",
            subject: "Holiday Greetings",
            body: "Wishing you a joyful holiday season and a happy New Year!",
            time_sent: "2024-12-25 09:30:00",
        },
        {
            sender: "John Doe",
            subject: "Meeting Reminder",
            body: "Don't forget about the meeting tomorrow at 10 AM.",
            time_sent: "2024-12-26 10:45:00",
        },
        {
            sender: "Jane Smith",
            subject: "Holiday Greetings",
            body: "Wishing you a joyful holiday season and a happy New Year!",
            time_sent: "2024-12-25 09:30:00",
        },
        {
            sender: "John Doe",
            subject: "Meeting Reminder",
            body: "Don't forget about the meeting tomorrow at 10 AM.",
            time_sent: "2024-12-26 10:45:00",
        },
        {
            sender: "Jane Smith",
            subject: "Holiday Greetings",
            body: "Wishing you a joyful holiday season and a happy New Year!",
            time_sent: "2024-12-25 09:30:00",
        },
    ]);

    
    return (
        <div>
            <div className="email-list">
                {emails.map((email, index) => (
                    <DisplayNewEmail 
                        key={index} 
                        email={email}
                    />
                ))}
            </div>
            <WhiteUnderlay />
        </div>
    );
};

export default EmailList;
