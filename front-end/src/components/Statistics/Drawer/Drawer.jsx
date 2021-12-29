import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer as DrawerAntd,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from 'antd';

import {} from './styled';

const { Option } = Select;

class Drawer extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    handleAddTransaction: PropTypes.func.isRequired,
  };

  handleSubmit = formData => {
    const { closeDrawer, handleAddTransaction } = this.props;
    console.log(formData);

    closeDrawer();
    handleAddTransaction();
  };

  render() {
    const { visible, closeDrawer } = this.props;

    return (
      <DrawerAntd
        title='Добавить транзакцию'
        width={720}
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Отмена</Button>
            <Button type='primary' htmlType='submit' form='addTransaction'>
              Принять
            </Button>
          </Space>
        }>
        <Form
          layout='vertical'
          name='addTransaction'
          onFinish={this.handleSubmit}
          onFinishFailed={data => console.log('onFinishFailed: ', data)}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='name'
                label='Название'
                rules={[{ required: true, message: 'Пожалуйста добавьте название криптоактива' }]}>
                <Select placeholder='Выберите название криптоактива' defaultValue='xrp'>
                  <Option value='xrp'>Ripple (XRP)</Option>
                  <Option value='btc'>Bitcoin (BTC)</Option>
                  <Option value='eth'>Etherium (ETH)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='url'
                label='Url'
                rules={[{ required: true, message: 'Please enter url' }]}>
                <Input
                  style={{ width: '100%' }}
                  addonBefore='http://'
                  addonAfter='.com'
                  placeholder='Please enter url'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='owner'
                label='Owner'
                rules={[{ required: true, message: 'Please select an owner' }]}>
                <Select placeholder='Please select an owner'>
                  <Option value='xiao'>Xiaoxiao Fu</Option>
                  <Option value='mao'>Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='type'
                label='Type'
                rules={[{ required: true, message: 'Please choose the type' }]}>
                <Select placeholder='Please choose the type'>
                  <Option value='private'>Private</Option>
                  <Option value='public'>Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='approver'
                label='Approver'
                rules={[{ required: true, message: 'Please choose the approver' }]}>
                <Select placeholder='Please choose the approver'>
                  <Option value='jack'>Jack Ma</Option>
                  <Option value='tom'>Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='dateTime'
                label='Время покупки'
                rules={[{ required: true, message: 'Пожалуйста выберите дату' }]}>
                <DatePicker
                  showTime
                  placeholder='Выберите дату'
                  style={{ width: '100%' }}
                  getPopupContainer={trigger => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DrawerAntd>
    );
  }
}

export default Drawer;
