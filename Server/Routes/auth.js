import express from "express";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) return res.status(400).json({ message: "Email is required" });

        let existingUser = await User.findOne({ email });

        if (!existingUser) {
            existingUser = await User.create({
                email,
                joinedon: new Date()
            });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;
