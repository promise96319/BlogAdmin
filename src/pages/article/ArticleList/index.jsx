import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Tag, Input, Select } from 'antd';
import styles from './index.less';

const { Search } = Input
const { Option } = Select

export default () => {
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: '文章ID',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '文章标题',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '文章类别',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '文章作者',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '文章标签',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>查看详情</a>
        </span>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleChange = (e) => {

  }

  return (
    <PageHeaderWrapper content="展示所有的文章信息" className={styles.main}>
      <Row type="flex" justify="start" gutter={20}>
        <Col span={10}>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
          />
        </Col>
        <Col span={10}>
        <Select
          className={styles.select}
          defaultValue="lucy"
          onChange={handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Select
          className={styles.select}
          defaultValue="lucy"
        >
          <Option value="lucy">Lucy</Option>
        </Select>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data} />
    </PageHeaderWrapper>
  );
};
