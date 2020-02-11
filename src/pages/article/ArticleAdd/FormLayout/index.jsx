import React from 'react';
import { Row, Col, Form, Input, Button, Radio, Select, Modal, Icon } from 'antd';
import styles from './index.less';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import LocaleProvider from 'antd/lib/locale-provider';

const { Option } = Select;
const { TextArea } = Input;

class FormLayoutDemo extends React.Component {
  state = {
    isArticleEditorVisible: false,
    content: '',
    contentHtml: '',
  };

  toggleArticleEditor = () => {
    this.setState({
      isArticleEditorVisible: !this.state.isArticleEditorVisible,
    });
  };

  changeContent = e => {
    let html = marked(e.target.value);
    this.setState({
      content: e.target.value,
      contentHtml: html,
    });
  };

  render() {
    const { isArticleEditorVisible, content, contentHtml } = this.state;

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
            <Input placeholder="请输入文章标题(不得超过60字)" />
          </Form.Item>
          <Form.Item label="文章简介" {...formItemLayout}>
            <Input placeholder="请输入文章简介(不得超过100字)" />
          </Form.Item>
          <Form.Item label="作者姓名" {...formItemLayout}>
            <Input placeholder="请输入作者姓名(不得超过20字)" />
          </Form.Item>
          <Form.Item label="首图链接" {...formItemLayout}>
            <Input placeholder="请输入首图链接" />
          </Form.Item>
          <Form.Item label="文章分类" {...formItemLayout}>
            <Select defaultValue="lucy" placeholder="请选择文章分类">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item label="文章标签" {...formItemLayout}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择文章标签(最后控制在五个以内)"
              defaultValue={['a10', 'c12']}
            >
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
                return <Option key={index}>{item}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item label="文章内容" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Button type="primary" onClick={this.toggleArticleEditor}>
              编辑文章
            </Button>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" size="large">
              发布
            </Button>
          </Form.Item>
        </Form>

        {isArticleEditorVisible ? (
          <div className={styles.editor}>
            <Row type="flex" justify="space-between">
              <Col>
                <Button type="default" onClick={this.toggleArticleEditor}>
                  {/* <Icon type="left"></Icon> */}
                  返回
                </Button>
              </Col>
              <Col>文章内容</Col>
              <Col>
                <Button type="primary" onClick={this.toggleArticleEditor}>
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
                  onChange={this.changeContent}
                  placeholder="请输入文章内容"
                  autoSize={{ minRows: 24 }}
                ></TextArea>
              </Col>
              <Col span={12}>
                <div
                  className={styles.right}
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                ></div>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-layout">
      <FormLayoutDemo />
    </div>
  </div>
);
