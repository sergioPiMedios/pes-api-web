import XLSX from 'xlsx';

export class XlsxWorkbookHandler {

    wb: XLSX.WorkBook

    constructor() {
        this.wb = XLSX.utils.book_new();
    }

    getSheet(sheetName : string){
        return this.wb.Sheets[sheetName];
    }

    getSheetNames() {
        return this.wb.SheetNames;
    }

    addSheet(sheetName: string, jsonData: any) {
        let ws = XLSX.utils.json_to_sheet(jsonData);
        XLSX.utils.book_append_sheet(this.wb, ws, sheetName);
    }

    addSheetWithHeaders(sheetName: string, jsonData: any) {
        let ws = XLSX.utils.aoa_to_sheet(jsonData);
        XLSX.utils.book_append_sheet(this.wb, ws, sheetName);
    }

    setProps(props: any) {
        this.wb.Props = props;
    }

    convertSheetInJSON(sheet : any){
        return XLSX.utils.sheet_to_json(sheet);
    }

    readBuffer(buffer: any) {
        this.wb = XLSX.read(buffer, {
            type: 'buffer'
        });
    }

    /**
     * @returns {Buffer} NodeJS buffer
     */
    writeWorkbookToBuffer(): Buffer {
        return XLSX.write(this.wb, {
            bookType: 'xlsx',
            type: "buffer"
        });
    }
}
