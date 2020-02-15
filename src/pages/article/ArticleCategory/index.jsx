import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, message } from 'antd';
import styles from './index.less';
import { getCategoryList, editCategory } from '@/services/category';

const ArticleCategory = () => {
  const [isModalVisiable, setModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [currentID, setCurrentID] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState('');

  const getCategoryData = async () => {
    const result = await getCategoryList();

    if (!result) { return }
  
    const categoryList = result.map((item, index) => {
      item.key = index;
      return item;
    });
    setCategoryList(categoryList);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const saveCategory = async () => {
    if (!currentCategoryName) {
      message.error('类名不能为空')
    }

    const params = currentID
      ? {
        id: currentID,
        category_name: currentCategoryName
      }
      : {
        category_name: currentCategoryName  
      }

    const result = await editCategory(params)
    
    if (!result) { return }

    if (result.addSuccess) {
      message.success('添加成功')
      getCategoryData()
      setModal(false)
    }

    if (result.updateSuccess) {
      message.success('更新成功')
      getCategoryData()
      setModal(false)
    }
  };

  const columns = [
    {
      title: '文章类名',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: '操作',
      key: 'action',
      render: item => (
        <Button
          type="primary"
          onClick={() => {
            setCurrentID(item.id);
            setCurrentCategoryName(item.category_name)
            setModal(true);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];

  return (
    <PageHeaderWrapper content="编辑文章分类信息" className={styles.main}>
      <Button
        type="primary"
        onClick={() => {
          setCurrentID(null);
          setModal(true);
        }}
      >
        新增分类
      </Button>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={categoryList}
        pagination={false}
      />

      <Modal
        title="编辑文章分类名称"
        visible={isModalVisiable}
        onOk={saveCategory}
        onCancel={() => {
          setModal(false);
        }}
      >
        <Input
          placeholder="请输入分类名称"
          value={currentCategoryName}
          onChange={e => {
            setCurrentCategoryName(e.target.value);
          }}
        ></Input>
      </Modal>
    </PageHeaderWrapper>
  );
};

export default ArticleCategory;
