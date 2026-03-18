import ExcelJs from "exceljs";
import { test, expect } from "@playwright/test";
import path from "path";

const writeExcel = async (searchText, replaceText, filePath) => {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  let cellObj = await readExcel(worksheet, searchText);
  if (cellObj.rowN === -1 || cellObj.colN === -1) {
    console.log("Search Text is not found");
    return;
  }
  const colNumber = getColNum(worksheet, "price");
  console.log(cellObj.colN);
  const cell = worksheet.getCell(
    cellObj.rowN,
    cellObj.colN + colNumber - cellObj.colN,
  );
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
  priceSum(worksheet);
};

const readExcel = async (worksheet, searchText) => {
  let cellObj = { rowN: -1, colN: -1 };
  for (let i = 1; i <= worksheet.rowCount; i++) {
    for (let j = 1; j <= worksheet.columnCount; j++) {
      const cell = worksheet.getRow(i).getCell(j);
      if (cell.value === searchText) {
        cellObj.rowN = i;
        cellObj.colN = j;
        return cellObj;
      }
    }
  }
  return cellObj;
};

const getColNum = (worksheet, header) => {
  let colNum = 0;
  for (let i = 1; i <= 1; i++) {
    for (let j = 1; j <= worksheet.columnCount; j++) {
      const cell = worksheet.getRow(i).getCell(j);
      if (cell.value === header) {
        return j;
      }
    }
  }
  return colNum;
};

const priceSum = (worksheet) => {
  const column = worksheet.getColumn(4);
  let sum = 0;
  column.eachCell((cell, cellNum) => {
    if (cell.value != "price") {
      if (typeof cell.value === "number") {
        sum += cell.value;
      } else if (typeof cell.value === "string") {
        const num = parseInt(cell.value, 10);
        if (!isNaN(num)) {
          sum += num;
        }
      }
    }
  });
  console.log(sum);
};

test("Upload, Download Excel Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download" }).click(),
  ]);

  // file name
  const fileName = download.suggestedFilename();
  // file path where to upload the file
  const filePath = path.join("C:/Users/mitta/Downloads", fileName);
  console.log(filePath);
  // save the file in the filepath
  await download.saveAs(filePath);
  await writeExcel("Apple", "360", filePath);
  // upload the file in the UI
  await page.locator("#fileinput").setInputFiles(filePath);
  await expect(page.getByText("360")).toBeVisible();
});
