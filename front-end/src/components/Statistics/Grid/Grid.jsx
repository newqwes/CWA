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
import IconCellRenderer from '../../frameworkComponents/IconCellRenderer';
import { Wrapper } from './styled';

class Grid extends React.Component {
  static propTypes = {
    columnDefs: PropTypes.array.isRequired,
    rowData: PropTypes.array.isRequired,
    defaultColDef: PropTypes.object.isRequired,
    autoGroupColumnDef: PropTypes.object.isRequired,
    groupDisplayType: PropTypes.string.isRequired,
    updateCellValue: PropTypes.func.isRequired,
  };

  frameworkComponents = {
    totalBuyCellRenderer: TotalBuyCellRenderer,
    priceCellRenderer: PriceCellRenderer,
    lastChangeCellRenderer: LastChangeCellRenderer,
    deleteButtonCellRenderer: DeleteButtonCellRenderer,
    amountCellRenderer: AmountCellRenderer,
    actualPriceCellRenderer: ActualPriceCellRenderer,
    percentCellRenderer: PercentCellRenderer,
    iconCellRenderer: IconCellRenderer,
  };

  onCellValueChanged = (event) => {
    const { field } = event.colDef;
    const orderId = event.data.id;
    const { value } = event;
    this.props.updateCellValue({ field, orderId, value });
  };

  render() {
    const {
      columnDefs,
      rowData,
      defaultColDef,
      autoGroupColumnDef,
      groupDisplayType,
    } = this.props;

    return (
      <Wrapper className="ag-theme-material">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          frameworkComponents={this.frameworkComponents}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={groupDisplayType}
          onCellValueChanged={this.onCellValueChanged}
          suppressAggFuncInHeader
          animateRows
          showOpenedGroup
          domLayout="autoHeight"
        />
      </Wrapper>
    );
  }
}

export default Grid;
