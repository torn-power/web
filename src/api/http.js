import service from "../utils/request";

const URL = process.env.VUE_APP_TRON_API_URL;

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
export const getAccountResource = (params) => {
  return service({
    url: `${URL}/account/resource`,
    params,
  });
};

/**
 * 查询地址是否激活
 * @param {*} params
 * @returns
 */
export const searchAddress = (params) => {
  return service({
    url: `${URL}/search-main`,
    params,
  });
};
