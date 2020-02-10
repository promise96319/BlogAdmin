import React from 'react';
import { Input } from 'antd';
import styles from './index.less';

const { Search } = Input;
export default () => (
  <div className={styles.container}>
    <div id="components-input-demo-search-input">
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          enterButton
        />
      </div>
    </div>
  </div>
);
