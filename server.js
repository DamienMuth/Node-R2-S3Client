const { S3Client, CreateBucketCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const { fs } = require('fs/promises');
const { path } = require("path");

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

const createBucket = async (bucketName) =>{
    console.log(`Creating Bucket ${bucketName}`);

    const command = new CreateBucketCommand({Bucket:bucketName});
    try {
        const returnData = await s3.send(command);
        console.log(`Created Bucket ${bucketName}`)
        console.log(returnData);
    } catch (error) {
        if(error.name === "BucketAlreadyOwnedByYou"){
            console.log(`Bucket ${bucketName} already created`);
        }else{
            console.error(`Error created bucket ${bucketName}`, error);
        }
    }
}

const uploadFile = async (bucketName, fileName, fileContent, contentType) =>{
    console.log(`Uploading File ${fileName} to bucket ${bucketName}`);
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
        ContentType: contentType
        
    });

    try {
        const returnData = await s3.send(command);
        console.log(`File ${fileName} uploaded to  bucket ${bucketName}`);
    } catch (error) {
        console.error(`Error uploading file ${fileName} to bucket ${bucketName}`, error);        
    }
}

const main = async () =>{
    const bucketName = process.env.BUCKET_NAME;
    const fileName = path.basename(process.env.FILE_TO_UPLOAD);
    const contentType = "image/jpeg";

    const fileContent = await fs.readFile(process.env.FILE_TO_UPLOAD, (err, data)=>{
        return data;
    })
    
    await createBucket(bucketName);
    await uploadFile(bucketName, fileName, fileContent, contentType);
}

main();

module.exports = {
    createBucket,
    uploadFile
}