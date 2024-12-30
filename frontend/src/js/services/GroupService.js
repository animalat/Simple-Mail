const getGroups = (emailAddress) => {
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

export default getGroups;