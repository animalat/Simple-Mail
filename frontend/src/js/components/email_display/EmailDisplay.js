import React, { useState } from "react";
import { sendEmail } from "../../services/EmailService";
import "./EmailDisplay.css";

const EmailDisplay = ({ email, mode, signedInEmail, setViewMode }) => {
    const isView = (mode === "view");

    // don't display box if no email
    if (!email.html_content && isView) return null;

    const renderHtmlContent = () => {
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

    const [sendRecipient, setSendRecipient] = useState("");
    const [sendSubject, setSendSubject] = useState("");
    const [sendBody, setSendBody] = useState("");

    const handleSubmit = () => {
        try {
            sendEmail(signedInEmail, sendRecipient, sendSubject, sendBody);
            setSendRecipient("");
            setSendSubject("");
            setSendSubject("");
            setViewMode();
        } catch {
            return;
        }
    };

    return (
        <div className="email-display">
            <div className="email-from">
                <p>
                    {!isView ? ( 
                        <button 
                            className="send-button"
                            onClick={ () => handleSubmit() }
                        >
                            <i className="fa-regular fa-paper-plane"></i>
                            &nbsp;Send&nbsp;
                        </button>
                        ) : null}
                    <span className="label-box">&nbsp;From:</span> 
                    <span className="field-text">{isView ? email.sender : signedInEmail}</span>
                </p>
            </div>

            <div className="email-to">
                <p>
                    <span className="label-box">To: </span> 
                    {isView ? (
                        <span className="field-text">{email.recipient}</span>
                        ) : (
                            <input
                                className="to-input"
                                value={sendRecipient}
                                onChange={(e) => setSendRecipient(e.target.value)}
                            />
                        )
                    }
                </p>
            </div>

            <div className="email-subject">
                {isView ? (
                        <h2>
                            {email.subject}
                        </h2>
                    ) : (
                            <input 
                                placeholder="Add subject"
                                className="subject-input"
                                value={sendSubject}
                                onChange={(e) => setSendSubject(e.target.value)}
                            />
                    )
                }
            </div>
            
            <div className="email-date">
                {isView ? (
                    <p>
                        <span className="label-box">Sent:</span> 
                        <span className="field-text">
                            {new Date(email.time_sent).toLocaleTimeString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric', year: 'numeric' })}
                        </span>
                    </p>
                    ) : null
                }
            </div>

            <div className="email-body">
                {isView ? renderHtmlContent() : null}
                {isView ? renderAttachments() : null}
                {isView ? renderInlineImages() : null}
                {!isView ? (
                    <textarea 
                        placeholder="Write your email here"
                        className="email-body-textarea"
                        value={sendBody}
                        onChange={(e) => setSendBody(e.target.value)}
                    />
                    ) : null
                }
            </div>
        </div>
    );
};

export default EmailDisplay;
