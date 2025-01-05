import { authenticateUser } from "./Authenticate";

export const getEmails = (emailAddress, groupId) => {
    authenticateUser(emailAddress);
    return fetch(`http://localhost:8000/mailing/emails/?email_address=${emailAddress}&group=${groupId}`)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error("Error fetching emails:", error);
        return [];
    });
}

export const sendEmail = (emailAddress, recipient, subject, body, attachment = null) => {
    authenticateUser(emailAddress);
    const formData = new FormData();
    formData.append("email_address", emailAddress);
    formData.append("recipient", recipient);
    formData.append("subject", subject);
    formData.append("body", body);
    if (attachment) {
        formData.append("attachment", attachment);
    }

    return fetch('http://localhost:8000/mailing/send-email/', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    console.error('Error:', data.error);
                    throw new Error(data.error);
                });
            }
            return response.json().then((data) => {
                console.log('Success:', data.message);
                return data;
            });
        })
        .catch((error) => {
            console.error('Request failed:', error);
            throw error;
        });
};
