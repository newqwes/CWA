import styled from 'styled-components';
import { AutoComplete as AutoCompleteAntd, InputNumber as InputNumberAntd } from 'antd';

const CustomStyledComponent = component => styled(component)`
  width: 100%;
  margin-bottom: 20px;
`;

export const AutoComplete = CustomStyledComponent(AutoCompleteAntd);
export const InputNumber = CustomStyledComponent(InputNumberAntd);
