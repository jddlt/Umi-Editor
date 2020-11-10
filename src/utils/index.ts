// 通过Key找到组件
export const findCompByKey = (
  data: Txp.IChild[],
  key: string,
  callback: (item: Txp.IChild, index: number, arr: Txp.IChild[]) => void,
) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return callback(data[i], i, data);
    }
    if (data[i].children) {
      findCompByKey(data[i].children || [], key, callback);
    }
  }
};
