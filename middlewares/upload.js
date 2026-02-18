import multer from "multer"
import path from "path"
import fs from "fs"

const uploadDir = "./uploads/products"
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage(
    {
        destination: uploadDir,
        filename: (req, file, callback) => {
            const ext = path.extname(file.originalname);
            callback(null, `prod_${Date.now()}${ext}`)
        }
    }
)

export const uploadProductImage = multer({ storage })