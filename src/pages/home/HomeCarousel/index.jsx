import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table, Modal, Input, InputNumber, Form, message } from 'antd';
import styles from './index.less';
import { getCarouselList, editCarousel, deleteCarouselByID } from '@/services/carousel';

export default props => {
  const [isModalVisiable, setModal] = useState(false);
  const [carouselList, setCarouselList] = useState([]);

  const [currentID, setCurrentID] = useState(null);
  const [currentOrderNumber, setCurrentOrderNumber] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentImageSrc, setCurrentImageSrc] = useState('');
  const [currentClickLink, setCurrentClickLink] = useState('');

  // 获取轮播图数据
  const getCarouselData = async () => {
    const res = await getCarouselList();
    if (!res) { return }
    const carouselList = res.map((item, index) => {
      item.key = index;
      return item;
    });
    setCarouselList(carouselList);
  };

  useEffect(() => {
    getCarouselData();
  }, []);

  const saveCategory = async () => {
    if (!currentOrderNumber) {
      message.error('「排序」不能为空');
      return;
    }

    if (!currentTitle) {
      message.error('「标题」不能为空');
      return;
    }

    if (!currentImageSrc) {
      message.error('「图片链接」不能为空');
      return;
    }

    if (!currentClickLink) {
      message.error('「点击链接」不能为空');
      return;
    }

    const data = currentID
      ? {
          id: currentID,
          order_number: currentOrderNumber,
          title: currentTitle,
          image_src: currentImageSrc,
          click_link: currentClickLink,
        }
      : {
          order_number: currentOrderNumber,
          title: currentTitle,
          image_src: currentImageSrc,
          click_link: currentClickLink,
        };

    const result = await editCarousel(data);
    if (!result) { return }
    if (result.addSuccess) {
      getCarouselData();
      setModal(false);
      message.success('添加成功');
    }

    if (result.updateSuccess) {
      getCarouselData();
      setModal(false);
      message.success('更新成功');
    }
  };

  const deleteCategory = async (id) => {
    const result = await deleteCarouselByID({ id })
    if (!result) { return }
    if (result && result.deleteSuccess) {
      message.success('删除成功')
      getCarouselData()
    }
  }

  const columns = [
    {
      title: '排序',
      dataIndex: 'order_number',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '图片链接',
      dataIndex: 'image_src',
      key: 'image_src',
      render: text => <a href={text}>{text}</a>,
    },
    {
      title: '点击链接',
      dataIndex: 'click_link',
      key: 'click_link',
      render: text => <a href={text}>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      render: item => (
        <Row gutter={10}>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setCurrentID(item.id);
                setCurrentOrderNumber(item.order_number);
                setCurrentTitle(item.title);
                setCurrentImageSrc(item.image_src);
                setCurrentClickLink(item.click_link);
                setModal(true);
              }}
            >
              编辑
            </Button>
          </Col>
          <Col>
            <Button type="danger" onClick={() => {deleteCategory(item.id)}}>删除</Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <PageHeaderWrapper content="首页轮播图信息编辑" className={styles.main}>
      <Button
        type="primary"
        onClick={() => {
          setCurrentID(null);
          setModal(true);
        }}
      >
        新增轮播图
      </Button>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={carouselList}
        pagination={false}
      />

      <Modal
        title="编辑轮播图"
        visible={isModalVisiable}
        onOk={saveCategory}
        onCancel={() => {
          setModal(false);
        }}
      >
        <Form layout="horizonal">
          <Form.Item label="排序" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
            <InputNumber
              min={1}
              max={100}
              defaultValue={currentOrderNumber}
              placeholder="数字"
              onChange={e => {
                setCurrentOrderNumber(e);
              }}
            />
          </Form.Item>
          <Form.Item label="标题" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
            <Input
              value={currentTitle}
              placeholder="请输入标题"
              onChange={e => {
                setCurrentTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="图片链接" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
            <Input
              value={currentImageSrc}
              placeholder="请输入图片链接"
              onChange={e => {
                setCurrentImageSrc(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="点击链接" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
            <Input
              value={currentClickLink}
              placeholder="请输入点击链接"
              onChange={e => {
                setCurrentClickLink(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageHeaderWrapper>
  );
};
