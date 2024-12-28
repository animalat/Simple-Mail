import React, { useState } from 'react';

import './EmailList.css';

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
        return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    }
};

const DisplayNewEmail = ({ email }) => {
    const emailClick = (emailId) => {
        // TODO: handle opening email...
        console.log(emailId);
    };

    return (
       <div 
            className="email-entry"
            onClick={() => { emailClick("EMAIL CLICKED"); }}
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

const WhiteUnderlay = () => {
    return (
        <div className="white-underlay"></div>
    );
};

const EmailList = () => {
    const [emails, setEmails] = useState([
        {
            sender: "alice@example.com",
            subject: "Project Update",
            body: "The project has been progressing well. Let's discuss further in tomorrow's meeting.",
            time_sent: "2024-12-26 15:30:00",
        },
        {
            sender: "bob@example.com",
            subject: "Invoice Reminder",
            body: "This is a reminder to review the attached invoice for the past month.",
            time_sent: "2024-12-24 08:15:00",
        },
        {
            sender: "marketing@shoponline.com",
            subject: "Holiday Sale!",
            body: "Enjoy up to 50% off on selected items during our holiday sale.",
            time_sent: "2024-12-22 12:45:00",
        },
        {
            sender: "jane.smith@example.com",
            subject: "Happy Holidays!",
            body: "Wishing you a wonderful holiday season filled with joy and laughter.",
            time_sent: "2024-12-20 17:00:00",
        },
        {
            sender: "notifications@banking.com",
            subject: "Account Statement Available",
            body: "Your monthly account statement is now available for viewing.",
            time_sent: "2024-11-15 10:00:00",
        },
        {
            sender: "hr@company.com",
            subject: "Performance Review",
            body: "Your performance review is scheduled for next week. Please confirm your availability.",
            time_sent: "2024-12-26 13:20:00",
        },
        {
            sender: "team@projectmanagement.com",
            subject: "Task Deadline Reminder",
            body: "Please ensure your assigned tasks are completed by Friday.",
            time_sent: "2024-12-25 11:15:00",
        },
        {
            sender: "no-reply@eventbrite.com",
            subject: "Event Confirmation",
            body: "Your registration for the 'Tech Innovators Summit' is confirmed.",
            time_sent: "2024-12-24 09:00:00",
        },
        {
            sender: "support@onlineservice.com",
            subject: "Password Reset",
            body: "Click the link below to reset your password.",
            time_sent: "2024-12-23 19:30:00",
        },
        {
            sender: "family@groupchat.com",
            subject: "Holiday Plans",
            body: "Let’s finalize the schedule for the holiday dinner.",
            time_sent: "2024-12-22 14:50:00",
        },
        {
            sender: "newsletter@fitnessclub.com",
            subject: "5 Tips to Stay Fit During Holidays",
            body: "Check out our latest tips to maintain your fitness routine during the festive season.",
            time_sent: "2024-12-21 07:45:00",
        },
        {
            sender: "professor.jones@university.edu",
            subject: "Assignment Feedback",
            body: "Your feedback for the latest assignment has been posted. Please review it.",
            time_sent: "2024-12-20 16:10:00",
        },
        {
            sender: "sales@electronicsstore.com",
            subject: "Your Order Has Shipped",
            body: "Your order #12345 has been shipped and is on its way.",
            time_sent: "2024-12-18 10:30:00",
        },
        {
            sender: "reminders@calendar.com",
            subject: "Upcoming Appointment",
            body: "You have an appointment scheduled on 2024-12-27 at 3:00 PM.",
            time_sent: "2024-12-26 08:20:00",
        },
        {
            sender: "noreply@streamingservice.com",
            subject: "New Episodes Available",
            body: "Season 3 of your favorite show is now available to stream.",
            time_sent: "2024-12-19 23:15:00",
        },
        {
            sender: "example@outlook.com",
            subject: "Hello welcome to example",
            body: "Thank you for using example.",
            time_sent: "2024-12-28 06:15:00",
        },
        {
            sender: "example@yahoo.com",
            subject: "Regarding last week's meeting",
            body: "Please see the new schedule proposed during the meeting.",
            time_sent: "2023-12-25 07:20:00",
        }
    ].sort((a, b) => new Date(b.time_sent) - new Date(a.time_sent)));

    
    return (
        <div>
            <div className="email-list">
                {emails.map((email, index) => (
                    <DisplayNewEmail 
                        key={index} 
                        email={email}
                    />
                ))}
            </div>
            <WhiteUnderlay />
        </div>
    );
};

export default EmailList;
