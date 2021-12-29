import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Descriptions, Statistic, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import { Text, InteractiveStatistic } from './styled';

class Description extends React.Component {
  static propTypes = {
    totalInvested: PropTypes.number.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    netProfit: PropTypes.number.isRequired,
    walletState: PropTypes.number.isRequired,
    lastModified: PropTypes.number.isRequired,
    totalTransactionCount: PropTypes.number.isRequired,
    handleDrawer: PropTypes.func.isRequired,
    precision: PropTypes.number.isRequired,
  };

  render() {
    const {
      totalInvested,
      currencySymbol,
      netProfit,
      walletState,
      precision,
      lastModified,
      totalTransactionCount,
      handleDrawer,
    } = this.props;

    const positiveNetProfit = netProfit >= 0;
    const positiveLastModified = lastModified >= 0;

    return (
      <Descriptions title='Последняя обновленная статистика'>
        <Row gutter={16}>
          <Col span={3}>
            <Statistic
              title='Всего вложил:'
              value={totalInvested}
              precision={precision}
              suffix={currencySymbol}
            />
          </Col>
          <Col span={9}>
            <InteractiveStatistic
              title='Чистая прибыль'
              value={netProfit}
              precision={precision}
              prefix={positiveNetProfit ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix={currencySymbol}
              positive={positiveNetProfit}
            />
          </Col>
          <Col span={3}>
            <Statistic
              title='Состояние кошелька:'
              value={walletState}
              precision={precision}
              suffix={currencySymbol}
            />
          </Col>
          <Col span={3}>
            <InteractiveStatistic
              title='Последнее изменение:'
              value={lastModified}
              precision={precision}
              prefix={positiveLastModified ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix='%'
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
      </Descriptions>
    );
  }
}

export default Description;
