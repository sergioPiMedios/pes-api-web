import moment from 'moment';

function ISO8601ToDate(time: any) {
    if (typeof time === 'string') {
        const pattern = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T|\s)(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(.[0-9]{1,3})??(Z)?$/;
        if (time.match(pattern))
            return moment(time).utc(true).toDate();
        else
            throw new Error("Date invalid");
    } else return moment(time).utc(true).toDate();
}

function ISO8601ToDateValidator(datetime: any) {
    const pattern = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T|\s)(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(.[0-9]{1,3})??(Z)?$/;
    if (typeof datetime === "string")
        if (datetime.match(pattern))
            return moment(datetime).utc().toDate();
        else
            return false;
    else if (typeof datetime === "object") {
        return datetime.toISOString();
    }
}

function dateValidator(date: any) {
    const pattern = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/;
    if (typeof date === "string")
        if (date.match(pattern))
            return moment(date).utc().toDate();
        else
            return false;
    else if (typeof date === "object") {
        return date.toISOString();
    }
}

function timeValidator(time: any) {
    const pattern = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?$/;
    if (typeof time === "string")
        if (time.match(pattern))
            return moment(time, 'HH:mm:ss');
        else
            return false;
    else if (typeof time === "object") {
        // return time.toISOString();
        return false;
    }
}

function fromPatternToDate(time: string | null, pattern: RegExp) {
    if (time) {
        if (time.match(pattern))
            return moment(time).utc(true).toDate();
        else
            throw new Error("Date invalid");
    } else return null
}

function formatDate(date: Date, format: string) {
    if (date)
        return moment(date).utc(true).format(format);
    else return null
}

export {
    moment as datetime,
    ISO8601ToDate,
    ISO8601ToDateValidator,
    dateValidator,
    timeValidator,
    fromPatternToDate,
    formatDate,
}
