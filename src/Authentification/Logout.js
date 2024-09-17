import { removeUserInfo } from './HandleUserInfo';
import { removeToken } from './HandleToken';

// Function to handle the actual logout process
const handleLogout = () => {
  removeUserInfo();
  removeToken();
  window.location.href = '/login'; // Redirect to the login page
};

// Function to display the logout confirmation popup
const confirmLogout = () => {
  const confirmation = window.confirm("Do you really want to log out?");
  if (confirmation) {
    handleLogout();
  }
};

export default confirmLogout;
