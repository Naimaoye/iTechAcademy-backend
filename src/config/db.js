import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.mlab;
const devUri = process.env.MONGO_URL;


module.exports = {uri:uri,
                  devUri:devUri}