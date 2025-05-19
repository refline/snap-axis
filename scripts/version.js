const fs = require("fs");
const path = require("path");
const pkg = require("../package.json");
const srcDir = path.join(__dirname, "../dist");
const version = pkg.version;
const files = fs.readdirSync(srcDir);
const versionReg = /__VERSION__/g;
files.forEach((file) => {
  const filePath = path.join(srcDir, file);
  if (fs.statSync(filePath).isFile()) {
    let content = fs.readFileSync(filePath, "utf-8");
    if (versionReg.test(content)) {
      content = content.replace(versionReg, version);
      fs.writeFileSync(filePath, content, "utf-8");
      // console.log(`Replaced __VERSION__ in ${filePath}`);
    }
  } else if (fs.statSync(filePath).isDirectory()) {
    const subFiles = fs.readdirSync(filePath);
    subFiles.forEach((subFile) => {
      const subFilePath = path.join(filePath, subFile);
      if (fs.statSync(subFilePath).isFile()) {
        let content = fs.readFileSync(subFilePath, "utf-8");
        if (versionReg.test(content)) {
          content = content.replace(versionReg, version);
          fs.writeFileSync(subFilePath, content, "utf-8");
          // console.log(`Replaced __VERSION__ in ${filePath}`);
        }
      }
    });
  }
});
