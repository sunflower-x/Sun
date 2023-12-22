import { Button, Checkbox, Popover } from 'antd';
import { useEffect, useState } from 'react';

const FieldSet = (props) => {
  const { options = [], storageKey = '', onChange = () => {} } = props;
  const [checkedList, setCheckedList] = useState([]);
  useEffect(() => {
    // 首先判断本地是否存在

    if (localStorage.getItem(storageKey)) {
      // 本地存在,读取本地,给checkedList赋值
      setCheckedList(JSON.parse(localStorage.getItem(storageKey)));
    } else {
      // 本地不存在,读取options,再存本地,给checkedList赋值
      let temp = [];
      options.forEach((item) => {
        item.list.forEach((obj) => {
          obj.checked && temp.push(obj.key);
        });
      });
      localStorage.setItem(storageKey, JSON.stringify(temp));
      setCheckedList(temp);
    }
  }, []);

  useEffect(() => {
    // checkList改变，存入本地
    localStorage.setItem(storageKey, JSON.stringify(checkedList));
    onChange && onChange(checkedList);
  }, [checkedList]);

  return (
    <>
      <Popover
        trigger="click"
        placement="bottom"
        content={
          <div style={{ width: '600px' }}>
            {options.map((item) => {
              return (
                <>
                  <h4 style={{ fontWeight: 'bold' }}>{item.title}</h4>
                  <Checkbox
                    checked={
                      checkedList.filter((v) =>
                        item.list.map((obj) => obj.key).includes(v),
                      ).length == item.list.map((obj) => obj.key).length
                    }
                    onChange={(e) => {
                      let currentItemList = item.list.map((obj) => obj.key);
                      if (e.target.checked) {
                        // 选中
                        setCheckedList(
                          Array.from(
                            new Set([...checkedList, ...currentItemList]),
                          ),
                        );
                      } else {
                        // 取消选中
                        setCheckedList([
                          ...currentItemList
                            .concat(checkedList)
                            .filter(
                              (v) =>
                                !checkedList.includes(v) ||
                                !currentItemList.includes(v),
                            ),
                        ]);
                      }
                    }}
                  >
                    全选
                  </Checkbox>
                  <div>
                    {item.list.map((obj) => {
                      return (
                        <>
                          <Checkbox
                            checked={checkedList.includes(obj.key) > 0}
                            style={{ width: '150px' }}
                            onChange={(e) => {
                              if (e.target.checked) {
                                // 选中
                                checkedList.push(obj.key);
                                setCheckedList([...checkedList]);
                              } else {
                                // 取消选中
                                checkedList.splice(
                                  checkedList.indexOf(obj.key),
                                  1,
                                );
                                setCheckedList([...checkedList]);
                              }
                            }}
                          >
                            {obj.title}
                          </Checkbox>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
            <h3></h3>
          </div>
        }
      >
        <Button type="link">显示字段</Button>
      </Popover>
    </>
  );
};

export default FieldSet;
