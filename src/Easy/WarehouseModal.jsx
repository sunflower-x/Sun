import { Select as SunSelect, TreeSelect } from 'Sun';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
} from 'antd';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import { useState } from 'react';

import './index.less';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
let timeout;
let currentValue;
const fetch = (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fake = () => {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then((response) => response.json())
      .then((d) => {
        if (currentValue === value) {
          const { result } = d;
          const data = result.map((item) => ({
            value: item[0],
            text: item[0],
          }));
          callback(data);
        }
      });
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const WarehouseModal = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const handleSeaerch = (newValue) => {
    fetch(newValue, setData);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values, 'value');
  };
  return (
    <>
      <Modal
        title="店仓选择"
        open={props.visible}
        onCancel={props.onCancel}
        onOk={props.onOk}
        width={1020}
      >
        <div style={{ display: 'flex' }}>
          {/* 左边查询条件 */}
          <div style={{ backgroundColor: '#eceef2', padding: '10px' }}>
            <Form
              {...formItemLayout}
              form={form}
              name="warehouseModal"
              onFinish={onFinish}
            >
              <div
                style={{
                  overflowY: 'scroll',
                  height: '500px',
                  width: '300px',
                }}
              >
                <Form.Item label="店仓类型" name="type">
                  <Select
                    allowClear
                    placeholder="请选择店仓类型"
                    options={[
                      { value: 1, label: '仓库' },
                      { value: 2, label: '店铺' },
                    ]}
                  ></Select>
                </Form.Item>
                {/* todo待完善Input组件，详情见zord.dianplus.cn */}
                <Form.Item label="店仓编码" name="code">
                  <Input placeholder="请输入店仓编码" />
                </Form.Item>
                <Form.Item label="店仓名称" name="name">
                  <Input placeholder="请输入店仓名称" />
                </Form.Item>
                <Form.Item label="店仓状态" name="status">
                  <Select
                    allowClear
                    placeholder="请选择店仓状态"
                    options={[
                      { value: 1, label: '全部' },
                      { value: 2, label: '启用' },
                      { value: 3, label: '停用' },
                      { value: 4, label: '已关闭' },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item label="店铺类型" name="category">
                  <Select
                    allowClear
                    placeholder="请选择店铺类型"
                    mode="multiple"
                    options={[
                      { value: 1, label: '直营' },
                      { value: 2, label: '联盟' },
                      { value: 3, label: '加盟' },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item label="销售区域" name="location">
                  {/* todo树组件需要添加全选和清空 */}
                  <TreeSelect
                    allowClear
                    placeholder="请选择"
                    style={{ width: '190px' }}
                    value={1}
                  ></TreeSelect>
                </Form.Item>
                <Form.Item label="省市区" name="province">
                  <Cascader options={options} placeholder="请选择" allowClear />
                </Form.Item>
                {/* todo后续需要调用自己接口，详情见zord.dianplus.cn */}
                <Form.Item label="所属渠道" name="channel">
                  <Select
                    allowClear
                    placeholder="请选择所属渠道"
                    value={value}
                    showSearch
                    onSearch={handleSeaerch}
                    onChange={handleChange}
                    options={(data || []).map((d) => ({
                      value: d.value,
                      label: d.text,
                    }))}
                  />
                </Form.Item>
                {/* todo后续需要调用自己接口，详情见zord.dianplus.cn */}
                <Form.Item label="店铺等级" name="level">
                  <SunSelect
                    mode="multiple"
                    placeholder="请选择"
                    style={{ width: '190px' }}
                    allowClear
                    option={[
                      {
                        value: '3',
                        label: 'A级',
                      },
                      {
                        value: '4',
                        label: 'B级',
                      },
                      {
                        value: '5',
                        label: 'C级',
                      },
                      {
                        value: '6',
                        label: 'D级',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="开业日期">
                  <RangePicker placeholder={['开始时间', '结束时间']} />
                </Form.Item>
                <Form.Item label="物业类型" name="shopType">
                  <SunSelect
                    style={{ width: '190px' }}
                    mode="multiple"
                    placeholder="请选择"
                    allowClear
                    option={[
                      {
                        value: '3',
                        label: '百货/商超',
                      },
                      {
                        value: '4',
                        label: '购物中心/MALL',
                      },
                      {
                        value: '5',
                        label: '街铺',
                      },
                      {
                        value: '6',
                        label: '步行街',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="收银类型" name="cashType">
                  <Select
                    options={[
                      { value: 1, label: '商场收银' },
                      { value: 2, label: '自收银' },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item label="店仓联盟" name="union">
                  <Select
                    options={[
                      { value: 1, label: '联盟内' },
                      { value: 2, label: '联盟外' },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item label="正特价" name="special">
                  <Select
                    options={[
                      { value: 1, label: '正价店' },
                      { value: 2, label: '特价店' },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item label="库存管控" name="control">
                  <Select
                    options={[
                      { value: 1, label: '管控' },
                      { value: 2, label: '不管控' },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item label="进销存结转" name="control">
                  <Select
                    options={[
                      { value: 1, label: '开启' },
                      { value: 2, label: '不开启' },
                    ]}
                  ></Select>
                </Form.Item>
              </div>
              <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                <Space style={{ paddingTop: '10px' }}>
                  <Button onClick={onReset}>清空</Button>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
          {/* 右边显示数据 */}
          <div style={{ width: '680px' }}>
            <Table
              size="small"
              rowSelection
              rowKey="id"
              pagination={{ position: ['bottomLeft'], pageSize: 13 }}
              dataSource={[
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
                {
                  key: '1',
                  id: '123',
                  code: 'John Brown',
                  name: 'aaa店仓',
                },
                {
                  key: '2',
                  id: '456',
                  code: 'Jim Green',
                  name: 'xxx店仓',
                },
              ]}
              columns={[
                {
                  title: '店仓编码',
                  width: 100,
                  dataIndex: 'code',
                  key: 'code',
                  fixed: 'left',
                },
                {
                  title: '店仓名称',
                  width: 140,
                  dataIndex: 'name',
                  key: 'name',
                  fixed: 'left',
                },
              ]}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WarehouseModal;
