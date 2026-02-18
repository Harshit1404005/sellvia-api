import { getUserByMobile, createUser } from "../repositories/users.repository.js";
import { getOtp, deleteOtp } from "../repositories/otp.repository.js";

export async function getUser(req, res) {
    try {
        const { mobile } = req.params;

        if (!mobile) {
            return res.status(400).json({
                error: "Enter mobile number"
            });
        }

        const user = await getUserByMobile(mobile);

        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            });
        }

        return res.json({ user });
    } catch (error) {
        console.error("Get User Error:", error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function signupController(req, res) {
    try {
        const { mobile, otp, name } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({
                error: 'Mobile or OTP required!'
            });
        }

        // Validate mobile length (adjust as needed for your region)
        if (mobile.length < 10) {
            return res.status(400).json({
                error: "Invalid mobile number"
            });
        }

        const otpRecord = await getOtp(mobile);

        if (!otpRecord) {
            return res.status(400).json({
                error: 'Otp not found'
            });
        }

        if (Date.now() > otpRecord.expiresAt) {
            return res.status(400).json({ error: 'Expired otp!' });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                error: 'Invalid otp!'
            });
        }

        // Cleanup OTP after verification
        await deleteOtp(mobile);

        const existingUser = await getUserByMobile(mobile);
        if (existingUser) {
            return res.status(200).json({
                message: 'Login Successful!',
                data: existingUser
            });
        }

        const user = {
            id: "U_" + Date.now(),
            mobile: mobile,
            name: name || "",
            createdAt: new Date().toISOString(),
        };

        await createUser(user);

        return res.status(201).json({
            message: 'Sign up Successful!',
            data: user
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}
