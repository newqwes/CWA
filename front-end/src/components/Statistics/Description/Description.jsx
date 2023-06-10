import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Statistic, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import { Text, InteractiveStatistic, InteractiveDescriptions } from './styled';

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
    } = this.props;
    const {
      netProfitPercent,
      walletStatePercent,
      lastModifiedPercent,
      bestEdgeCoinPercent,
      worstEdgeCoinPercent,
    } = this.state;

    const positiveNetProfit = netProfit >= 0;
    const netProfitValue = netProfitPercent ? (netProfit * 100) / totalInvested : netProfit;

    const walletStateValue = walletStatePercent ? (walletState * 100) / totalInvested : walletState;

    const positiveLastModified = lastModified >= 0;
    const lastModifiedValue = lastModifiedPercent
      ? lastModified
      : (lastModified * walletState) / 100;

    const { best, worst } = edgeCoins;

    const positiveBest = best.differenceChange >= 0;
    const bestEdgeCoinValue = bestEdgeCoinPercent ? best.differenceChange : best.lastModified;

    const positiveWorst = worst.differenceChange >= 0;
    const worstEdgeCoinValue = worstEdgeCoinPercent ? worst.differenceChange : worst.lastModified;

    return (
      <InteractiveDescriptions title='Последняя обновленная статистика'>
        <Row gutter={16}>
          <Col span={3}>
            <Statistic
              title='Всего вложил:'
              value={totalInvested}
              precision={precision}
              suffix={currencySymbol}
            />
            <Button type='primary' onClick={getBackupOrders}>
              Download backup
            </Button>
          </Col>
          <Col span={3} onMouseUp={this.handleNetProfit}>
            <InteractiveStatistic
              title='Чистая прибыль'
              className='hoverable'
              value={netProfitValue}
              precision={precision}
              prefix={positiveNetProfit ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix={netProfitPercent ? '%' : currencySymbol}
              positive={positiveNetProfit}
            />
          </Col>
          <Col span={3} onMouseUp={this.handleBestEdgeCoin}>
            <InteractiveStatistic
              title={`Лучшая: ${best.name}`}
              className='hoverable'
              value={bestEdgeCoinValue}
              precision={precision}
              prefix={<img src={best.icon} alt={best.name} />}
              suffix={bestEdgeCoinPercent ? '%' : currencySymbol}
              positive={positiveBest}
            />
          </Col>

          <Col span={3} onMouseUp={this.handleWorstEdgeCoin}>
            <InteractiveStatistic
              title={`Худшая: ${worst.name}`}
              className='hoverable'
              value={worstEdgeCoinValue}
              precision={precision}
              prefix={<img src={worst.icon} alt={worst.name} />}
              suffix={worstEdgeCoinPercent ? '%' : currencySymbol}
              positive={positiveWorst}
            />
          </Col>

          <Col span={3} onMouseUp={this.handleWalletState}>
            <Statistic
              title='Состояние кошелька:'
              className='hoverable'
              value={walletStateValue}
              precision={precision}
              suffix={walletStatePercent ? '%' : currencySymbol}
            />
          </Col>
          <Col span={3} onMouseUp={this.handleLastModified}>
            <InteractiveStatistic
              title='Последнее изменение:'
              className='hoverable'
              value={lastModifiedValue}
              precision={precision}
              prefix={positiveLastModified ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix={lastModifiedPercent ? '%' : currencySymbol}
              positive={positiveLastModified}
            />
          </Col>
          <Col span={4}>
            <Statistic title='Всего транзакций' value={totalTransactionCount} />
          </Col>
          <Col span={2}>
            <Text type='secondary'>Транзакция</Text>
            <Button type='primary' onClick={handleDrawer}>
              Добавить
            </Button>
          </Col>
        </Row>
      </InteractiveDescriptions>
    );
  }
}

export default Description;
