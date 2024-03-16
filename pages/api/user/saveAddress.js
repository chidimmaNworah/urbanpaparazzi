import nc, { createRouter } from "next-connect";
import User from "@/models/user";
import db from "@/utils/db";
import auth from "@/middleware/auth";
// const handler = nc().use(auth);
const router = createRouter().use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = User.findById(req.user);
    await user.updateOne(
      {
        $push: {
          address: address,
        },
      },
      { new: true }
    );
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
