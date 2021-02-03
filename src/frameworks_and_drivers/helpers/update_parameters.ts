/**
 * 
 * @param originalData Data of object save in DB
 * @param newData New data tp update this Deal
 */
export function updateParameters(originalData: any, newData: any): any {
    /**Extract keys of field from the DB object */
    const keysOriginal = Object.keys(originalData);
    /**Extract keys of field from the new data object */
    /**Compare and add fields */
    const keysNew = Object.keys(newData);
    keysOriginal.filter((tag) => {
        /**If the field dont exist in the new object this be added */
        const exist = (newData[tag] === undefined || newData[tag] === null) ? false : true; 
        if (!keysNew.includes(tag)) {
            newData[tag] = originalData[tag];
        } else if (!exist && originalData[tag]) {
            newData[tag] = originalData[tag];
        }else if (exist && originalData[tag] && (newData[tag] !== originalData[tag])) {
            newData[tag] = newData[tag];
        }
    });
    /**Return new object with all fields */
    return newData;
}