import {saveOtp , getOtp ,deleteOtp} from "../repositories/otp.repository.js";

export async function requestOtp(req, res){
    const {mobile} = req.body;

    if (!mobile) {
        return res.status(400).json({error: 'Mobile number not found'});

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        await saveOtp({mobile, otp, expiresAt})

        res.status(200).json({
            success: true,
            message: 'Otp sent',
            otp: otp
        });
    }
}

export async function verifyOtp(req, res){
    const {mobile, otp} = req.body
    const record  = await getOtp(mobile, otp)

    if (!record) {
        return res.status(400).json({error: 'Otp not found'});
    }

    if (Date.now() > record.expiresAt){
        return res.status(400).json({error: 'OTP expired'});
    }

    if (record.otp !== otp){
        return res.status(400).json({error: 'Invalid OTP'});
    }

    await deleteOtp(mobile);

    return res.status(200).json({
        success: true,
        message: 'Otp verified',
    })
}