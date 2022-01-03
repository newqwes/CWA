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
    totalInvested: PropTypes.number.isRequired,
    netProfit: PropTypes.number.isRequired,
    walletState: PropTypes.number.isRequired,
    lastModified: PropTypes.number.isRequired,
    totalTransactionCount: PropTypes.number.isRequired,
    rowData: PropTypes.array.isRequired,
    chartData: PropTypes.object.isRequired,
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
      netProfit,
      walletState,
      lastModified,
      totalTransactionCount,
      rowData,
      chartData,
    } = this.props;
    const { drawerVisible } = this.state;

    return (
      <Wrapper>
        <Description
          totalInvested={totalInvested}
          currencySymbol='$'
          netProfit={netProfit}
          walletState={walletState}
          precision={2}
          lastModified={lastModified}
          totalTransactionCount={totalTransactionCount}
          handleDrawer={this.handleDrawer}
        />
        <Chart chartData={chartData} />
        <Grid
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={groupDisplayType}
        />
        <Drawer
          closeDrawer={this.closeDrawer}
          handleAddTransaction={setOrder}
          visible={drawerVisible}
        />
      </Wrapper>
    );
  }
}

export default Statistics;
