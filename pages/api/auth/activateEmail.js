// api/activate.js

import { createRouter } from "next-connect";
import db from "@/utils/db";
import User from "@/models/user";
import { verifyActivationToken } from "@/utils/token";

const router = createRouter();

router.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This account does not exist" });
    }
    await user.updateOne({
      emailVerified: true,
    });
    res.status(200).json({
      message: "Email Verified Successfully!",
      email: user.email,
      emailVerified: user.emailVerified,
    });
    await db.disconnectDb();
    res.json({ message: "Account activated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
