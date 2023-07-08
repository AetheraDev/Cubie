/*
 IEFW Native - Built on the original IEFW
 Copyright (c) GsLKS/AetheraDev
*/
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');

class upload {
  constructor(serverUrl = 'https://ie.cubiecloud.ml') {
    this.serverUrl = serverUrl;
  }

  async uploadFile(filePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const options = {
      method: 'POST',
      headers: form.getHeaders(),
    };

    return new Promise((resolve, reject) => {
      const req = https.request(`${this.serverUrl}/v3.5/upload`, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const fileUrl = data.match(/value="(.*?)"/)[1];
          resolve(fileUrl);
        });
      });

      form.pipe(req);

      req.on('error', (error) => {
        reject(error);
      });
    });
  }
}

module.exports = upload;
