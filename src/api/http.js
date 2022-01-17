import service from "../utils/request";

// 测试网
const TEST_URL = 'https://shastapi.tronscan.org/api'

// 主网
const PROD_URL = 'https://apilist.tronscan.org/api'

const flag = 2

const URL = 1 === flag ? PROD_URL : TEST_URL

/**
 * 获取钱包地址信息
 * @param {*} address
 * @returns
 */
export const getAccountv2 = (address) => {
    return service({
        url: `${URL}/accountv2`,
        params: {
            address,
        },
    });
};


/**
 * 获取钱包资源
 * @param {*} params 
 * @returns 
 */
export const getAccountResource = (params)=> {
    return service({
        url: `${URL}/account/resource`,
        params
    });
}