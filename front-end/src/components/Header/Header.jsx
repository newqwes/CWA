import React, { useEffect, useState } from 'react';
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

const Header = ({
  handleRefresh,
  lastDateUpdate,
  score,
  dataRefreshLimitPerMinute,
  children,
  authorized,
  userId,
  noData,
  bank,
}) => {
  const [refreshTimer, setRefreshTimer] = useState(0);
  const [refreshDisabled, setRefreshDisabled] = useState(false);

  useEffect(() => {
    const refreshTimerValue = getRefreshTimer(
      lastDateUpdate,
      dataRefreshLimitPerMinute,
    );

    if (refreshTimerValue <= 0) {
      return;
    }

    setRefreshTimer(refreshTimerValue);
    setRefreshDisabled(true);

    const timer = setInterval(() => {
      setRefreshTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setRefreshDisabled(false);
          clearInterval(timer);
          return 0;
        }

        return prevTimer - 1;
      });
    }, UPDATE_TIMER_MILLISECONDS);

    return () => {
      clearInterval(timer);
    };
  }, [lastDateUpdate, dataRefreshLimitPerMinute]);

  useEffect(() => {
    const refreshTimerValue = getRefreshTimer(
      lastDateUpdate,
      dataRefreshLimitPerMinute,
    );
    setRefreshTimer(refreshTimerValue);
    setRefreshDisabled(refreshTimerValue > 0);
  }, [lastDateUpdate, dataRefreshLimitPerMinute]);

  const time =
    refreshTimer > 100
      ? `${floor(refreshTimer / 60)} мин.`
      : `${floor(refreshTimer)} сек.`;

  return (
    <HeaderWrapper>
      <Paragraph className="hide-for-mobile">Банк: {bank} cwa</Paragraph>
      <Paragraph
        className="hide-for-mobile"
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
                  className="hide-for-mobile"
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
};

Header.propTypes = {
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

export default Header;
