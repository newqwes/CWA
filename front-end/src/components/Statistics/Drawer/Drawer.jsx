import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer as DrawerAntd,
  Form,
  Button,
  Col,
  Row,
  InputNumber,
  Input,
  DatePicker,
  Space,
} from 'antd';

import {} from './styled';

class Drawer extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    handleAddTransaction: PropTypes.func.isRequired,
  };

  handleSubmit = ({ name, dateTime, price, count }) => {
    const { closeDrawer, handleAddTransaction } = this.props;

    closeDrawer();
    handleAddTransaction({ name, price, count, date: dateTime.format() });
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
                label='Символ токена'
                rules={[{ required: true, message: 'Пожалуйста добавьте название криптоактива' }]}>
                <Input placeholder='Выберите название криптоактива' />
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='price'
                label='Цена покупки'
                rules={[{ required: true, message: 'Пожалуйста введите цену' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue='0'
                  min='0'
                  step='1'
                  stringMode
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='count'
                label='Количество'
                rules={[{ required: true, message: 'Пожалуйста введите количество' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue='0'
                  min='0'
                  step='1'
                  stringMode
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
