import React from 'react';
import PropTypes from 'prop-types';

import { columnDefs, defaultColDef, autoGroupColumnDef, groupDisplayType } from './columns';

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
    totalInvested: PropTypes.number.isRequired,
    netProfit: PropTypes.number.isRequired,
    walletState: PropTypes.number.isRequired,
    lastModified: PropTypes.number.isRequired,
    totalTransactionCount: PropTypes.number.isRequired,
    rowData: PropTypes.array.isRequired,
    chartData: PropTypes.object.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    edgeCoins: PropTypes.object.isRequired,
  };

  state = {
    drawerVisible: false,
  };

  handleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
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
    } = this.props;
    const { drawerVisible } = this.state;

    return (
      <Wrapper>
        <Description
          totalInvested={totalInvested}
          getBackupOrders={getBackupOrders}
          currencySymbol='$'
          netProfit={netProfit}
          walletState={walletState}
          precision={2}
          lastModified={lastModified}
          totalTransactionCount={totalTransactionCount}
          handleDrawer={this.handleDrawer}
          edgeCoins={edgeCoins}
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
        />
      </Wrapper>
    );
  }
}

export default Statistics;
