import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utils/validation";
import db from "@/utils/db";
import User from "@/models/user";
import { createActivationToken, createResetToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmails";
import resetEmailTemplate from "@/emails/resetEmailTemplate";
// import { sendEmail } from "../../../utils/sendEmails";
// import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your password", resetEmailTemplate);
    await db.disconnectDb();
    res.status(200).json({
      message: "An email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
