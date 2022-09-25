export const hideEmail = (email: string): string => {
  // Transform the email from "example@test.com"
  // to "exa...@text.com"

  // Split the email into two parts
  const [firstPart, secondPart] = email.split("@");
  // Get the first 3 characters of the first part
  const firstPartHidden = firstPart.slice(0, 2);
  // Get the last 3 characters of the first part
  // Get the first 3 characters of the second part

  // Return the hidden email
  return `${firstPartHidden}...@${secondPart}`;
};
