import React from "react";
import "./EmailDisplay.css";

const EmailDisplay = ({ email, mode }) => {
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

    return (
        <div className="email-display">
            <div className="email-from">
                {isView ? (
                    <p>
                        <span className="label-box">From:</span> 
                        <span className="field-text">{email.sender}</span>
                    </p>
                    ) : null
                }
            </div>

            <p>
                <div className="email-to">
                    <span className="label-box">To: </span> 
                    {isView ? (
                        <span className="field-text">{email.recipient}</span>
                        ) : (
                            <input
                                className="to-input"
                            />
                        )
                    }
                </div>
            </p>

            <div className="email-subject">
                {isView ? (
                        <h2>
                            {email.subject}
                        </h2>
                    ) : (
                            <input 
                                placeholder="Add subject"
                                className="subject-input"
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
                    />
                    ) : null
                }
            </div>
        </div>
    );
};

export default EmailDisplay;
