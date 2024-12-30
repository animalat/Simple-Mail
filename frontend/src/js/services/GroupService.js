const emailAddress = "";

fetch(`http://localhost:8000/mailing/groups/?email_address=${emailAddress}`)
    .then((response) => response.json())
    .then((data) => {
        console.log("Groups:", data);
    })
        .catch((error) => {
        console.error("Error fetching groups:", error);
    });
