export default {
  GENERIC_TEXT: "An unexpected error occurred.",
  admin: {
    INVALID_LOGIN: "Incorrect email or password.",
    INVALID_TOKEN: "The current token is expired or invalid.",
    USER_EXISTS: "A user with this email already exists.",
    INVALID_EMAIL_FOR_PASSWORD_RECOVERY:
      "This email is not associated with a user account."
  },
  nonprofit: {
    INVALID_ID:
      "A nonprofit with the provided ID does not exist in our database.",
    DONATION_LOG_FAILURE: "Unable to log donation for the nonprofit.",
    NO_DATA: "The database does not contain any nonprofits."
  },
  event: {
    INVALID_ID: "An event with the provided ID does not exist in our database."
  },
  user: {
    INVALID_ID: "A user with the provided ID does not exist in our database."
  }
};
