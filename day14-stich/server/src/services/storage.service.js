import ImageKit, { toFile } from '@imagekit/nodejs'
import config from '../config/config.js';

const client = new ImageKit({
    privateKey: process.env[config.IMAGEKIT_PRIVATE_KEY], // This is the default and can be omitted
});


export const uploadFile = async ({ buffer, filename }) => {
    const response = await client.files.upload({
        file: await toFile(buffer),
        fileName: filename,
        folder: "snitch"
    })

    return response;
}   