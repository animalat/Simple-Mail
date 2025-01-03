import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './components/sidebar/Sidebar';
import EmailList from './components/email_list/EmailList';
import EmailDisplay from './components/email_display/EmailDisplay';

const App = () => {
    const [emailDisplayState, setEmailDisplayState] = useState("draft");
    const setViewMode = () => {
        setEmailDisplayState("view");
        setSelectedEmail({});
    };
    const setDraftMode = () => {
        setEmailDisplayState("draft");
    }
    
    const [selectedEmail, setSelectedEmail] = useState({});
    const handleEmailClick = (email) => {
        setViewMode();
        setSelectedEmail(email);
    };

    const [selectedGroup, setSelectedGroup] = useState("INBOX");
    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const emailAddress = "";
    
    return (
        <div>
            <Sidebar 
                emailAddress={emailAddress}
                groupId={selectedGroup}
                onGroupClick={handleGroupClick}
            />
            <EmailDisplay 
                email={selectedEmail}
                mode={emailDisplayState}
                signedInEmail={emailAddress}
            />
            <EmailList 
                emailAddress={emailAddress}
                groupId={selectedGroup}
                onEmailClick={handleEmailClick} 
            />
        </div>
    );
};

export default App;
