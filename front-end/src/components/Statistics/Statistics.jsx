import React from 'react';
import PropTypes from 'prop-types';

import {
  autoGroupColumnDef,
  columnDefs,
  defaultColDef,
  groupDisplayType,
} from './columns';

import Description from './Description';
import Chart from './Chart';
import Grid from './Grid';
import Drawer from './Drawer';

import { Wrapper } from './styled';

class Statistics extends React.Component {
  static propTypes = {
    setOrder: PropTypes.func.isRequired,
    setOrders: PropTypes.func.isRequired,
    getBackupOrders: PropTypes.func.isRequired,
    setNewPlace: PropTypes.func.isRequired,
    totalInvested: PropTypes.number.isRequired,
    netProfit: PropTypes.number.isRequired,
    walletState: PropTypes.number.isRequired,
    lastModified: PropTypes.number.isRequired,
    totalTransactionCount: PropTypes.number.isRequired,
    rowData: PropTypes.array.isRequired,
    placeList: PropTypes.array,
    getUserPlaceList: PropTypes.func.isRequired,
    chartData: PropTypes.object.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    edgeCoins: PropTypes.object.isRequired,
    coinHoldPlaceOptions: PropTypes.array.isRequired,
    handleCoinHoldPlace: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    coinHoldPlace: PropTypes.string.isRequired,
  };

  state = {
    drawerVisible: false,
  };

  handleDrawer = () => {
    const { drawerVisible } = this.state;
    const { getUserPlaceList } = this.props;

    if (!drawerVisible) {
      getUserPlaceList();
    }

    this.setState({ drawerVisible: !drawerVisible });
  };

  closeDrawer = () => {
    this.setState({ drawerVisible: false });
  };

  render() {
    const {
      setOrder,
      totalInvested,
      getBackupOrders,
      netProfit,
      walletState,
      lastModified,
      totalTransactionCount,
      rowData,
      chartData,
      deleteOrder,
      setOrders,
      edgeCoins,
      setNewPlace,
      placeList,
      coinHoldPlaceOptions,
      handleCoinHoldPlace,
      coinHoldPlace,
      handleRefresh,
    } = this.props;
    const { drawerVisible } = this.state;

    return (
      <Wrapper>
        <Description
          totalInvested={totalInvested}
          getBackupOrders={getBackupOrders}
          currencySymbol="$"
          netProfit={netProfit}
          walletState={walletState}
          precision={2}
          lastModified={lastModified}
          totalTransactionCount={totalTransactionCount}
          handleDrawer={this.handleDrawer}
          edgeCoins={edgeCoins}
          coinHoldPlaceOptions={coinHoldPlaceOptions}
          handleCoinHoldPlace={handleCoinHoldPlace}
          coinHoldPlace={coinHoldPlace}
          handleRefresh={handleRefresh}
        />
        <Chart chartData={chartData} />
        <Grid
          columnDefs={columnDefs({ deleteOrder })}
          rowData={rowData}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={groupDisplayType}
        />
        <Drawer
          closeDrawer={this.closeDrawer}
          handleAddTransaction={setOrder}
          visible={drawerVisible}
          handleAddTransactions={setOrders}
          handleAddPlace={setNewPlace}
          placeList={placeList}
        />
      </Wrapper>
    );
  }
}

export default Statistics;
