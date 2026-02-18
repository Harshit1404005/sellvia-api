import { saveOtp, getOtp, deleteOtp } from "../repositories/otp.repository.js";

export async function requestOtp(req, res) {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({ error: 'Mobile number not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        await saveOtp({ mobile, otp, expiresAt });

        return res.status(201).json({
            message: 'Otp sent',
            otp: otp
        });
    } catch (error) {
        console.error("OTP Request Error:", error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}

export async function verifyOtp(req, res) {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ error: 'Mobile and OTP are required' });
        }

        const record = await getOtp(mobile);

        if (!record) {
            return res.status(400).json({ error: 'Otp not found' });
        }

        if (Date.now() > record.expiresAt) {
            return res.status(400).json({ error: 'OTP expired' });
        }

        if (record.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        await deleteOtp(mobile);

        return res.status(200).json({
            message: 'Otp verified',
        });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}