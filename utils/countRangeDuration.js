function countRangeDuration(date) {
	let dateNow = new Date()
	let diff = dateNow.getTime() - date.getTime()

	let totalDays = Math.ceil(diff / (1000 * 3600 * 24))

	let years = Math.floor(totalDays / 365);
	let months = Math.floor(totalDays % 365 / 30);
	let days = Math.floor(totalDays % 365 % 30);

	return `${years} Tahun ${months} Bulan ${days} Hari`;
}

module.exports = {
	countRangeDuration
}