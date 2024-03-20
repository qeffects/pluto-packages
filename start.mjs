import { zipSync } from "cross-zip";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = await fs.readdir("./packages");

const hashes = [];

for (let index = 0; index < packages.length; index++) {
    const val = packages[index];
    let jsonModule = await fs.readFile("./packages/"+val+"/module/module.json");
    let module = JSON.parse(jsonModule);
    
    let zipFile = await fs.readFile(`./${val}.tar.gz`);
    let hash = createHash('sha256').update(zipFile, 'binary').digest('hex');

    module.hash = hash;
    module.size = zipFile.byteLength;

    hashes.push(hash);

    await fs.writeFile(`./packages/${val}/manifest.json`, JSON.stringify(module), "utf8");
    console.log(`Hashed ${val} module: ${hash} , size: ${module.size}`);
}