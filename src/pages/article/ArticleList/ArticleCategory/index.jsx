import React from 'react';
import { Select } from 'antd';
import styles from './index.less';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default () => (
  <div className={styles.container}>
    <div id="components-select-demo-basic">
      <div>
        <Select
          className="select"
          defaultValue="lucy"
          style={{
            width: 120,
            marginRight: 20,
          }}
          onChange={handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Select
          className="select"
          defaultValue="lucy"
          style={{
            width: 120,
          }}
        >
          <Option value="lucy">Lucy</Option>
        </Select>
      </div>
    </div>
  </div>
);
