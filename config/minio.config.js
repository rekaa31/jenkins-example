var Minio = require('minio')

exports.minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    accessKey: 'pfUrVV7eQNX0wlkb',
    secretKey: 'nuvqqmDQyvEre6pGFdzGe5NqhwbiBX33',
	pathStyle: true,
	useSSL: false
});
