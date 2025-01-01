import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './components/sidebar/Sidebar';
import EmailList from './components/email_list/EmailList';
import EmailDisplay from './components/email_display/EmailDisplay';

const App = () => {
    const [selectedEmail, setSelectedEmail] = useState({});
    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const [selectedGroup, setSelectedGroup] = useState("INBOX");
    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const emailAddress = "nakshayanapps@gmail.com";
    
    return (
        <div>
            <Sidebar 
                emailAddress={emailAddress}
                groupId={selectedGroup}
                onGroupClick={handleGroupClick}
            />
            <EmailDisplay 
                email={selectedEmail}
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
