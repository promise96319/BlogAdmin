import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

import ArticleSearch from '../ArticleSearch';
import ArticleCategory from '../ArticleCategory';

export default () => (
  <div className={styles.container}>
    <div id="components-grid-demo-flex">
      <div>
        <Row type="flex" justify="start" gutter={20}>
          <Col span={10}>
            <ArticleSearch></ArticleSearch>
          </Col>
          <Col span={10}>
            <ArticleCategory></ArticleCategory>
          </Col>
        </Row>
      </div>
    </div>
  </div>
);
