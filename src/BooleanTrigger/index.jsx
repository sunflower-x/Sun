import React, { useEffect, useState } from 'react';

const BooleanTrigger = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [button, modal] = React.Children.toArray(children);

  const handleButtonClick = () => {
    button.props?.onClick && button.props?.onClick();
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (modal) {
    }
  }, [isModalOpen, modal]);

  return (
    <div>
      {React.cloneElement(button, {
        onClick: handleButtonClick,
      })}

      {modal &&
        React.cloneElement(modal, {
          open: isModalOpen,
          onCancel: () => {
            modal.props?.onCancel && modal.props.onCancel();
            setModalOpen(false);
          },
          onOk: async () => {
            await (modal.props?.onOk && modal.props.onOk());
            setModalOpen(false);
          },
        })}
    </div>
  );
};

export default BooleanTrigger;
