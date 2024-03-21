import { zipSync } from "cross-zip";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import simpleGit from "simple-git";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = await fs.readdir("./packages");


const hashes = [];

for (let index = 0; index < packages.length; index++) {
    const val = packages[index];
    const jsonModule = await fs.readFile("./packages/"+val+"/module/module.json");
    const module = JSON.parse(jsonModule);
    
    const zipFile = await fs.readFile(`./${val}.tar.gz`);
    const hash = createHash('sha256').update(zipFile, 'binary').digest('hex');

    const git = simpleGit("./packages/"+val+"/module/");

    module.tags = JSON.stringify(await git.tags());
    module.latestCommit = (await git.log()).latest.hash;

    module.hash = hash;
    module.size = zipFile.byteLength;

    hashes.push(hash);

    await fs.writeFile(`./packages/${val}/manifest.json`, JSON.stringify(module, null, 4), "utf8");
    console.log(`Hashed ${val} module: ${hash} , size: ${module.size}`);
}