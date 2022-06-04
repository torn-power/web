import service from "../utils/request";

// 获取钱包地址信息
export const getAccountv2 = (address) => {
  return service({
    url: "/tron/accountv2",
    params: {
      address,
    },
  });
};

// 获取钱包资源
export const getAccountResource = (params) => {
  return service({
    url: `/tron/getAccountResource`,
    params,
  });
};

// 查询地址是否激活
export const searchAddress = (params) => {
  return service({
    url: `/tron/searchAddress`,
    params,
  });
};
