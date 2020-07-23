import React, { useEffect } from 'react';
import { Layout, Spin, message } from 'antd';
import { history } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';
import { getQueryStringByName } from '@/utils/utils';
import { qcLogin } from './service';

const Auth2 = () => {

  useEffect(() => {
    const code = getQueryStringByName('code')
    if(code){
      handleGithubAccess(code)
    }
  }, [])

  const handleGithubAccess = async (code) => {
    try {
      const response = await qcLogin({ code });
      if(response.success) {
        history.push('/user-info')
        sessionStorage.setItem("USERINFO", JSON.stringify(response))
        message.success('扫码登录成功')
      } else {
        message.success('扫码登录失败')
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <Layout>
      <Layout.Content>
        {/* <div style={{textAlign:"center", marginTop:document.documentElement.clientHeight/2.7}}>
          <img style={{height:150, width:150}} src={require('../../../assets/images/message_board_01.jpg')} alt="message_board_01"/>
        </div> */}
        <div style={{textAlign:"center", marginTop:10}}>
          <Spin
            tip={'正在获取授权中......'}
            style={{fontSize:20}}
            indicator={<LoadingOutlined spin />}
          />
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default Auth2