import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, message, Row, Col } from 'antd';
import styles from './Welcome.less';
import { set } from 'lodash';
import ReactJson from 'react-json-view';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => {

  const [dingUser, setDingUser] = useState('')
  const [redisUser, setRedisUser] = useState('')

  useEffect(() => {
    const userInfo = sessionStorage.getItem('USERINFO')
    if(userInfo) {
      const jsonUserInfo = JSON.parse(userInfo)
      console.log(jsonUserInfo)
      setRedisUser(JSON.stringify(jsonUserInfo.serverUserInfo))
      setDingUser(JSON.stringify(jsonUserInfo.dingUserInfo.content.data))
    }
  }, [])

  return (
    <Card>
      <Alert
        message="政务钉钉二维码登录测试"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Row gutter={8}>
        <Col span={12}>
          <Typography.Text strong>
            政务钉钉获取用户的数据{' '}
          </Typography.Text>
          <CodePreview>{ dingUser ? dingUser : '还没有政务钉钉的用户数据, 扫码登录获取'}</CodePreview>
          { dingUser ? <ReactJson
            // className={styles.reactJson}
            theme={'monokai'}
            src={JSON.parse(dingUser)}
          /> : null}
        </Col>
        <Col span={12}>
          <Typography.Text
            strong
            style={{
              marginBottom: 12,
            }}
          >
            数据库获取用户信息{' '}
          </Typography.Text>
          <CodePreview>{ redisUser ? redisUser : '还没有数据库的用户数据, 扫码登录获取'}</CodePreview>
          { redisUser ? <ReactJson
            // className={styles.reactJson}
            theme={'ashes'}
            src={JSON.parse(redisUser)}
          /> : null}
        </Col>
      </Row>
    </Card>
  )
};
