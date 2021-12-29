import React from 'react';
import PropTypes from 'prop-types';

import {
  chartData,
  columnDefs,
  rowData,
  defaultColDef,
  autoGroupColumnDef,
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
    getOrders: PropTypes.func.isRequired,
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
    const { setOrder } = this.props;
    const { drawerVisible } = this.state;

    return (
      <Wrapper>
        <Description
          totalInvested={1452.23}
          currencySymbol='$'
          netProfit={14.22}
          walletState={1468.34}
          precision={2}
          lastModified={0.31}
          totalTransactionCount={16}
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
