import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

import TotalBuyCellRenderer from '../../frameworkComponents/TotalBuyCellRenderer';
import PriceCellRenderer from '../../frameworkComponents/PriceCellRenderer';
import LastChangeCellRenderer from '../../frameworkComponents/LastChangeCellRenderer';
import DeleteButtonCellRenderer from '../../frameworkComponents/DeleteButtonCellRenderer';
import AmountCellRenderer from '../../frameworkComponents/AmountCellRenderer';
import ActualPriceCellRenderer from '../../frameworkComponents/ActualPriceCellRenderer';
import PercentCellRenderer from '../../frameworkComponents/PercentCellRenderer';

class Grid extends React.Component {
  frameworkComponents = {
    totalBuyCellRenderer: TotalBuyCellRenderer,
    priceCellRenderer: PriceCellRenderer,
    lastChangeCellRenderer: LastChangeCellRenderer,
    deleteButtonCellRenderer: DeleteButtonCellRenderer,
    amountCellRenderer: AmountCellRenderer,
    actualPriceCellRenderer: ActualPriceCellRenderer,
    percentCellRenderer: PercentCellRenderer,
  };

  static propTypes = {
    columnDefs: PropTypes.array.isRequired,
    rowData: PropTypes.array.isRequired,
    defaultColDef: PropTypes.object.isRequired,
    autoGroupColumnDef: PropTypes.object.isRequired,
    groupDisplayType: PropTypes.string.isRequired,
  };

  render() {
    const { columnDefs, rowData, defaultColDef, autoGroupColumnDef, groupDisplayType } = this.props;

    return (
      <div className='ag-theme-material'>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          frameworkComponents={this.frameworkComponents}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={groupDisplayType}
          domLayout='autoHeight'
          suppressAggFuncInHeader
          animateRows
          showOpenedGroup
        />
      </div>
    );
  }
}

export default Grid;
