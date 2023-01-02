const db = require("../../../models");
const Roles = db.roles;
const Permissions = db.permissions;
const mongoose = require("mongoose");

exports.fetchAll = async (req, res) => {

    try {

        const options = {
            page: req.query.page,
            limit: req.query.limit
        };

        let data = []

		if(options.page && options.limit){
		 	data = await Roles.paginate({}, options)
		} else{
			data = await Roles.find({})
		}

        res.status(200).send({
            message: "Fetch Roles Success!",
            payload: data
        });

    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Permissions."
        });
    }
}

exports.fetchOne = async (req, res) => {

    try {

        const data = await Roles.findById(req.params.id)

        res.status(200).send({
            message: "Fetch Role Success!",
            payload: data
        });

    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Permissions."
        });
    }


}

exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        let permissionsList = await Permissions.find({
            '_id' : {
                $in: req.body.permissions.map((permission) => {
                    return mongoose.Types.ObjectId(permission)
                })
            }
        }).select("name code menu_name -_id")



        // Create a Permissions
        const roles = new Roles({
            name: req.body.name,
            code: req.body.code,
            permissions : permissionsList
        });

        // Save Permissions in the database
        roles
            .save(roles)
            .then(data => {
                res.send({
                    message: "Create Role Success!"
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Permissions."
                });
            });
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Permissions."
        });
    }
}