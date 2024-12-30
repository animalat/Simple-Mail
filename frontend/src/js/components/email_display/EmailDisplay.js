import React, { useState } from 'react';
import './EmailDisplay.css';

const EmailDisplay = ({ email }) => {
    return (
        <div className="email-display">
            {email.subject && <h2>{email.subject}</h2>}
            {email.sender && (
                <p>
                    <strong>From:</strong> {email.sender}
                </p>
            )}
            {email.sender && (
                <p>
                    <strong>To:</strong> {email.recipient}
                </p>
            )}
            <p>{email.body ?? ''}</p>
        </div>
    );
};

export default EmailDisplay;
