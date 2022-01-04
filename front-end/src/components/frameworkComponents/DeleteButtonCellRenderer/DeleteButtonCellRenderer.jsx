import React from 'react';
import PropTypes from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { get } from 'lodash/fp';

import { Wrapper } from './styled';

class DeleteButtonCellRenderer extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    deleteOrder: PropTypes.func.isRequired,
  };

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  btnClickedHandler = () => {
    const orderId = get(['data', 'id'], this.props);

    this.props.deleteOrder(orderId);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { data } = this.props;
    const { visible } = this.state;

    return data ? (
      <Wrapper>
        <Button onClick={this.showModal} icon={<DeleteOutlined />} />
        <Modal
          title='Удаление транзакции'
          visible={visible}
          onOk={this.btnClickedHandler}
          onCancel={this.handleCancel}>
          <p>Вы действительно хотите удалить?</p>
        </Modal>
      </Wrapper>
    ) : (
      ''
    );
  }
}
export default DeleteButtonCellRenderer;
