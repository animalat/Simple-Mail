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
            <span>{email["subject"]}</span>
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
        {"subject": "subject1"},
        {"subject": "subject2"},
        {"subject": "subject3"},
        {"subject": "subject4"}
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