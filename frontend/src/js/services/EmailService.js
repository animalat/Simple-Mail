const emailAddress = "nakshayanapps@gmail.com";

fetch(`http://localhost:8000/mailing/emails/?email_address=${emailAddress}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Emails:", data);
  })
  .catch((error) => {
    console.error("Error fetching emails:", error);
  });
