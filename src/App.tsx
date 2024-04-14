/*
 * @Description: Post-ERCP-Cholecustitis Discrimination计算页面
 * @Author: renlirong
 * @Date: 2024-04-12 10:08:40
 * @LastEditTime: 2024-04-14 15:41:42
 * @LastEditors: renlirong
 */
import React, { useState } from 'react';
import './App.css';
import { Button, Form, FormProps, Input, Layout, Card,Col, Row, Statistic, Select } from 'antd';

import {
  FrownOutlined,
  MehOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;
const layoutStyle: React.CSSProperties = {
  minHeight: '100vh', // Ensures the layout covers the entire viewport height
  display: 'flex',
  flexDirection: 'column',
};

const contentStyle: React.CSSProperties = {
  flex: 1, // Allows the content to take up remaining space
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#f0f5ff',
};

const headerStyle: React.CSSProperties = {
  flexShrink: 0, // Prevents the header from shrinking
  textAlign: 'center',
  color: '#fff',
  height: 200,
  lineHeight: '64px',
  backgroundColor: '#2f54eb',
  padding: '3.5rem',
  fontSize: '2.5rem', // Increased font size for the header text
};

const footerStyle: React.CSSProperties = {
  flexShrink: 0, // Prevents the footer from shrinking
  textAlign: 'center',
  color: '#fff',
  height: 25,
  backgroundColor: '#adc6ff',
};



const getScore = (param: number | string, scores: [number, number]) => {
  const value = parseFloat(param as string);
  if (value < scores[0]) return 1;
  if (value < scores[1]) return 2;
  return 3;
};




const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function ResultCard({ resultScore, formVisible,returnForm}: { resultScore: number | null,formVisible:boolean,returnForm: () => void  }) {
  const resultCardStyle: React.CSSProperties = {
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '8%',
    marginRight: '8%',
    paddingLeft: '1%',
    display :formVisible?'none':'block',
  };
  if (resultScore === null) return null;

  // const returnForm=()=>{
  //   setFormVisible(true);
  // }

  return (
    <Card bordered={false} style={resultCardStyle}>
      <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Score" value={resultScore}  />
    </Col>
    <Col span={12}>
      <Statistic title="Rank" value={resultScore<165?'Low Risk':(resultScore>=230?'High Risk':'Medium Risk')}  prefix={resultScore<165?<SmileOutlined />:(resultScore>=230?<FrownOutlined />:<MehOutlined />)} />
    </Col>
  </Row>
  <Button onClick={returnForm}>Return</Button>
    </Card>
  );
}

function App() {
  const [resultScore, setResult] = useState<number | null>(null);
  const [formVisible,setFormVisible] = useState<boolean>(true);

  const cardStyle: React.CSSProperties = {
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '8%',
    marginRight: '8%',
    paddingLeft: '1%',
    display:formVisible?'block':'none',
  };

  const returnForm=()=>{
    setFormVisible(true);
  }
  // 提交按钮
  const onFinish: FormProps["onFinish"] = (values) => {
    const { age, CysC, ALB, SCr, SMD, LAMA_SMA, CVDs, Diabetes } = values;
  
    // 计算各个参数的得分
    const ageScore = getScore(age, [48, 61]);
    const CysCScore = getScore(CysC, [4.12, 5.48]);
    const ALBScore = getScore(ALB, [30.6, 35.5]);
    const SCrScore = getScore(SCr, [681, 917.2]);
    const SMDScore = getScore(SMD, [43.99, 27.57]);
    const LAMA_SMAScore = getScore(LAMA_SMA, [0.33, 0.54]);
    const CVDScore = CVDs === "Yes" ? 1 : 0;
    const DiabetesScore = Diabetes === "Yes" ? 1 : 0;
  
    // 计算患者的风险得分
    const result =
      22.961 * ageScore +
      17.229 * CysCScore +
      15.297 * ALBScore +
      14.44 * SCrScore +
      12.587 * SMDScore +
      12.377 * LAMA_SMAScore +
      3.113 * CVDScore +
      1.996 * DiabetesScore;
  
    console.log('Result Score:', result);
    setResult(result);
    setFormVisible(false);
  };
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Death risk stratification of  initial-dialysis patients</Header>
      <Content style={contentStyle}>
         <Card bordered={false} style={ cardStyle}>
          {/* <p style={{textAlign:'left'}}>Please input data in the text form:</p> */}
          <Form
    name="basic"
    labelCol={{ span:24 }}
    wrapperCol={{ span: 24 }}
    // style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
     <Row>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="Age"
      name="age"
      rules={[{ required: true, message: 'Please input age!' }]}
    >
      <Input suffix="years"/>
    </Form.Item>
      </Col>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="CysC"
      name="CysC"
      rules={[{ required: true, message: 'Please input CysC!' }]}
    >
      <Input suffix="mg/L"/>
    </Form.Item>
      </Col>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="ALB"
      name="ALB"
      rules={[{ required: true, message: 'Please input ALB!' }]}
    >
      <Input suffix="g/L"/>
    </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="SCr"
      name="SCr"
      rules={[{ required: true, message: 'Please input SCr!' }]}
    >
      <Input suffix="μmol/L"/>
    </Form.Item>
      </Col>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="SMD"
      name="SMD"
      rules={[{ required: true, message: 'Please input SMD!' }]}
    >
      <Input suffix="Hu" />
    </Form.Item>
      </Col>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="LAMA/SMA"
      name="LAMA_SMA"
      rules={[{ required: true, message: 'Please input LAMA/SMA!' }]}
    >
      <Input suffix="Hu"/>
    </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="CVDs"
      name="CVDs"
      rules={[{ required: true, message: 'Please select CVDs!' }]}
    >
       <Select
      // style={{ width: 120 }}
      // onChange={handleChange}
      options={[
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
      ]}
    />
    </Form.Item>
      </Col>
      <Col span={8} style={{paddingRight:'2rem'}}>
      <Form.Item
      label="Diabetes"
      name="Diabetes"
      rules={[{ required: true, message: 'Please select Diabetes!' }]}
    >
      <Select
      options={[
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
      ]}
    />
    </Form.Item>
      </Col>
    </Row>
    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
      <Row>
      <Col span={12}><Button type="primary" htmlType="submit" >
        Submit
      </Button></Col>
      <Col span={12} ><Button htmlType="reset">Reset</Button></Col>
      
      </Row>
    </Form.Item>
    
  </Form>
  </Card>
  <ResultCard resultScore={resultScore} formVisible={formVisible} returnForm={returnForm}/>
      </Content>
      <Footer style={footerStyle}>Copyright © 2024 - Southeast University·All Rights Reserved</Footer>
    </Layout>
  );
}

export default App;
