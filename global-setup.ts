import fs from "fs";

async function globalSetup() {
  const dir = "allure-results";

  // create folder if not exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // create environment.properties
  const content = `
Browser=Chromium
Environment=QA
Tester=Aman Mittal
`;

  fs.writeFileSync(`${dir}/environment.properties`, content);
}

export default globalSetup;
