import User from "../models/User.js";

export const changeRole = async (req, res) => {
  try {
    const { email, newRole } = req.body;
    // Validate input
    if (!email || !newRole) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and newRole",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.role = newRole;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: {
        email: user.email,
        newRole: user.role,
      },
    });
  } catch (error) {
    console.error("Error changing user role:", error);
    res.status(500).json({
      success: false,
      message: "Error changing user role",
      error: error.message,
    });
  }
};
