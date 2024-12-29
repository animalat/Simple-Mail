import React, { useState } from 'react';

import './EmailDisplay.css';

const EmailDisplay = ({ email, from }) => {
    return (
        <div className="email-display">
            {email.sender && <h2>{email.sender}</h2>}
            {from && (
                <p>
                    <strong>From:</strong> {from}
                </p>
            )}
            {email.sender && (
                <p>
                    <strong>To:</strong> {email.sender}
                </p>
            )}
            <p>{email.body ?? ''}</p>
        </div>
    );
};

export default EmailDisplay;
