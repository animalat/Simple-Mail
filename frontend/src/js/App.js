import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Sidebar from './components/sidebar/Sidebar';
import EmailList from './components/email_list/EmailList';
import EmailDisplay from './components/email_display/EmailDisplay';

const App = () => {
    return (
        <div>
            <Sidebar />
            <EmailDisplay />
            <EmailList />
        </div>
    );
};

export default App;
