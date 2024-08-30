import React from 'react';

export default function App() {
    return (
        <>
            <h1>Hello!</h1>
            <button onClick={() => {
                electron.notificationAPI.sendNotification('My custom notification!');
            }}>Click me!</button>
        </>
    );
}