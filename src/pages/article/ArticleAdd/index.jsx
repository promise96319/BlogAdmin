import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Radio, Select, Modal, Icon, message } from 'antd';
import styles from './index.less';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { getCategoryList } from '@/services/category';
import { getTagList } from '@/services/tag';
import { editArticle, getArticleList } from '@/services/article';

const { Option } = Select;
const { TextArea } = Input;

export default props => {
  const [isArticleEditorVisible, setArticleEditorVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const [content, setContent] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [categoryName, setCategoryName] = useState(-1);
  const [tagName, setTagName] = useState([]);

  const currentID = props.match.params.id;

  const getCategoryData = async () => {
    const result = await getCategoryList();

    if (!result) {
      return;
    }

    setCategoryList(result);
  };

  const getTagData = async () => {
    const result = await getTagList();

    if (!result) {
      return;
    }
    setTagList(result);
  };

  const getArticleDataByID = async () => {
    const result = await getArticleList({id: currentID})
    if (!result) {
      return;
    }
    setTitle(result.title)
    setDescription(result.description)
    setAuthorName(result.author_name)
    setImageSrc(result.image_src)
    setCategoryName(result.category_id)
    setTagName(result.tags_id)
    setContent(result.content)
  }

  useEffect(() => {
    getCategoryData();
    getTagData();

    if (currentID) {
      getArticleDataByID()
    }
  }, []);

  const toggleArticleEditor = () => {
    setArticleEditorVisible(!isArticleEditorVisible);
  };

  const changeContent = e => {
    setContent(e.target.value);
    setContentHtml(marked(e.target.value));
  };

  const saveArticle = async () => {
    if (title === '') {
      message.error('文章标题不能为空');
      return;
    }
    if (description === '') {
      message.error('文章简介不能为空');
      return;
    }
    if (authorName === '') {
      message.error('文章作者不能为空');
      return;
    }
    if (imageSrc === '') {
      message.error('首图链接不能为空');
      return;
    }

    if (categoryName === -1) {
      message.error('请选择文章分类');
      return;
    }

    if (tagName.length === 0) {
      message.error('请选择文章标签');
      return;
    }

    if (content === '') {
      message.error('请编辑文章内容');
      return;
    }

    let params = {
      title,
      description,
      author_name: authorName,
      image_src: imageSrc,
      category_id: categoryName,
      tags_id: tagName,
      content: content,
    };

    if (currentID) {
      params = { ...params, id: currentID };
    } else {
      let da = new Date()
      let addTime = da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds()
      params = {
        ...params,
        add_time: addTime
      }
    }

    const result = await editArticle(params)
    if (!result) {
      return
    }

    if (result.addSuccess) {
      message.success('添加成功')
    }

    if (result.updateSuccess) {
      message.success('更新成功')
    }
  };

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    },
  });

  return (
    <div>
      <Form layout="horizonal">
        <Form.Item label="文章标题" {...formItemLayout}>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="请输入文章标题(不得超过60字)"
          />
        </Form.Item>
        <Form.Item label="文章简介" {...formItemLayout}>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="请输入文章简介(不得超过100字)"
          />
        </Form.Item>
        <Form.Item label="作者姓名" {...formItemLayout}>
          <Input
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            placeholder="请输入作者姓名(不得超过20字)"
          />
        </Form.Item>
        <Form.Item label="首图链接" {...formItemLayout}>
          <Input
            value={imageSrc}
            onChange={e => setImageSrc(e.target.value)}
            placeholder="请输入首图链接"
          />
        </Form.Item>
        <Form.Item label="文章分类" {...formItemLayout}>
          <Select
            value={categoryName}
            onChange={e => {
              setCategoryName(e);
            }}
            placeholder="请选择文章分类"
          >
            <Option value={-1} key={-1}>
              未选择
            </Option>
            {categoryList.map((item, index) => {
              return (
                <Option value={item.id} key={index}>
                  {item.category_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="文章标签" {...formItemLayout}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择文章标签(最好控制在五个以内)"
            value={tagName}
            onChange={e => {
              setTagName(e);
            }}
          >
            {tagList.map((item, index) => {
              return (
                <Option value={item.id} key={index}>
                  {item.tag_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="文章内容" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Button type="primary" onClick={toggleArticleEditor}>
            编辑文章
          </Button>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" size="large" onClick={saveArticle}>
            发布
          </Button>
        </Form.Item>
      </Form>

      {isArticleEditorVisible ? (
        <div className={styles.editor}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="default" onClick={toggleArticleEditor}>
                {/* <Icon type="left"></Icon> */}
                返回
              </Button>
            </Col>
            <Col>文章内容</Col>
            <Col>
              <Button type="primary" onClick={saveArticle}>
                {/* <Icon type="cloud"></Icon> */}
                发布
              </Button>
            </Col>
          </Row>
          <Row className={styles.container} gutter={20}>
            <Col span={12}>
              <TextArea
                className={styles.left}
                value={content}
                onChange={changeContent}
                placeholder="请输入文章内容"
                autoSize={{ minRows: 24 }}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div className={styles.right} dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
            </Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
};
