const db = require("../../../models");
const Divisions = db.divisions;


exports.fetchAll = async (req, res) => {

    try {

        const options = {
            page: req.query.page,
            limit: req.query.limit
        };

		let data = []

		if(options.page && options.limit){
		 	data = await Divisions.paginate({}, options)
		} else{
			data = await Divisions.find({})
		}

        res.status(200).send({
            message: "Fetch Divisions Success!",
            payload: data
        });

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Permissions."
        });
    }


}