# NodeJS R2 Bucket Creation - File Upload Basic

This is a test of a stock NodeJS app uploading a file on Disk to a Cloudflare R2 Bucket. 

## Getting started

### Requirements
    - Must have NodeJS - npm installed  
    - Must have a [Cloudflare Account](https://dash.cloudflare.com/login)
    - Run npm install after cloning to install dependencies
    
### Steps
    - Run npm install after cloning to install dependencies
    - Create an API access token through Cloudflare
    - Add Token and Secret to .env 
    - Add Cloudflare Account ID to .env

That's pretty much it to get it working. Currently I just have it setup to copy a file on disk to R2 Bucket. These file paths are just handeled in .env but you can hard code them or change them to node execute params etc. The upload accepts File Buffers. You'll also want to make sure you're setting mime types, this will be basically automatic if you're using this in a route and dealing with file uploads from a client side. 

This is just to show how to configure a very basic bucket creation and upload with static assets!