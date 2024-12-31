import React from "react";
import "./EmailDisplay.css";

const EmailDisplay = ({ email }) => {
    const renderHtmlContent = () => {
        if (!email.html_content) return null;

        return (
            <div
                className="email-html-content"
                dangerouslySetInnerHTML={{ __html: email.html_content }}
            />
        );
    };

    const renderAttachments = () => {
        if (!email.attachments || email.attachments.length === 0) return null;

        return (
            <div className="email-attachments">
                <h3>Attachments:</h3>
                <ul>
                    {email.attachments.map((attachment, index) => (
                        <li key={index}>
                            <a
                                href={`data:application/octet-stream;base64,${attachment.content}`}
                                download={attachment.filename}
                            >
                                {attachment.filename}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderInlineImages = () => {
        if (!email.inline_images || email.inline_images.length === 0) return null;

        return (
            <div className="email-inline-images">
                {email.inline_images.map((image, index) => (
                    <img
                        key={index}
                        src={`data:image/png;base64,${image.content}`}
                        alt={`Inline Image ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="email-display">
            <h2>{email.subject}</h2>
            <p>
                <strong>From:</strong> {email.sender}
            </p>
            <p>
                <strong>To:</strong> {email.recipient}
            </p>
            <p>
                <strong>Sent:</strong>{" "}
                {new Date(email.time_sent).toLocaleTimeString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric', year: 'numeric' })}
            </p>
            {renderHtmlContent()}
            {renderAttachments()}
            {renderInlineImages()}
        </div>
    );
};

export default EmailDisplay;
