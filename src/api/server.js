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
 * 出售
 * @param {*} data
 * @returns
 */
export const sellApi = (data) => {
  return service({
    url: `/order/sell`,
    method: "POST",
    data,
  });
};

/**
 * 撤单
 * @param {*} data
 * @returns
 */
export const undoApi = (data) => {
  return service({
    url: `/order/undo`,
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
export const getOrderList = (data) => {
  return service({
    url: "/order/lists",
    method: "POST",
    data,
  });
};

/**
 * 获取订单详情
 * @returns
 */
export const getOrderApi = (params) => {
  return service({
    url: "/order/info",
    params,
  });
};

export const getOrderByIdWriting = (params) => {
  return service({
    url: "/order/writing",
    params,
  });
};

export const getOrderByIdReWriting = (params) => {
  return service({
    url: "/order/rewriting",
    params,
  });
};

/**
 * 获取收益情况
 * @returns
 */
export const getRentInfoApi = () => {
  return service({
    url: "/order/rent_info",
  });
};

/**
 * 检测三天是否冻结过
 * @returns
 */
export const verifyRepeatApi = (params) => {
  return service({
    url: "/order/verify-repeat",
    params,
  });
};
