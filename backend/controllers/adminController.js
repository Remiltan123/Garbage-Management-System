import User from "../models/User.js";
import GarbageReport from "../models/GarbageReport.js";

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

export const getAllCollectors = async (req, res) => {
  try {
    // Find all users with role 'collector'
    const collectors = await User.find({ role: "collector" }).select(
      "-password"
    );

    // Get report statistics for each collector
    const collectorsWithStats = await Promise.all(
      collectors.map(async (collector) => {
        const activeReports = await GarbageReport.countDocuments({
          collector: collector._id,
          status: { $in: ["pending", "in-progress"] },
        });

        const completedReports = await GarbageReport.countDocuments({
          collector: collector._id,
          status: "collected",
        });

        const totalReports = await GarbageReport.countDocuments({
          collector: collector._id,
        });

        return {
          _id: collector._id,
          name: collector.username,
          email: collector.email,
          phone: collector.contactNumber,
          role: collector.role,
          activeReports,
          completedReports,
          totalReports,
          createdAt: collector.createdAt,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: collectorsWithStats.length,
      data: collectorsWithStats,
    });
  } catch (error) {
    console.error("Error fetching collectors:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching collectors",
      error: error.message,
    });
  }
};
