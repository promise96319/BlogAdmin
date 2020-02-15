import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Tag, Input, Select, Button} from 'antd';
import styles from './index.less';
import { getArticleList } from '@/services/article';
import { getCategoryList } from '@/services/category';
import { getTagList } from '@/services/tag';
import router from 'umi/router'

const { Search } = Input;
const { Option } = Select;

export default () => {
  const [articleList, setArticleList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [selectedTag, setSelectedTag] = useState(-1)

  const getArticleData = async (params) => {
    const result = await getArticleList(params);

    if (!result) { return }

    const articleList = result.map((item, index) => {
      item.key = index;
      return item;
    });
    setArticleList(articleList);
  };

  const getCategoryData = async () => {
    const result = await getCategoryList();

    if (!result) { return }
    setCategoryList(result);
  };

  const getTagData = async () => {
    const result = await getTagList();

    if (!result) { return }
    setTagList(result);
  };

  useEffect(() => {
    getArticleData();
    getCategoryData();
    getTagData();
  }, []);

  const handleCategoryChange = e => {
    if (e === selectedCategory) { return }
    setSelectedCategory(e)
    setSelectedTag(-1)
    
    if (e === -1) {
      getArticleData()
    } else {
      getArticleData({ categoryID: e })
    }
  }

  const handleTagChange = e => {
    if (e === selectedTag) { return }
    setSelectedTag(e)
    setSelectedCategory(-1)

    if (e === -1) {
      getArticleData()
    } else {
      getArticleData({ tagID: e })
    }
  }

  const columns = [
    {
      title: '发布时间',
      dataIndex: 'add_time',
      key: 'add_time',
      render: text => new Date(text).toLocaleDateString(),
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '文章类别',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: '文章作者',
      dataIndex: 'author_name',
      key: 'author_name',
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
      render: (item) => (
        <Button type="primary" onClick={() => {
          router.push(`/article/update/${item.id}`)
        }}>编辑</Button>
      ),
    },
  ];

  return (
    <PageHeaderWrapper content="展示所有的文章信息" className={styles.main}>
      <Row type="flex" justify="start" gutter={20}>
        {/* <Col span={10}>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            enterButton
          />
        </Col> */}
        <Col>
          文章类别
          <Select className={styles.select} defaultValue={selectedCategory} onChange={handleCategoryChange}>
            <Option value={-1} key="-1">所有分类</Option>
            {categoryList.map((item, index) => {
              return <Option value={item.id} key={index}>{item.category_name}</Option>;
            })}
          </Select>
        </Col>
        <Col>
          文章标签
          <Select className={styles.select} defaultValue={selectedTag} onChange={handleTagChange}>
            <Option value={-1} key="-1">所有标签</Option>
            {tagList.map((item, index) => {
              return <Option value={item.id} key={index}>{item.tag_name}</Option>;
            })}
          </Select>
        </Col>
      </Row>

      <Table columns={columns} dataSource={articleList} />
    </PageHeaderWrapper>
  );
};
