var Minio = require('minio')

exports.minioClient = new Minio.Client({
    endPoint: 'minio.apotekasli.net',
    port: 9000,
    accessKey: 'Fz0RsBn7CjoxVPND',
    secretKey: 'NItW2dIpewqxAQ82VZF1pSsL3xRe7sEj',
	pathStyle: true,
	useSSL: false
});
