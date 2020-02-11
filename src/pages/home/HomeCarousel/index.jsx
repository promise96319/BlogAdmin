import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table, Modal, Input, Form } from 'antd';
import styles from './index.less';

export default () => {
  const [loading, setLoading] = useState(true);
  const [isModalVisiable, setModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const columns = [
    {
      title: '排序',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '图片链接',
      dataIndex: 'age',
      key: 'age',
      render: text => <a href={text}>{text}</a>,
    },
    {
      title: '点击链接',
      dataIndex: 'address',
      key: 'address',
      render: text => <a href={text}>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Row gutter={10}>
          <Col><Button type="primary">编辑</Button></Col>
          <Col><Button type="danger">删除</Button></Col>
        </Row>
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

  const saveCategory = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true)
  };

  const closeModal = () => {
    setModal(false);
  };


  return (
    <PageHeaderWrapper content="首页轮播图信息编辑" className={styles.main}>
      <Button
        type="primary"
        onClick={() => {
          showModal();
        }}
      >
        新增轮播图
      </Button>
      <Table className={styles.table} columns={columns} dataSource={data} pagination={false} />

      <Modal
        title="编辑轮播图"
        visible={isModalVisiable}
        onOk={saveCategory}
        onCancel={closeModal}
      >
        <Form layout="horizonal">
          <Form.Item label="排序" labelCol={{span: 4}} wrapperCol={{span: 18}}>
            <Input placeholder="请输入数字" />
          </Form.Item>
          <Form.Item label="标题" labelCol={{span: 4}} wrapperCol={{span: 18}}>
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label="图片链接" labelCol={{span: 4}} wrapperCol={{span: 18}}>
            <Input placeholder="请输入图片链接" />
          </Form.Item>
          <Form.Item label="点击链接" labelCol={{span: 4}} wrapperCol={{span: 18}}>
            <Input placeholder="请输入点击链接" />
          </Form.Item>
        </Form>
      </Modal>
    </PageHeaderWrapper>
  );
};
