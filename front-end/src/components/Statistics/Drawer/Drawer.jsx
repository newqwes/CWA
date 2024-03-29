import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer as DrawerAntd,
  Form,
  Input,
  Row,
  Space,
  Spin,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { map, take } from 'lodash/fp';
import { isArray, round } from 'lodash';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { coingeckoAPI } from '../../../api';
import { OptionImg } from '../../Calculator/styled';
import { AutoComplete, InputNumber, Select } from './styled';
import { someFalsey } from '../../../utils/aggFunc';
import { getNotification } from '../../../utils/notification';

class Drawer extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    placeList: PropTypes.array,
    closeDrawer: PropTypes.func.isRequired,
    handleAddTransaction: PropTypes.func.isRequired,
    handleAddTransactions: PropTypes.func.isRequired,
    handleAddPlace: PropTypes.func.isRequired,
  };

  state = {
    selectedCoinId: '',
    coins: [],
    loading: false,
    timesOnFocusMoreThanOne: false,
    selectedCoinPrice: null,
    dateTime: moment(),
    count: null,
    totalPrice: 0,
    newPlaceName: '',
    place: '',
  };

  optoinsComponents = map(({ label, value, smallImg }) => ({
    value,
    label: (
      <div key={value}>
        <OptionImg src={smallImg} alt={label} />
        <span>{label}</span>
      </div>
    ),
  }));

  onSearchCoin = debounce(async (coin) => {
    if (!coin) return;
    this.setState({ loading: true });

    const coins = await coingeckoAPI.searchCoin(coin);

    if (!isArray(coins)) {
      this.setState({ loading: false });
      return;
    }

    this.setState({ coins: take(10, coins), loading: false });
  }, 1000);

  handleSubmit = () => {
    const { closeDrawer, handleAddTransaction } = this.props;
    const { selectedCoinId, dateTime, selectedCoinPrice, count, place } = this.state;

    if (someFalsey([selectedCoinId, count, selectedCoinPrice, place])) {
      getNotification({ message: 'Не все значения введены!' });
      return;
    }

    handleAddTransaction({
      coinId: selectedCoinId,
      price: selectedCoinPrice,
      count,
      place,
      date: dateTime ? dateTime.format() : Date.now(),
    });

    this.setState({
      selectedCoinId: null,
      coins: [],
      selectedCoinPrice: null,
      timesOnFocusMoreThanOne: false,
      count: null,
      place: '',
    });

    closeDrawer();
  };

  handleSubmitTransactions = ({ list }) => {
    const { closeDrawer, handleAddTransactions } = this.props;

    closeDrawer();
    handleAddTransactions({ list });
  };

  onSelectCoin = async (selectedCoinId) => {
    const selectedCoin = await coingeckoAPI.getCoinData([selectedCoinId]);

    const selectedCoinPrice = selectedCoin[0].current_price;
    this.setState({
      selectedCoinPrice,
      selectedCoinId,
      totalPrice: selectedCoinPrice * this.state.count,
    });
  };

  onFocusCoin = () => {
    const { timesOnFocusMoreThanOne } = this.state;

    if (timesOnFocusMoreThanOne) {
      return;
    }

    this.setState({ timesOnFocusMoreThanOne: true });
    this.onSearchCoin();
  };

  onChangeCount = (value) => {
    this.setState({
      count: value,
      totalPrice: this.state.selectedCoinPrice * value,
    });
  };

  onChangeCoinPrice = (value) => {
    this.setState({
      selectedCoinPrice: value,
      totalPrice: value * this.state.count,
    });
  };

  onChangeDateTime = (value) => {
    this.setState({ dateTime: value });
  };

  onChangeNewPlaceName = (event) => {
    this.setState({ newPlaceName: event.target.value });
  };

  onAddNewPlaceName = () => {
    const { newPlaceName } = this.state;
    const { handleAddPlace } = this.props;
    handleAddPlace(newPlaceName);

    this.setState({ newPlaceName: '' });
  };

  onChangePlace = (value) => {
    this.setState({
      place: value,
    });
  };

  render() {
    const { visible, closeDrawer, placeList } = this.props;
    const {
      selectedCoinId,
      coins,
      loading,
      selectedCoinPrice,
      dateTime,
      count,
      totalPrice,
      newPlaceName,
      place,
    } = this.state;
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
            <Button type="primary" onClick={this.handleSubmit}>
              Принять
            </Button>
          </Space>
        }
      >
        <Row gutter={16}>
          <Col span={12}>
            <AutoComplete
              options={this.optoinsComponents(coins)}
              onSelect={this.onSelectCoin}
              onSearch={this.onSearchCoin}
              onFocus={this.onFocusCoin}
              notFoundContent={loading ? <Spin size="small" /> : null}
              placeholder="Введите ID монеты из coingecko.com"
            >
              <Input.Search value={selectedCoinId} />
            </AutoComplete>
          </Col>
          <Col span={12}>
            <DatePicker
              showTime
              value={dateTime}
              onChange={this.onChangeDateTime}
              placeholder="Выберите дату"
              style={{ width: '100%' }}
              getPopupContainer={(trigger) => trigger.parentElement}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              min="0"
              step="1"
              placeholder="0"
              onChange={this.onChangeCoinPrice}
              value={selectedCoinPrice}
              stringMode
            />
          </Col>
          <Col span={12}>
            <InputNumber
              step="1"
              placeholder="0"
              value={count}
              onChange={this.onChangeCount}
              stringMode
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              addonBefore="Total:"
              addonAfter="USD"
              formatter={(value) =>
                `${round(value, 2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              value={totalPrice}
              disabled
            />
          </Col>
          <Col span={12}>
            <Select
              placeholder="Binance"
              value={place}
              onChange={this.onChangePlace}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider />
                  <Space>
                    <Input
                      placeholder="Binance"
                      value={newPlaceName}
                      onChange={this.onChangeNewPlaceName}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={this.onAddNewPlaceName}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={placeList}
            />
          </Col>
        </Row>
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
