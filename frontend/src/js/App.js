import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Sidebar from './components/sidebar/Sidebar';
import EmailList from './components/email_list/EmailList'

const App = () => {
    return (
        <div>
            <Sidebar />
            <EmailList />
        </div>
    );
};

export default App;

/*
            <button onClick={() => {
                electron.notificationAPI.sendNotification('My custom notification!');
            }}>Click me!</button>
*/