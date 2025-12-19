import { Locator } from "@playwright/test";

export class TableData{
    async parseTable(rowsLoc: Locator): Promise<string[][]>{
        const tableData: string[][] = [];
        const rows = await rowsLoc.count();
         for (var i = 0; i < rows; i++){
            tableData[i] = [];
            //column size may not be the same for each row
            const columns = await rowsLoc.nth(i).locator('td').count();
            for (var j = 0; j < columns; j++){
                var textContent = await rowsLoc.nth(i).locator('td').nth(j).innerText()
                tableData[i].push(textContent.trim());
            }
        }
        return tableData;
    }
}