import PropTypes from 'prop-types';
import { MADALS_NAME_FOR_PROPTYPE } from '../../constants/modal';

const formItemsType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    rules: PropTypes.array,
    placeholder: PropTypes.string,
    prefix: PropTypes.element,
  }),
);

export default {
  modalName: PropTypes.oneOf(MADALS_NAME_FOR_PROPTYPE).isRequired,
  initialValues: PropTypes.objectOf(PropTypes.string),
  onFinish: PropTypes.func.isRequired,
  setNotificationForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  handleShow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  width: PropTypes.string,
  htmlType: PropTypes.string,
  formItems: formItemsType,
};
