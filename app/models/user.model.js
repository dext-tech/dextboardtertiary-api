// constructor
const User = function (user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.type = user.type;
}

const sql = require("./db.js")

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("create user: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        })
};

User.findById = (userId, resuslt) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found user with the id
            result({ kind: "not_found" }, null);
        })
}

User.getAll = result => {
    sql.query("SELECT * FROM users",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return
            }
            console.log("users: ", res)
            result(null, res)
        })
}

User.updateById = (id, user, result) => {
    sql.query("UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ? WHERE id = ? ",
        [user.firstname, user.lastname, user.email, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    )
}

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted user with id: ", id);
            result(null, res);
        });
}

module.exports = User;

