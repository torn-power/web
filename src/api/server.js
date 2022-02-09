import service from "../utils/request";

/**
 * 冻结接口
 * @param {*} data
 * @returns
 */
export const freeze = (data) => {
  return service({
    url: `/order/freeze`,
    method: "POST",
    data,
  });
};

/**
 * 获取基本信息
 * @returns
 */
export const getConfig = () => {
  return service({
    url: "/config/base_info",
  });
};

/**
 * 订单列表
 * @returns
 */
export const getOrderList = (params) => {
  return service({
    url: "/order/lists",
    params,
  });
};
