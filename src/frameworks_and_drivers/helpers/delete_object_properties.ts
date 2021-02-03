export function deleteObjectProperties(item: any, propertiesToDelete: string[]) {
    const itemCopy = { ...item };
    propertiesToDelete.map( function(property: any) {
        delete itemCopy[property]
    });
    return itemCopy;
}
