import { AuthError } from "@supabase/auth-js";

const AUTH_ERROR_MESSAGE_MAP: Record<string, string> = {
  email_exists: "This email is already in use.",
  phone_exists: "This phone number is already in use.",
  invalid_credentials: "The email or password is incorrect.",
  user_not_found: "The user could not be found.",
  session_expired: "Your session has expired. Please log in again.",
  email_not_confirmed: "Email verification is required.",
  phone_not_confirmed: "Phone number verification is required.",
  weak_password: "The password is too weak.",
  signup_disabled: "Sign-up is currently unavailable.",
  user_already_exists: "The user is already registered.",
  captcha_failed: "Security verification failed. Please try again.",
  over_email_send_rate_limit:
    "You have exceeded the email sending limit. Please try again later.",
  over_sms_send_rate_limit:
    "You have exceeded the SMS sending limit. Please try again later.",
  otp_expired: "The OTP code has expired. Please try again.",
  otp_disabled: "OTP is disabled.",
  email_address_invalid: "The email address is invalid.",
  same_password: "You cannot use the same password as before.",
  validation_failed: "The email address was not entered correctly.",
};

export function generateErrorMessage(error: unknown) {
  if (error instanceof AuthError && error.code) {
    return (
      AUTH_ERROR_MESSAGE_MAP[error.code] ??
      "Unknown authentication error has occurd. Please try again."
    );
  }

  return "Error has occured. Please try again.";
}
