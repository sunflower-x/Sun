import { Select as AntdSelect } from 'antd';

const Select = (props) => {
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
      <AntdSelect
        {...props}
        mode={props.mode}
        style={props.style || { width: '150px' }}
        value={props.value}
        onChange={(value) => {
          props.onChange(value);
        }}
        maxTagCount={0}
        maxTagPlaceholder={(omittedValues) =>
          `已选中${omittedValues.length} 项`
        }
        options={props?.option || []}
        dropdownRender={(menu) => (
          <div>
            {props.mode === 'multiple' && (
              <div
                style={{
                  padding: '4px 8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e8e8e8',
                }}
              >
                <a onClick={handleSelectAll}>全选</a>
                <a onClick={handleClear}>清空</a>
              </div>
            )}
            {menu}
          </div>
        )}
      ></AntdSelect>
    </>
  );
};

export default Select;
