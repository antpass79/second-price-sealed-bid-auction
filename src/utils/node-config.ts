import fs from 'fs';
import path from 'path';

export class NodeConfig {

    // data members

    private static _json: any;

    // public functions

    static init(configFile: string) {
        let configurationPath = path.join(__dirname, configFile);
        NodeConfig._json = this.readConfig(configurationPath);
    }

    static getValue(key: string) {
        return process.env[key] || NodeConfig._json[key];
    }

    // private functions

    private static readConfig(configurationPath: string) {
        let buffer = fs.readFileSync(configurationPath, { encoding: 'utf-8' });
        let jsonBuffer = buffer.toString();
        let jsonData = JSON.parse(jsonBuffer);

        return jsonData;
    }
}