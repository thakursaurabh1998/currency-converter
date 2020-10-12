import React from 'react';
import PropTypes from 'prop-types';
import { Row, Input, Select, InputNumber } from 'antd';

export default function BaseValueAndCurrency({
  updateBaseCurrency,
  updateBaseValue,
  baseValue,
  baseCurrency,
  currenciesList,
}) {
  return (
    <Row className="Converter-base-change">
      <Input.Group compact>
        <Select style={{ width: '30%' }} onChange={updateBaseCurrency} value={baseCurrency}>
          {currenciesList.map((currencyCode) => (
            <Select.Option value={currencyCode} key={currencyCode}>
              {currencyCode}
            </Select.Option>
          ))}
        </Select>
        <InputNumber
          style={{ width: '70%' }}
          type="number"
          onChange={updateBaseValue}
          value={baseValue}
        />
      </Input.Group>
    </Row>
  );
}

BaseValueAndCurrency.defaultProps = {
  baseValue: 1,
  baseCurrency: 'SEK',
  currenciesList: [],
};

BaseValueAndCurrency.propTypes = {
  updateBaseCurrency: PropTypes.func.isRequired,
  updateBaseValue: PropTypes.func.isRequired,
  baseValue: PropTypes.number,
  baseCurrency: PropTypes.string,
  currenciesList: PropTypes.arrayOf(PropTypes.string),
};
