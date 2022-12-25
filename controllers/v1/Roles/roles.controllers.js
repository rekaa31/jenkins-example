const db = require("../../../models");
const Roles = db.roles;

exports.create = (req, res) => {
    try {
        // Validate request
        if (!req.body.name) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        // Create a Permissions
        const roles = new Roles({
            name: req.body.name,
            permissions : [{
                name : "Permission Create",
                code : "permission.create"
            }]
        });

        // Save Permissions in the database
        roles
            .save(roles)
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