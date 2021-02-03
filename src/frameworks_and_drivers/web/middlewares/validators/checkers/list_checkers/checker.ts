export function verifyLimit() {
    return function verifyLimit(value: any) {
        if (!value || value === "") {
            return 100;
        } else {
            return value;
        }
    }
}

export function verifyOffset() {
    return function verifyOffset(value: any) {
        if (!value || value === "") {
            return 0;
        } else {
            return value;
        }
    }
}

export function verifyObject() {
    return function verifyObject(value: any) {
        if (value) {
            if (typeof value !== 'object') return null;
            else return value;
        } else return null;

    }
}

export function createDate() {
    return function createDate(value: any) {
        if (value) return new Date(parseInt(value));
        else return null;
    }
}

export function verifyEmpty() {
    return function verifyEmpty(value: any) {        
        if (value === "") return undefined;
        else return value;
    }
}

export function verifyBooleans() {
    return function verifyOffset(value: any) {
        if (value !== "" && value !== undefined) return value == "true";
        else return undefined;
    }
}