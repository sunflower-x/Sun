---
title: 便利贴
group:
  title: 业务
---

# 便利贴

#### 使用场景

封装复杂逻辑的业务组件，旨在为开发者提供更简单的调用方式

```jsx
/**
 * title: 店仓选择器
 */

import { Easy } from 'Sun';
const { WarehouseModal } = Easy;
import { useState } from 'react';
import { Button } from 'antd';
export default () => {
  const [visible, setVisible] = useState(true);
  const handleOnCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        打开
      </Button>
      <WarehouseModal visible={visible} onCancel={handleOnCancel} />
    </>
  );
};
```
