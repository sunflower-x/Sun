---
title: 显示字段
group:
  title: 通用
---

# 显示字段

#### 使用场景

表格字段显示或隐藏

```jsx
import { useState } from 'react';
import { FieldSet } from 'Sun';

export default () => {
  const [checkedList, setCheckedList] = useState([]);
  return (
    <>
      <FieldSet
        options={[
          {
            list: [
              { key: 'data', title: '日期', checked: true },
              { key: 'name', title: '店铺名称', checked: false },
            ],
            title: '基础属性',
          },
          {
            list: [
              { key: 'cash', title: '现金', checked: true },
              { key: 'card', title: '储值卡', checked: false },
              { key: 'giftCard', title: '礼品卡', checked: true },
              { key: 'discount', title: '会员折扣', checked: true },
            ],
            title: '商品属性',
          },
        ]}
        storageKey="key01"
        onChange={(data) => {
          setCheckedList(data);
        }}
      />
      <span>{checkedList.join(',')}</span>
    </>
  );
};
```
