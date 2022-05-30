import { Modal, Space, Divider } from "ant-design-vue";

import i18n from "../locales/i18n";

/**
 * 合并同键值名
 * @param {*} arr
 * @param {*} key
 * @param {*} key2
 * @returns
 */
export const megeKeySame = (arr = []) => {
  const key = "receiverAddress";
  const key2 = "resource";
  const energy = arr.filter((v) => v[key2] === "ENERGY");
  const bindWidth = arr.filter((v) => v[key2] !== "ENERGY");

  const classData = (array = []) => {
    const map = new Map();
    for (let entry of array) {
      if (!map.has(entry[key])) {
        map.set(entry[key], entry);
      } else {
        const currentValue = map.get(entry[key]);
        map.set(entry[key], {
          ...entry,
          resourceValue:
            parseFloat(currentValue.resourceValue) +
            parseFloat(entry.resourceValue),
          frozenBalance:
            parseFloat(currentValue.frozenBalance) +
            parseFloat(entry.frozenBalance),
        });
      }
    }
    return [...map.values()];
  };
  return [...classData(energy), ...classData(bindWidth)];
};

export const sellTip = () => {
  Modal.info({
    title: () => i18n.global.t("tip.sell"),
    okText: i18n.global.t("tip.knowThe"),
    content: () => (
      <div>
        <p>{i18n.global.t("tip.tip3")}</p>
        <Space>
          <img src="/telegram.png" width="24" />
          <a href="https://t.me/Tron_energysharing" target="_blank">
            @Tron_energysharing
          </a>
        </Space>
        <Divider />
        <p>{i18n.global.t("tip.tip4")}</p>
        <Space>
          <img src="/telegram.png" width="24" />
          <a href="https://t.me/tronenergysharing" target="_blank">
            @Tron energy-sharing
          </a>
        </Space>
      </div>
    ),
  });
};

export const shardText = (address) => `
我发现波场上有个平台可以租能量和带宽，能省下很多交易手续费，使用不需要调动合约非常安全，下单常常还有空投福利，你也来试试吧！

------------
能量租赁平台地址：${window.location.href.split("?")[0]}?address=${address}`;
