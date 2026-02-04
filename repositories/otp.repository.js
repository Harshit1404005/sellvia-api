export {db} from "../db/database.js"

export function saveOtp({mobile, otp, expiresAt}){
    return new Promise((resolve, reject) => {
        db.run(
            `
                INSERT INTO otps VALUES (mobile, otp, expiresAt)
                VALUES (?, ?, ?)
                ON CONFLICT(mobile)
                DO UPDATE SET otp=?, expiresAt=?
            `,
            [mobile, otp, expiresAt, otp, expiresAt],
            err => (err ? reject(err) : resolve())
        )
    })
}

export function getOtp(mobile) {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM otps WHERE mobile = ?",
            [mobile],
            (err, row) => (err ? reject(err) : resolve(row))
        );
    });
}

export function deleteOtp(mobile) {
    return new Promise((resolve, reject) => {
        db.run(
            "DELETE FROM otps WHERE mobile = ?",
            [mobile],
            err => (err ? reject(err) : resolve())
        );
    });
}
