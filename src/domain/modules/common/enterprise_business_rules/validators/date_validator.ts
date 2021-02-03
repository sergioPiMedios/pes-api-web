export function iso8601DateValidator(dateItem: any) {
    const pattern = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T|\s)(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(.[0-9]{1,3})??(Z)?$/;
    if (dateItem.match(pattern)) return true
    else return false;
}
export function dateValidator(date: string) {

    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!date.match(regEx)) return false; 
    var allDate = new Date(date);
    var allDateNum = allDate.getTime();
    if(!allDateNum && allDateNum !== 0) return false;
    return (allDate.toISOString().slice(0,10) === date);

}
