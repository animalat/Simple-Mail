const getEmails = (emailAddress, groupId) => {
  return fetch(`http://localhost:8000/mailing/emails/?email_address=${emailAddress}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching emails:", error);
      return [];
    });
}

export default getEmails;
