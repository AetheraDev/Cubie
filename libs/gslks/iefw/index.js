/* Copyright (C) 2023 - GsLKS/IECloud */
/* Contact: suporte@cubie.com.br | trollgames@cubiecloud.ml */
/* IEFW 3.5.5 - Upload Framework for IECloud */

// 17/05/2023 - Still Deprecated
// Será atualizado pequenas coisas e correções de patchs.

const axios = require('axios');
const FormData = require('form-data');
const http = require('http');
const https = require('https');
const fs = require('fs');

class upload {
  constructor(serverUrl = 'https://ie.cubiecloud.ml') {
    this.serverUrl = serverUrl;
    this.engine = "main";
  }
  setEngine(engine) {
    const availableEngines = ['main', 'zero', 'zeroplus'];
    if (!availableEngines.includes(engine)) {
      console.log(`Nome inválido de engine, engines disponíveis: ${availableEngines}`);
      return;
    }
    this.engine = engine;
  }

  async uploadFile(filePath) {
    let uploader;
    switch(this.engine) {
      case "zero":
        uploader = http;
        break;
      case "zeroplus":
        uploader = https;
        break;
      default:
        uploader = axios;
        break;
    }
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    let config;
    if (uploader === axios) {
      config = {
        headers: {
          ...form.getHeaders()
        }
      };
    }
    const { data } = await uploader.post(`${this.serverUrl}/v3.5/upload`, form, config);

    const fileUrl = data.match(/value="(.*?)"/)[1];
    return fileUrl;
  }
}
module.exports = upload;
