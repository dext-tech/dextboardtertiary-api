const Files = require("../models/files.model")
const lodash = require('lodash');
const moment = require('moment');

const getExt = (str) => {
    const arr = str.split('.')
    return arr[arr.length-1]
}

exports.uploadOne = async(request, response) => {
    try{
        if(!request.files){
            response.status(400).send({
                status: false,
                message: 'no file uploaded'
            })
        } else {
            let doc = request.files.doc;

            // use the mv() method to place the file in upload directory (i.e. 'drive')
            const fileLocation = '/drive/' + doc.name;
            doc.mv(fileLocation);



            const mFile = new Files({
                fileid: doc.name,
                filename: doc.name,
                extension: getExt(doc.name),
                fileSize: doc.size,
                fileUrl: fileLocation,
                owner: request.body.owner,
                createdAt: moment().unix()

            })

            response.status(200).send({
                status: true,
                message: 'file is uploaded',
                data: {
                    name: doc.name,
                    mimetype: doc.mimetype,
                    size: doc.size
                }
            })
        }
    } catch(err){
        response.status(500).send(err);
    }

}

exports.uploadMultiple = async(request, response)=>{
    try{
        if(!request.files){
            response.send({
                status: false,
                message: 'no file uploaded'
            })
        } else {
            let data = [];

            // loop for all files

            lodash.forEach(lodash.keysIn(request.files.docs), (key)=>{
                let doc = request.files.docs[key];

                // move doc to drive directory
                doc.mv('./drive/'+doc.name)

                // push file details
                data.push({
                    name: doc.name,
                    mimetype: doc.mimetype,
                    size: doc.size
                })
            })

            // return response
            response.send({
                status: true,
                message: 'files are uploaded',
                data: data
            })
        }
    } catch(err){
        response.status(500).send(err)
    }
}

exports.findAll = (req, res) => {

}

exports.findOne = (req, res) => {

}

exports.downloadOne = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}