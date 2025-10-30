/**
 * Middleware to check if authenticated user has the required user type
 * @param {string[]} allowedUserTypes - Array of allowed user types (e.g., ['NGO', 'Survivor'])
 */
export const checkUserType = (allowedUserTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { userType } = req.user;

    // If user hasn't selected a user type yet
    if (!userType) {
      return res.status(403).json({ 
        message: "User type not selected. Please select your user type first.",
        requiresUserTypeSelection: true 
      });
    }

    // Check if user's type is in the allowed types
    if (!allowedUserTypes.includes(userType)) {
      return res.status(403).json({ 
        message: `Access denied. This resource is only available for ${allowedUserTypes.join(', ')} users.`,
        currentUserType: userType,
        requiredUserTypes: allowedUserTypes
      });
    }

    next();
  };
};
