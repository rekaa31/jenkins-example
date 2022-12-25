module.exports = mongoose => {
    const Users = mongoose.model(
        "Users",
        mongoose.Schema(
            {
                name: String,
                nip: {
					type: String,
                    unique: true
				},
				nik: {
					type: String,
                    unique: true
				},
				role: String,
				tempat_lahir: String,
				tanggal_lahir: Date,
				tanggal_masuk: Date,
				agama: {
					type : String,
					enum: ["ISLAM", "KRISTEN", "KATOLIK", "BUDHA", "HINDU", "KONGHUCU"]
				},
				status_perkawinan: {
					type : String,
					enum: ["BELUM KAWIN", "KAWIN", "JANDA", "DUDA"]
				},
				alamat: String,
				otp: String,
				ip_address: String,
				is_verified: Boolean,
				token: String,
				divisi: String,
				email: {
					type: String,
                    unique: true
				},
				password: String,
				nomor_kontak:{
					type: String,
                    unique: true
				},
				last_login: Date				
            },
            { timestamps: true }
        )
    );

    return Users;
};
