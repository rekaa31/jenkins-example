const cloudinary = require('./../config/cloudinary.config')

exports.uploadCloudinary = async (file, folder, filename) => {
	var newPhoto = file;
	const res = cloudinary.uploader.upload(newPhoto, { folder: folder, public_id:filename  })
	const data = await res
	return {
		url: data.url,
		secure_url: data.secure_url
	}
}