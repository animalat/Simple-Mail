import { authenticateUser } from "./Authenticate";

export const getGroups = (emailAddress) => {
    authenticateUser(emailAddress);
    return fetch(`http://localhost:8000/mailing/groups/?email_address=${emailAddress}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error fetching groups:", error);
            return [];
        });
};

export const removeGroupFromEmail = (emailAddress, groupId, emailId) => {
    authenticateUser(emailAddress);
    return fetch('http://localhost:8000/mailing/remove-group/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: emailAddress,
            group: groupId,
            email: emailId,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    console.error('Error:', data.error);
                    return false;
                });
            }
            return response.json().then((data) => {
                console.log('Success:', data.message);
                return true;
            });
        })
        .catch((error) => {
            console.error('Request failed:', error);
            return false;
        });
};
