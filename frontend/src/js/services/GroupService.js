export const getGroups = (emailAddress) => {
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

export const removeGroupFromEmail = (emailAddress, groupId, messageId) => {
    console.log(emailAddress, groupId, messageId)
    return fetch(`http://localhost:8000/mailing/remove-group/?email_address=${emailAddress}&group=${groupId}&email=${messageId}`)
        .then((response) => response.json())
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.error("Error removing group:", error);
            return false;
        });
}
