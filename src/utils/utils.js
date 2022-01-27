
import { Modal, Space, Divider } from "ant-design-vue";

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
    title: "出售提示",
    okText: "知道了",
    content: () => (
      <div>
        <p>您可以加入VIP卖家池，自动化出售能量以获得收入，详情请联系</p>
        <Space>
          <img src="/telegram.png" width="24" />
          <a href="https://t.me/pangu_encrypt">@pangu_encrypt</a>
        </Space>
        <Divider />
        <p>
          当有订单时您也可以手动出售能量以获得收入，要获得及时的订单推送，请关注如下电报(Telegram)
        </p>
        <Space>
          <img src="/telegram.png" width="24" />
          <a href="https://t.me/pangu_encrypt">@pangu_encrypt</a>
        </Space>
      </div>
    ),
  });
};


export const isMoblieFunc = () => {
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}