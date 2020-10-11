import React from 'react';
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
