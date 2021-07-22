const sql = require("./db.js")
const moment = require('moment')

// TODO : update documentation, converting old user to lecturer

// constructor
const Lecturer = function (lecturer) {
    this.name = lecturer.name
    this.email = lecturer.email;
    this.dateRegistered = moment().unix();
}



Lecturer.create = (newLecturer, result) => {
    sql.query("INSERT INTO lecturer SET ?", newLecurer,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("create lecturer: ", { id: res.insertId, ...newLecturer });
            result(null, { id: res.insertId, ...newLecturer });
        })
};

Lecturer.findById = (id, result) => {
    sql.query(`SELECT * FROM lecturers WHERE id = ${id}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found lecturer: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found lecturer with the id
            result({ kind: "not_found" }, null);
        })
}

Lecturer.getAll = result => {
    sql.query("SELECT * FROM lecturers",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return
            }
            console.log("lecturers: ", res)
            result(null, res)
        })
}

Lecturer.updateById = (id, lecturer, result) => {
    sql.query("UPDATE lecturers SET name = ?, email = ? WHERE id = ? ",
        [lecturer.name, lecturer.email, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found lecturer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated lecturer: ", { id: id, ...lecturer });
            result(null, { id: id, ...lecturer });
        }
    )
}

Lecturer.remove = (id, result) => {
    sql.query("DELETE FROM lecturers WHERE id = ?", id,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found lecturer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted lecturer with id: ", id);
            result(null, res);
        });
}

module.exports = Lecturer;

