import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Sidebar from './Sidebar';

export default function App() {
    return (
        <div>
            <Sidebar />
        </div>
    );
}

/*
            <button onClick={() => {
                electron.notificationAPI.sendNotification('My custom notification!');
            }}>Click me!</button>
*/