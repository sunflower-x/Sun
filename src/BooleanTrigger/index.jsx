import React, { useState } from 'react';

// 布尔触发器
const BooleanTrigger = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [button, modal] = React.Children.toArray(children);

  // 按钮方法
  const handleButtonClick = () => {
    button.props?.onClick && button.props?.onClick();
    setModalOpen(!isModalOpen);
  };

  // 弹框方法
  const handleOnCancel = () => {
    modal.props?.onCancel && modal.props.onCancel();
    setModalOpen(false);
  };

  const handleOnOk = async () => {
    await (modal.props?.onOk && modal.props.onOk());
    setModalOpen(false);
  };

  return (
    <div>
      {React.cloneElement(button, {
        onClick: handleButtonClick,
      })}

      {modal &&
        React.cloneElement(modal, {
          open: isModalOpen,
          onCancel: handleOnCancel,
          onOk: handleOnOk,
        })}
    </div>
  );
};

export default BooleanTrigger;
