import User from "../models/User.js";
import Collector from "../models/Collector.js";

export const getUser = async (req, res) => {
    try {
        const { user_id } = req.params;  

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        let reporter = await User.findById(user_id);
        let collector = null;

        if (!reporter) {
            collector = await Collector.findById(user_id);
        }

        if (!reporter && !collector) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetch success",
            user: reporter || collector,  
        });
    }
    catch (err) {
        console.error("Error Fetching the user:", err);
        res.status(500).json({ error: err.message });
    }
};
