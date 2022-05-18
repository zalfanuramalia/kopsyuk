const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kopskuy/uploads',
    format: async () => 'png',
    public_id: (req) => {
      const timestamp = Date.now()
      return `${req.fileUpload}-${timestamp}`
    }
  }
})

const fileFilter = (req, file, cb) => {
  const typeImage = [
    'image/jpeg',
    'image/png',
    'image/gif'
  ]

  if (!typeImage.includes(file.mimetype)) {
    cb(new Error('Type image must be .jpg/.png/.gif'), false)
  } else {
    cb(null, true)
  }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 100000 } })

module.exports = upload
