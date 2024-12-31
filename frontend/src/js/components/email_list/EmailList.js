import React, { useState, useEffect } from 'react';
import './EmailList.css';
import getEmails from '../../services/EmailService';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isSameDay = date.toDateString() === now.toDateString();
    const isWithinThreeDays = (now - date) / (1000 * 60 * 60 * 24) <= 3 && date < now;
    const isWithinLastMonth = (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) ||
                              (now.getMonth() === date.getMonth() + 1 && now.getFullYear() === date.getFullYear());

    if (isSameDay) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isWithinThreeDays) {
        return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isWithinLastMonth) {
        return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    }
};

const isInGroup = (email, groupId) => {
    return email.groups.some(group => group.group_id == groupId);
}

const DisplayNewEmail = ({ email, onEmailClick, isSelected }) => {
    return (
       <div 
            className={`email-entry ${isSelected ? 'selected' : ''} ${isInGroup(email, 'UNREAD') ? 'unread' : ''}`}
            onClick={() => { onEmailClick(email); }}
        >
            <div className="email-details">
                <div className="email-sender">{email.sender}</div>
                <div className="email-subject">{email.subject}</div>
                <div className="email-body-preview">{email.body.slice(0, 50)}...</div>
            </div>
            <div className="email-time">{formatDate(email.time_sent)}</div>
       </div> 
    );
};

const EmailList = ({ emailAddress, groupId, onEmailClick }) => {
    const [emails, setEmails] = useState([]);
    useEffect(() => {
        getEmails(emailAddress, groupId).then((data) => setEmails(data));
    }, [emailAddress, groupId]);
    
    console.log(emails);
    const [selectedEmailId, setSelectedEmailId] = useState(null);

    const handleEmailClick = (email) => {
        onEmailClick(email);
        setSelectedEmailId(email.id);
    };

    
    return (
        <div className="email-list">
            {emails.map((email, index) => (
                <DisplayNewEmail 
                    key={index} 
                    email={email}
                    onEmailClick={handleEmailClick}
                    isSelected={selectedEmailId === email.id}
                />
            ))}
        </div>
    );
};

export default EmailList;
