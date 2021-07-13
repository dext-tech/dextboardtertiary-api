const sql = require("./db")
const moment = require('moment')

// constructor
const Files = function (files) {
    this.fileid = files.fileid;
    this.filename = files.filename;
    this.extension = files.extension;
    this.fileSize = files.filesize;
    this.fileUrl = files.fileUrl;
    this.owner = files.owner;
    this.createdAt = moment().unix();
}

Files.create = (newFile, result) => {
    sql.query("INSERT INTO files SET ?", newFiles,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("create file: ", {
                id: res.insertid, ...newFile
            });

            result(
                null,
                {id: res.insertId, ...newFile}
            )
        }
    )
}

