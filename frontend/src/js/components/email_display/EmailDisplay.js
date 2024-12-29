import React, { useState } from 'react';

import './EmailDisplay.css';

const EmailDisplay = () => {
    return (
        <div className="email-display">
            <h2>Email Subject</h2>
            <p><strong>From:</strong> sender@example.com</p>
            <p><strong>To:</strong> receiver@example.com</p>
            <p>This is the body of the email. You can add rich text formatting or embedded images here.</p>
        </div>
    );
};

export default EmailDisplay;
