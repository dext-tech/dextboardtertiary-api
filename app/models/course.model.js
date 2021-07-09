const sql = require("./db.js")

//constructor
const Course = function(course){
    this.label = course.label;
    this.creditHours = course.creditHours;
    this.lecturerId = course.lecturerId;
}

const table = "courses";

Course.create = (newCourse, result) => {
    sql.query(
        `INSERT INTO ${table} SET ?`, 
        newCourse,
        (error, response) => {
            if(error){
                console.log("error: ", error);
                result(error, null);
                return;
            }
            console.log("create course: ", { id: response.insertId, ...newCourse});
            result(null, { id: response.insertId, ...newCourse });
        }
    )
}

Course.findById = (id, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${id}`,
        (error, res) => {
            if(error){
                console.log("error: ", error);
                result(error, null);
                return;
            }

            if(res.length){
                console.log("found course: ", res[0])
                result(null, res[0])
                return
            }

            // nout found course with the id
            result({ kind: "not_found" }, null)
        }
    )
}

Course.getAll = result => {
    sql.query(`SELECT * FROM ${table}`,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return
            }
            console.log("users: ", res)
            result(null, res)
        }
    )
}

Course.updateById = (id, course, result) => {
    sql.query(`UPDATE ${table} SET label = ?, creditHours = ?, lecturerId = ? WHERE id = ?`,
        [course.name, course.creditHours, course.lecturerId, id],
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err)
                return;
            }
            
            if(res.affectedRows == 0){
                // not found course with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated course: ", { id: id, ...course });
            result(null, { id: id, ...course });
        }


    )
}

Course.remove = (id, result) => {
    sql.query(`DELETE FROM ${table} WHERE id = ?`, id,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return
            }
            if(res.affectedRows == 0){
                // not found course with the id
                result({kind: "not_found"}, null);
                return;
            }
            console.log("deleted course with id: " + id)
            result(null, res);
        }
    )
}

module.exports = Course;