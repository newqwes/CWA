import React from 'react';
import PropTypes from 'prop-types';
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Drawer as DrawerAntd,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
} from 'antd';
import { map, take } from 'lodash/fp';
import { isArray } from 'lodash';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { coingeckoAPI } from '../../../api';
import { OptionImg } from '../../Calculator/styled';

class Drawer extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    handleAddTransaction: PropTypes.func.isRequired,
    handleAddTransactions: PropTypes.func.isRequired,
  };

  state = {
    selectedCoinName: '',
    coins: [],
    loading: false,
    timesOnFocusMoreThanOne: false,
  };

  optoinsComponents = map(
    ({ label, value, smallImg }) => ({
      value,
      label: (<div key={value}>
        <OptionImg src={smallImg} alt={label}/>
        <span>{label}</span>
      </div>),
    }),
  );

  onSearchCoin = debounce(async (coin = ' ') => {
    this.setState({ loading: true });
    const coins = await coingeckoAPI.searchCoin(coin);

    if (!isArray(coins)) {
      this.setState({ loading: false });
      return;
    }

    this.setState({ coins: take(20, coins), loading: false });
  }, 300);

  handleSubmit = ({ coinId, dateTime, price, count }) => {
    const { closeDrawer, handleAddTransaction } = this.props;

    closeDrawer();
    handleAddTransaction({
      coinId,
      price,
      count,
      date: dateTime && dateTime.format(),
    });
  };

  handleSubmitTransactions = ({ list }) => {
    const { closeDrawer, handleAddTransactions } = this.props;

    closeDrawer();
    handleAddTransactions({ list });
  };

  onSelectCoin = (coin) => {
    this.setState({ selectedCoinName: coin });
  };

  onFocusCoin = () => {
    const { timesOnFocusMoreThanOne } = this.state;

    if (timesOnFocusMoreThanOne) {
      return;
    }

    this.setState({ timesOnFocusMoreThanOne: true });
    this.onSearchCoin();
  };

  render() {
    const { visible, closeDrawer } = this.props;
    const { selectedCoinName, coins, loading } = this.state;
    return (
      <DrawerAntd
        title="Добавить транзакцию"
        width={720}
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Отмена</Button>
            <Button type="primary" htmlType="submit" form="addTransaction">
              Принять
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          name="addTransaction"
          onFinish={this.handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="coinId"
                label="ID монеты"
                rules={[
                  { required: true, message: 'Пожалуйста добавьте ID монеты' },
                ]}
              >
                <AutoComplete
                  value={selectedCoinName}
                  options={this.optoinsComponents(coins)}
                  onSelect={this.onSelectCoin}
                  onSearch={this.onSearchCoin}
                  onFocus={this.onFocusCoin}
                  notFoundContent={loading ? <Spin size='small'/> : null}
                  placeholder="Введите ID монеты из coingecko.com"
                >
                  <Input.Search/>
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dateTime" label="Время покупки">
                <DatePicker
                  showTime
                  defaultValue={dayjs()}
                  placeholder="Выберите дату"
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Цена покупки"
                rules={[{ required: true, message: 'Пожалуйста введите цену' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue="0"
                  min="0"
                  step="1"
                  stringMode
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="count"
                label="Количество"
                rules={[
                  { required: true, message: 'Пожалуйста введите количество' },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue="0"
                  step="1"
                  stringMode
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Form
          layout="vertical"
          name="addTransactions"
          onFinish={this.handleSubmitTransactions}
        >
          <Row>
            <Col span={12} offset={6}>
              <Form.Item
                name="list"
                label="Список транзакций"
                rules={[
                  { required: true, message: 'Пожалуйста добавьте список' },
                ]}
              >
                <Input.TextArea
                  rows={20}
                  placeholder="Выберите название криптоактива"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" form="addTransactions">
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
