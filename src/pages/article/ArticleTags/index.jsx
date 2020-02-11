import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input } from 'antd';
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
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>编辑</a>
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
    <PageHeaderWrapper content="编辑文章的标签信息" className={styles.main}>
      <Button
        type="primary"
        onClick={() => {
          showModal();
        }}
      >
        新增标签
      </Button>
      <Table className={styles.table} columns={columns} dataSource={data} pagination={false} />

      <Modal
        title="编辑文章标签名称"
        visible={isModalVisiable}
        onOk={saveCategory}
        onCancel={closeModal}
      >
        <Input placeholder="请输入标签名称"></Input>
      </Modal>
    </PageHeaderWrapper>
  );
};
