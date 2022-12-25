const db = require("../../../models");
const Permissions = db.permissions;


exports.fetchAll = async (req, res) => {

    try {

        const data = await Permissions.find({})

        res.status(200).send({
            message: "Success Fetch Permissions",
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

        const data = await Permissions.findById(req.params.id)

        res.status(200).send({
            message: "Success Fetch Permission",
            payload: data
        });

    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Permissions."
        });
    }
}

exports.create = (req, res) => {
    try {
        // Validate request
        if (!req.body.name) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        // Create a Permissions
        const permissions = new Permissions({
            name: req.body.name,
            code: req.body.code,
            menu_name: req.body.menu_name
        });

        // Save Permissions in the database
        permissions
            .save(permissions)
            .then(data => {
                res.send({
                    message: "Success"
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

exports.update = (req, res) => {

}