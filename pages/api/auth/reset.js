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

router.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This account does not exist" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });
    res.status(200).json({ message: "Successful!", email: user.email });
    // sendEmail(email, url, "", "Reset your password", resetEmailTemplate);
    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
