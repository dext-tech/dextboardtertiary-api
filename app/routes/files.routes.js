module.exports = app => {
    const files = require("../controllers/files.controller.js")

    // upload a new file
    app.post("/files", files.upload);

    // retrieve all file records
    app.get("/files", files.findAll);

    // retrieve a singe file with fileid
    app.get("/files/:fileid", files.findOne);

    // download a file
    app.get("/files/:fileid/download", files.downloadOne);

    // update a file record with fileid
    app.put("/files/:fileid", files.update);

    // delete a file record with fileid
    app.put("/files/:fileid", files.delete);

}