import service from "../utils/request";

const URL = 'http://localhost:5000'

/**
 * 冻结接口
 * @param {*} data 
 * @returns 
 */
export const freeze = (data) => {
    return service({
        url: `${URL}/api/order/freeze`,
        method: 'POST',
        data
    });
}