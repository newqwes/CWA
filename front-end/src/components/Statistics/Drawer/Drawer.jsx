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

class Drawer extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    handleAddTransaction: PropTypes.func.isRequired,
    handleAddTransactions: PropTypes.func.isRequired,
  };

  handleSubmit = ({ name, dateTime, price, count }) => {
    const { closeDrawer, handleAddTransaction } = this.props;

    closeDrawer();
    handleAddTransaction({ name, price, count, date: dateTime && dateTime.format() });
  };

  handleSubmitTransactions = ({ list }) => {
    const { closeDrawer, handleAddTransactions } = this.props;

    closeDrawer();
    handleAddTransactions({ list });
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
        <Form layout='vertical' name='addTransaction' onFinish={this.handleSubmit}>
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
              <Form.Item name='dateTime' label='Время покупки'>
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
                <InputNumber style={{ width: '100%' }} defaultValue='0' step='1' stringMode />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Form layout='vertical' name='addTransactions' onFinish={this.handleSubmitTransactions}>
          <Row>
            <Col span={12} offset={6}>
              <Form.Item
                name='list'
                label='Список транзакций'
                rules={[{ required: true, message: 'Пожалуйста добавьте список' }]}>
                <Input.TextArea rows={20} placeholder='Выберите название криптоактива' />
              </Form.Item>
              <Button type='primary' htmlType='submit' form='addTransactions'>
                Принять список
              </Button>
            </Col>
          </Row>
        </Form>
      </DrawerAntd>
    );
  }
}

export default Drawer;
