import React, { useState } from 'react';
import { Row, Input, Select, InputNumber } from 'antd';
import cc from '../static/cc.svg';
import ConvertingTable from './ConvertingTable';
import SearchInput from './SearchInput';

function Header() {
  return (
    <Row>
      <img src={cc} className="Converter-logo" alt="Currency conversion visual" />
      <code style={{ color: 'white' }} className="Converter-title">
        Currency Converter
      </code>
    </Row>
  );
}

function BaseValueAndCurrency({ updateBaseCurrency, updateBaseValue, baseValue, baseCurrency }) {
  return (
    <Row className="Converter-base-change">
      <Input.Group compact>
        <Select style={{ width: '25%' }} onChange={updateBaseCurrency} value={baseCurrency}>
          {['SEK', 'USD', 'EUR', 'INR'].map((currencyCode) => (
            <Select.Option value={currencyCode} key={currencyCode}>
              {currencyCode}
            </Select.Option>
          ))}
        </Select>
        <InputNumber
          style={{ width: '75%' }}
          type="number"
          onChange={updateBaseValue}
          value={baseValue}
        />
      </Input.Group>
    </Row>
  );
}

export default function Converter() {
  const [state, setState] = useState({
    countries: [],
    baseValue: 1,
    baseCurrency: 'SEK',
  });

  const addCountryToList = (countryObject) => {
    setState({ ...state, countries: [...state.countries, countryObject] });
  };

  const updateBaseValue = (baseValue) => {
    setState({ ...state, baseValue });
  };

  const updateBaseCurrency = (baseCurrency) => {
    setState({ ...state, baseCurrency });
  };

  return (
    <div className="Converter-page">
      <Header />
      <SearchInput addCountryToList={addCountryToList} baseCurrency={state.baseCurrency} />
      <BaseValueAndCurrency
        updateBaseCurrency={updateBaseCurrency}
        updateBaseValue={updateBaseValue}
        baseValue={state.baseValue}
        baseCurrency={state.baseCurrency}
      />
      <ConvertingTable countries={state.countries} baseValue={state.baseValue} />
    </div>
  );
}
