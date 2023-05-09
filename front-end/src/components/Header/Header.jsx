import React from 'react';
import PropTypes from 'prop-types';
import { floor } from 'lodash/fp';

import { Tooltip } from 'antd';
import {
  AuthBlock,
  Button,
  HeaderWrapper,
  Paragraph,
  Text,
  Title,
} from './styled';
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
    bank: PropTypes.number.isRequired,
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
    const { score, handleRefresh, children, authorized, userId, noData, bank } = this.props;
    const { refreshTimer, refreshDisabled } = this.state;

    const time =
      refreshTimer > 100 ? `${floor(refreshTimer / 60)} мин.` : `${floor(refreshTimer)} сек.`;

    return (
      <HeaderWrapper>
        <Paragraph>Банк: {bank} cwa</Paragraph>
        <Paragraph
          copyable={{
            text: AUTH_TELEGRAM_CODE_PREFIX + userId,
            tooltips: [
              'Скопировать Ваш личный ключ для телеграмма',
              'Ключ скопирован!',
            ],
          }}
        >
          Ключ для авторизации в телеграм
        </Paragraph>
        <AuthBlock>
          {authorized && (
            <>
              <Tooltip title="Количество Вашей игровой валюты">
                <Title level={4}>{score} cwa</Title>
              </Tooltip>
              {refreshDisabled ? (
                <Text>Осталось: {time}</Text>
              ) : (
                <div>
                  <Button
                    onClick={handleRefresh}
                    type="primary"
                    loading={refreshDisabled}
                    disabled={refreshDisabled || noData}
                  >
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
