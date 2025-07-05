import spawn from "cross-spawn";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = path.join(__dirname, "../");
const cacheDir = path.join(dirname, ".cache/next");
const docsDir = path.join(cacheDir, "docs");
function run(command, args) {
    const result = spawn.sync(command, args, { stdio: "inherit" });
    if (result.error) {
        console.error(`❌ Error running ${command}`, result.error);
        process.exit(1);
    }
}

//delete cache

if (fs.existsSync(cacheDir)) {
    console.log(`⚠️  Removing existing cache: ${cacheDir}`);
    fs.rmSync(cacheDir, { recursive: true, force: true });
}

run("git", [
    "clone",
    "--depth",
    "1",
    "--no-checkout",
    "https://github.com/vercel/next.js",
    cacheDir,
]);
process.chdir(cacheDir);
run("git", ["sparse-checkout", "set", "docs"]);
run("git", ["checkout"]);

// rename file|dir

function stripPrefix(name) {
    return name.replace(/^\d+-/, "");
}

function renameAll(dirPath) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
        const oldPath = path.join(dirPath, item.name);
        const newName = stripPrefix(item.name);
        const newPath = path.join(dirPath, newName);

        if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
            console.log(`✅ Renamed: ${item.name} → ${newName}`);
        }
        if (item.isDirectory()) {
            renameAll(newPath);
        }
    }
}

renameAll(docsDir);

// delete content/docs/docs...
const contentPath = path.join(dirname, "src/content/docs");
const docsPath = path.join(dirname, "src/content/docs/docs");
if (fs.existsSync(docsPath)) {
    console.log(`⚠️  Removing Old document: ${docsPath}`);
    fs.rmSync(docsPath, { recursive: true, force: true });
}

// copy docsDir ==> docsPath

fs.cpSync(docsDir, docsPath, {
    recursive: true,
    force: true,
    errorOnExist: false,
});
