import { IDomItem } from '@/Components/BaseComp/index.d';

// 通过Key找到组件
export const findCompByKey = (
  data: IDomItem<any>[],
  key: string,
  callback: (item: IDomItem<any>, index: number, arr: IDomItem<any>[]) => void,
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
