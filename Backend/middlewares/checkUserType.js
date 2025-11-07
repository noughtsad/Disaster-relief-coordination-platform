export const checkUserType = (allowedUserTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { userType } = req.user;
    if (!userType) {
      return res.status(403).json({ 
        message: "User type not selected. Please select your user type first.",
        requiresUserTypeSelection: true 
      });
    }

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
