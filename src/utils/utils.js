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