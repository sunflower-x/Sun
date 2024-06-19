---
title: 布尔触发器
group:
  title: 通用
---

# 布尔触发器

#### 使用场景

用于控制一个控件的 boolean 属性，常用的是一个按钮触发事件然后弹出 Modal 对话框

```jsx
/**
 * title: 基本用法
 * description: 按钮绑定Modal框
 */
import { BooleanTrigger } from 'Sun';
import { Button, Modal } from 'antd';

export default () => (
  <BooleanTrigger>
    <Button type="primary">点击</Button>
    <Modal title="基础弹框">我是一个模态对话框</Modal>
  </BooleanTrigger>
);
```

```jsx
/**
 * title: 自定义触发按钮事件
 */
import { BooleanTrigger } from 'Sun';
import { Button, Modal } from 'antd';

export default () => (
  <BooleanTrigger>
    <Button
      type="primary"
      onClick={(next, event) => {
        alert('触发器');
      }}
    >
      点击
    </Button>
    <Modal title="基础弹框">我是一个模态对话框</Modal>
  </BooleanTrigger>
);
```

```jsx
/**
 * title: 自定义Modal的onCancel和OnOk事件
 */
import { useState } from 'react';
import { BooleanTrigger } from 'Sun';
import { Button, Modal } from 'antd';

export default () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    alert('cancel');
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setConfirmLoading(false);
      }, 2000);
    });
  };

  return (
    <>
      <BooleanTrigger>
        <Button type="primary">点击</Button>
        <Modal
          title="基础弹框"
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          onOk={handleOk}
          okText="确定"
          cancelText="取消"
        >
          我是一个模态对话框
        </Modal>
      </BooleanTrigger>
    </>
  );
};
```

### API

|  属性名  |                                描述                                 |   类型    | 默认值 |
| :------: | :-----------------------------------------------------------------: | :-------: | :----: |
| children | 子元素，必须包含两个子元素，第一个为触发元素，第二个为类 Modal 元素 | ReactNode |   --   |
