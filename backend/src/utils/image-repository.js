const AWS = require("aws-sdk");
const uuid = require("uuid/v4");
const  Readable = require('stream').Readable

 
AWS.config.update({
  accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadImage = async ({data, type} ) => {
        try {
            let  s3 = new AWS.S3();
            const key = `images/${uuid()}.${type}`;
           
            const buffer = Buffer.from(data, 'base64');  

            const  body= new Readable
            body.push(buffer)   
            body.push(null) 

            const options  = {
                Bucket:  process.env.AWS_S3_BUCKET,
                Body: body,
                Key: key
              };

            await s3.upload(options).promise();
     
            return `https://s3-us-west-2.amazonaws.com/${process.env.AWS_S3_BUCKET}/${key}`;

        } catch (err) {
            console.log("step2");
            console.log("Error", err);
        }
}
 
 module.exports = {uploadImage}