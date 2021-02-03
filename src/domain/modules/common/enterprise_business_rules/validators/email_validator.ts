function emailValidator(email: string): boolean {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return email.search(pattern) == 0;
}

const service = { emailValidator };
export default service;
export { emailValidator };