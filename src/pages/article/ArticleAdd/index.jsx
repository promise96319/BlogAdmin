import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import FormLayout from './FormLayout';
export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <FormLayout />
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      ></div>
    </PageHeaderWrapper>
  );
};
