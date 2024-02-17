import React from 'react';
import PropTypes from 'prop-types';
import { Button, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
  InteractiveDescriptions,
  InteractiveStatistic,
  Property,
  PSizeForMobile,
  Select,
  Text,
} from './styled';

class Description extends React.Component {
  static propTypes = {
    totalInvested: PropTypes.number.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    netProfit: PropTypes.number.isRequired,
    walletState: PropTypes.number.isRequired,
    lastModified: PropTypes.number.isRequired,
    totalTransactionCount: PropTypes.number.isRequired,
    handleDrawer: PropTypes.func.isRequired,
    getBackupOrders: PropTypes.func.isRequired,
    precision: PropTypes.number.isRequired,
    edgeCoins: PropTypes.object.isRequired,
    coinHoldPlaceOptions: PropTypes.array.isRequired,
    handleCoinHoldPlace: PropTypes.func.isRequired,
    coinHoldPlace: PropTypes.string.isRequired,
    handleRefresh: PropTypes.func.isRequired,
  };

  state = {
    netProfitPercent: false,
    walletStatePercent: false,
    lastModifiedPercent: false,
    bestEdgeCoinPercent: false,
    worstEdgeCoinPercent: false,
  };

  handleNetProfit = () => {
    const { netProfitPercent } = this.state;

    this.setState({ netProfitPercent: !netProfitPercent });
  };

  handleWalletState = () => {
    const { walletStatePercent } = this.state;

    this.setState({ walletStatePercent: !walletStatePercent });
  };

  handleLastModified = () => {
    const { lastModifiedPercent } = this.state;

    this.setState({ lastModifiedPercent: !lastModifiedPercent });
  };

  handleBestEdgeCoin = () => {
    const { bestEdgeCoinPercent } = this.state;

    this.setState({ bestEdgeCoinPercent: !bestEdgeCoinPercent });
  };

  handleWorstEdgeCoin = () => {
    const { worstEdgeCoinPercent } = this.state;

    this.setState({ worstEdgeCoinPercent: !worstEdgeCoinPercent });
  };

  render() {
    const {
      totalInvested,
      currencySymbol,
      walletState,
      precision,
      netProfit,
      lastModified,
      totalTransactionCount,
      handleDrawer,
      edgeCoins,
      getBackupOrders,
      coinHoldPlaceOptions,
      handleCoinHoldPlace,
      coinHoldPlace,
      handleRefresh,
    } = this.props;
    const {
      netProfitPercent,
      walletStatePercent,
      lastModifiedPercent,
      bestEdgeCoinPercent,
      worstEdgeCoinPercent,
    } = this.state;

    const positiveNetProfit = netProfit >= 0;
    const netProfitValue = netProfitPercent
      ? (netProfit * 100) / totalInvested
      : netProfit;

    const walletStateValue = walletStatePercent
      ? (walletState * 100) / totalInvested
      : walletState;

    const positiveLastModified = lastModified >= 0;
    const lastModifiedValue = lastModifiedPercent
      ? lastModified
      : (lastModified * walletState) / 100;

    const { best, worst } = edgeCoins;

    const positiveBest = best.differenceChange >= 0;
    const bestEdgeCoinValue = bestEdgeCoinPercent
      ? best.differenceChange
      : best.lastModified;

    const positiveWorst = worst.differenceChange >= 0;
    const worstEdgeCoinValue = worstEdgeCoinPercent
      ? worst.differenceChange
      : worst.lastModified;

    const menu = coinHoldPlaceOptions.map(({ value, label }) => (
      <Select.Option value={value} key={value}>
        <PSizeForMobile>{label}</PSizeForMobile>
      </Select.Option>
    ));

    const handlePlaceChange = (value) => {
      handleCoinHoldPlace(value);
    };
    return (
      <InteractiveDescriptions>
        <Property>
          <Statistic
            title="Всего вложил:"
            value={totalInvested}
            precision={precision}
            suffix={currencySymbol}
          />
          <Button
            type="primary"
            className="hide-for-mobile"
            onClick={getBackupOrders}
          >
            Download backup
          </Button>
        </Property>
        <Property onMouseUp={this.handleNetProfit}>
          <InteractiveStatistic
            title="Чистая прибыль"
            className="hoverable"
            value={netProfitValue}
            precision={precision}
            prefix={
              positiveNetProfit ? <ArrowUpOutlined /> : <ArrowDownOutlined />
            }
            suffix={netProfitPercent ? '%' : currencySymbol}
            positive={positiveNetProfit}
          />
        </Property>

        <Property onMouseUp={this.handleBestEdgeCoin}>
          <InteractiveStatistic
            title={
              <span>
                Лучшая:
                <span className="line-break">{best.name.slice(0, 9)}</span>
              </span>
            }
            className="hoverable"
            value={bestEdgeCoinValue}
            precision={precision}
            prefix={<img src={best.icon} alt={best.name} />}
            suffix={bestEdgeCoinPercent ? '%' : currencySymbol}
            positive={positiveBest}
          />
        </Property>

        <Property onMouseUp={this.handleWorstEdgeCoin}>
          <InteractiveStatistic
            title={
              <span>
                Худшая:
                <span className="line-break">{worst.name.slice(0, 9)}</span>
              </span>
            }
            className="hoverable"
            value={worstEdgeCoinValue}
            precision={precision}
            prefix={<img src={worst.icon} alt={worst.name} />}
            suffix={worstEdgeCoinPercent ? '%' : currencySymbol}
            positive={positiveWorst}
          />
        </Property>

        <Property onMouseUp={this.handleWalletState}>
          <Statistic
            title="Состояние кошелька:"
            className="hoverable"
            value={walletStateValue}
            precision={precision}
            suffix={walletStatePercent ? '%' : currencySymbol}
          />
        </Property>
        <Property>
          <div onMouseUp={this.handleLastModified}>
            <InteractiveStatistic
              title="Последнее изменение:"
              className="hoverable"
              value={lastModifiedValue}
              precision={precision}
              prefix={
                positiveLastModified ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix={lastModifiedPercent ? '%' : currencySymbol}
              positive={positiveLastModified}
            />
          </div>
          <Select
            onChange={handlePlaceChange}
            size="large"
            defaultValue={coinHoldPlace}
          >
            {menu}
          </Select>
        </Property>
        <Property>
          <Statistic
            title="Всего транзакций"
            value={totalTransactionCount}
            className="hide-for-mobile"
          />
        </Property>
        <Property className="hide-for-mobile">
          <Text type="secondary">Транзакция</Text>
          <Button type="primary" onClick={handleDrawer}>
            Добавить
          </Button>
        </Property>
        <Property className="show-for-mobile">
          <Button
            type="primary"
            className="refresh-button"
            onClick={handleRefresh}
          >
            Обновить
          </Button>
        </Property>
      </InteractiveDescriptions>
    );
  }
}

export default Description;
