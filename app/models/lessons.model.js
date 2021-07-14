const sql = require("./db")
const moment = require('moment')

// constructor
const Lesson = function(lesson){
    this.courseId = lesson.courseId
    this.startTime = lesson.startTime
    this.endTime = lesson.endTime
    this.venueId = lesson.venueId
    this.status = lesson.status
}

Lesson.create = (newLesson, result) => {
    sql.query("INSERT INTO lessons SET ?", newLesson,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("create lesson: ", { id: res.insertId, ... newLesson });
            result(null, { id: res.insertId, ...newLesson });
        }
    )
}   

Lesson.findById = (id, result) => {
    sql.query("SELECT * FROM lessons WHERE id = " + id,
        (err, res) => {
            if(err){
                console.log("error: ", err)
                result(err, null)
                return
            }
            if(res.length){
                console.log("found lesson: ", res[0])
                result(null, res[0])
                return
            }

            result({ kind: "not_found" }, null)
        }
    )
}

Lesson.getAll = result => {
    sql.query("SELECT * FROM lessons",
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return
            }
            console.log("lessons: ", res)
            result(null, res)
        }
    )
}

Lesson.updateById = (id, lesson, result) => {
    sql.query("UPDATE lessons SET courseId = ?, startTime = ?, endTime = ?, venueId = ?, status = ? WHERE id = ? ",
        [lesson.courseId, lesson.startTime, lesson.endTime, lesson.venueId, lesson.status], // php myadmin
        (err, res) => {
            if(err){
                console.log("error: ", err)
                result(null, err)
                return
            }

            if(res.affectedRows == 0){
                result({kind: "not_found"}, null)
                return
            }

            console.log("updated lesson: ", {id: id, ...lesson})
            result(null, {id:id, ...lesson})
        }
    )
}

Lesson.remove = (id, result) => {
    sql.query(
        "DELETE FROM lessons WHERE id = ? ",
        id,
        (err, res) => {
            if(err){
                console.log("error: ", err)
                result(null, err)
                return
            }
            if(res.affectedRows == 0){
                // not found lesson with the id
                result({kind: "not_found"}, null)
                return
            }
            console.log("deleted lesson with id: ", id);
            result(null, res)
        }

    )
}

module.exports = Lesson;