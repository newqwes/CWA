import React from 'react';
import PropTypes from 'prop-types';
import { floor } from 'lodash/fp';

import { HeaderWrapper, Button, Text, Title, AuthBlock, Paragraph } from './styled';
import { getRefreshTimer } from '../../utils/refresh';
import { AUTH_TELEGRAM_CODE_PREFIX } from '../../constants/telegram';

const UPDATE_TIMER_MILLISECONDS = 1000;

class Header extends React.Component {
  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
    lastDateUpdate: PropTypes.string,
    score: PropTypes.number,
    dataRefreshLimitPerMinute: PropTypes.number,
    children: PropTypes.node.isRequired,
    authorized: PropTypes.bool.isRequired,
    userId: PropTypes.string,
    noData: PropTypes.bool,
  };

  state = {
    refreshTimer: 0,
    refreshDisabled: false,
  };

  componentDidUpdate(prevProps) {
    const { lastDateUpdate, dataRefreshLimitPerMinute } = this.props;

    if (lastDateUpdate !== prevProps.lastDateUpdate) {
      const refreshTimer = getRefreshTimer(lastDateUpdate, dataRefreshLimitPerMinute);

      if (refreshTimer <= 0) {
        return;
      }

      this.setState({ refreshTimer, refreshDisabled: true });

      this.timer = setTimeout(this.tick, UPDATE_TIMER_MILLISECONDS);
    }
  }

  componentWillUnmount() {
    this.transition();
  }

  tick = () => {
    const { refreshTimer } = this.state;

    this.transition();

    if (refreshTimer <= 1) {
      this.setState({ refreshTimer: 0, refreshDisabled: false });
    } else {
      this.setState({
        refreshTimer: refreshTimer - 1,
        refreshDisabled: true,
      });

      this.timer = setTimeout(this.tick, UPDATE_TIMER_MILLISECONDS);
    }
  };

  transition() {
    clearInterval(this.timer);
  }

  render() {
    const { score, handleRefresh, children, authorized, userId, noData } = this.props;
    const { refreshTimer, refreshDisabled } = this.state;

    const time =
      refreshTimer > 100 ? `${floor(refreshTimer / 60)} мин.` : `${floor(refreshTimer)} сек.`;

    return (
      <HeaderWrapper>
        <div>
          <Button shape='circle' href='https://www.coingecko.com' target='_blank' type='link'>
            Gecko
          </Button>
          <Button shape='circle' href='https://coinmarketcap.com/ru/' target='_blank' type='link'>
            Marketcap
          </Button>
          <Button
            shape='circle'
            href='https://ru.tradingview.com/chart/1G7G96B4/'
            target='_blank'
            type='link'>
            TradingView
          </Button>
          <Button
            shape='circle'
            href='https://www.coinglass.com/LiquidationData'
            target='_blank'
            type='link'>
            Coinglass
          </Button>
          <Button
            shape='circle'
            href='https://t.me/count_in_wallet_bot'
            target='_blank'
            type='link'>
            Telegram Bot
          </Button>
        </div>
        <Paragraph
          copyable={{
            text: AUTH_TELEGRAM_CODE_PREFIX + userId,
            tooltips: ['Скопировать Ваш личный ключ для телеграмма', 'Ключ скопирован!'],
          }}>
          Ключ для авторизации в телеграм
        </Paragraph>
        <AuthBlock>
          {authorized && (
            <>
              <Title level={4}>score: {score}</Title>
              {refreshDisabled ? (
                <Text>Осталось: {time}</Text>
              ) : (
                <div>
                  <Button
                    onClick={handleRefresh}
                    type='primary'
                    loading={refreshDisabled}
                    disabled={refreshDisabled || noData}>
                    Обновить
                  </Button>
                </div>
              )}
            </>
          )}
          {children}
        </AuthBlock>
      </HeaderWrapper>
    );
  }
}

export default Header;
