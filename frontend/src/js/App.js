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

    return (
        <div>
            <Sidebar />
            <EmailDisplay 
                email={ selectedEmail } 
                from={ 'default' }
            />
            <EmailList onEmailClick={handleEmailClick} />
        </div>
    );
};

export default App;
