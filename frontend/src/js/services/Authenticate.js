const checkAuthAndGetAuthURL = (emailAddress) => {
    return fetch(`http://localhost:8000/mailing/get-auth-link/?email_address=${emailAddress}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.authenticated) {
                console.log("Already authenticated");
                return { authenticated: true };
            } else {
                console.log("Redirecting to authentication URL");
                return { authenticated: false, auth_url: data.auth_url };
            }
        })
        .catch((error) => {
            console.error("Error checking authentication:", error);
            throw error;
        });
};

export const authenticateUser = (emailAddress) => {
    if (emailAddress === "") {
        return;
    }
    checkAuthAndGetAuthURL(emailAddress)
        .then((response) => {
            if (!response.authenticated) {
                // open Google OAuth page in a new tab
                window.open(response.auth_url, "_blank");
            } else {
                console.log("User is already authenticated");
            }
        })
        .catch((error) => {
            console.error("Error during authentication:", error);
        });
};
