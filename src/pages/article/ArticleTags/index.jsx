import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, message } from 'antd';
import styles from './index.less';
import { getTagList, editTag } from '@/services/tag';

export default () => {
  const [loading, setLoading] = useState(true);
  const [isModalVisiable, setModal] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [currentID, setCurrentID] = useState(null);
  const [currentTagName, setCurrentTagName] = useState('');

  const getTagData = async () => {
    const result = await getTagList();

    if (!result) { return }

    const tagList = result.map((item, index) => {
      item.key = index;
      return item;
    });
    setTagList(tagList);
  };

  useEffect(() => {
    getTagData();
  }, []);

  const saveTag = async () => {
    if (!currentTagName) {
      message.error('标签名不能为空');
    }

    const params = currentID
      ? {
          id: currentID,
          tag_name: currentTagName,
        }
      : {
          tag_name: currentTagName,
        };

    const result = await editTag(params);

    if (!result) { return }

    if (result.addSuccess) {
      message.success('添加成功');
      getTagData();
      setModal(false);
    }

    if (result.updateSuccess) {
      message.success('更新成功');
      getTagData();
      setModal(false);
    }
  };

  const columns = [
    {
      title: '标签名称',
      dataIndex: 'tag_name',
      key: 'tag_name',
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => (
        <Button type="primary" onClick={() => {
          setCurrentID(item.id)
          setCurrentTagName(item.tag_name)
          setModal(true)
        }}>编辑</Button>
      ),
    },
  ];

  return (
    <PageHeaderWrapper content="编辑文章的标签信息" className={styles.main}>
      <Button
        type="primary"
        onClick={() => {
          setCurrentID(null);
          setModal(true);
        }}
      >
        新增标签
      </Button>
      <Table className={styles.table} columns={columns} dataSource={tagList} pagination={false} />

      <Modal
        title="编辑文章标签名称"
        visible={isModalVisiable}
        onOk={saveTag}
        onCancel={() => {setModal(false)}}
      >
        <Input
          placeholder="请输入标签名称"
          value={currentTagName}
          onChange={e => {
            setCurrentTagName(e.target.value);
          }}
        ></Input>
      </Modal>
    </PageHeaderWrapper>
  );
};
