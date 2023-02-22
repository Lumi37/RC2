import { userList, __dirname } from "../server.js"
 
export function handleUploadedFile(req, res) {
    // console.log(req)
    let sampleFile, uploadPath, name, id,fileExtention
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    name = req.body.name
    id = req.body.id
    sampleFile = req.files.sampleFile;
    fileExtention = sampleFile.name.slice(sampleFile.name.indexOf('.'),sampleFile.name.length)
    sampleFile.name = id + '.png'
    uploadPath = `${__dirname}../client/images/userimg/${sampleFile.name}`;
    userList[userList.findIndex(user => user.id ==  id)].profilePicturePathname = `images/userimg/${sampleFile.name}`  //Register icon path to user (found by id)
    console.log(uploadPath)
    console.log('file size: ', req.files.sampleFile.size)
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        console.log(`Received a file: ${sampleFile.name}\nfrom:${name}`)
    });

}