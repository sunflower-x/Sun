---
title: 下拉框
group:
  title: 通用
---

# 下拉框

#### 使用场景

下拉选择，搜索，清空

```jsx
/**
 * title: 单选
 */
import { Select } from 'Sun';
import { useState } from 'react';
export default () => {
  const [choose, setChoose] = useState('1');
  const options = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'Closed',
    },
    {
      value: '3',
      label: 'Communicated',
    },
    {
      value: '4',
      label: 'Identified',
    },
    {
      value: '5',
      label: 'Resolved',
    },
    {
      value: '6',
      label: 'Cancelled',
    },
  ];

  return (
    <>
      <Select
        placeholder="请选择"
        value={choose}
        onChange={(value) => {
          setChoose(value);
        }}
        option={options}
      ></Select>
      <span>{choose}</span>
    </>
  );
};
```

```jsx
/**
 * title: 多选
 */
import { Select } from 'Sun';
import { useState } from 'react';
export default () => {
  const [choose, setChoose] = useState(['1']);

  const options = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'Closed',
      disabled: true,
    },
    {
      value: '3',
      label: 'Communicated',
    },
    {
      value: '4',
      label: 'Identified',
    },
    {
      value: '5',
      label: 'Resolved',
    },
    {
      value: '6',
      label: 'Cancelled',
    },
  ];

  return (
    <>
      <Select
        style={{ width: '200px' }}
        mode="multiple"
        placeholder="请选择"
        value={choose}
        onChange={(value) => {
          setChoose(value);
        }}
        filterOption={(inputValue, option) => {
          return (option?.label ?? '').includes(inputValue);
        }}
        option={options}
      ></Select>
      <span>{choose.join(',')}</span>
    </>
  );
};
```

### API

|    属性名    |                                                                    描述                                                                    |                 类型                 | 默认值 |
| :----------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------: | :----: |
|     mode     |                                                       设置 Select 的模式为多选或标签                                                       |            multiple/tags             |   --   |
|   onChange   |                                             被选中时调用，参数为选中项 如果是多选 返回一个数组                                             |         (value: any) => void         |   --   |
|   disabled   |                                                           Option props 是否禁用                                                            |               boolean                |   --   |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。示例 | boolean/function(inputValue, option) |  true  |
