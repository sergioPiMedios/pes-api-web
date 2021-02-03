function buildInstitucionesList(institucionesRepo: any) {
    return async function execute(
        opt: object
        ) {
        try {
            return await institucionesRepo.getAllItems(opt)
        } catch (error) {
            throw error;
        }
    }
}

function buildCountList(institucionesRepo: any) {
    return async function execute (filter: any) {
        try {
            return await institucionesRepo.countItems(filter);
        } catch (error) {
            throw error;
        }
    }
}

const service = {
    buildInstitucionesList,
    buildCountList,
}
export default service;
export {
    buildInstitucionesList,
    buildCountList,
}