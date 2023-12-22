import { TreeSelect as AntdTreeSelect } from 'antd';
import { useState } from 'react';
const { SHOW_PARENT } = AntdTreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const TreeSelect = (props) => {
  const [selectedValue, setSelectedValue] = useState([]);

  const handleSelectAll = () => {
    const arr = props.option
      .filter((item) => !item.disabled)
      .map((item) => item.value);
    props?.onChange && props.onChange(arr);
  };

  const handleClear = () => {
    props?.onChange && props.onChange([]);
    console.log(props.style);
  };
  return (
    <>
      <AntdTreeSelect
        {...props}
        style={props.style || { width: '150px' }}
        treeCheckable={true}
        showCheckedStrategy={SHOW_PARENT}
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value);
          props.onChange && props.onChange(value);
        }}
        maxTagCount={0}
        maxTagPlaceholder={(omittedValues) =>
          `已选中${omittedValues.length} 项`
        }
        treeData={treeData}
        // dropdownRender={(menu) => (
        //   <div>
        //     {props.mode === 'multiple' && (
        //       <div
        //         style={{
        //           padding: '4px 8px',
        //           display: 'flex',
        //           justifyContent: 'space-between',
        //           borderBottom: '1px solid #e8e8e8',
        //         }}
        //       >
        //         <a onClick={handleSelectAll}>全选</a>
        //         <a onClick={handleClear}>清空</a>
        //       </div>
        //     )}
        //     {menu}
        //   </div>
        // )}
      ></AntdTreeSelect>
    </>
  );
};

export default TreeSelect;
