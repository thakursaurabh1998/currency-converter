import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import cc from '../../static/cc.svg';
import ConvertingTable from './components/ConvertingTable';
import BaseValueAndCurrency from './components/BaseValueAndCurrency';
import SearchInput from './components/SearchInput';
import * as HTTPRequests from './httpRequests';
import { openNotification } from '../../utils/notification';

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

export default function Converter() {
  const [currenciesList, setCurrenciesList] = useState([]);

  const [state, setState] = useState({
    countries: [],
    baseValue: 1,
    baseCurrency: 'SEK',
  });

  useEffect(() => {
    HTTPRequests.getCurrenciesList()
      .then(setCurrenciesList)
      .catch((error) => {
        openNotification('BANNER', 'error', error.message);
      });
  }, []);

  const addCountryToList = (countryObject) => {
    setState({ ...state, countries: [...state.countries, countryObject] });
  };

  const updateBaseValue = (baseValue) => {
    setState({ ...state, baseValue });
  };

  const updateBaseCurrency = (baseCurrency) => {
    setState({ ...state, baseCurrency, countries: [] });
  };

  return (
    <div className="Converter-page">
      <Header />
      <BaseValueAndCurrency
        currenciesList={currenciesList}
        updateBaseCurrency={updateBaseCurrency}
        updateBaseValue={updateBaseValue}
        baseValue={state.baseValue}
        baseCurrency={state.baseCurrency}
      />
      <SearchInput addCountryToList={addCountryToList} baseCurrency={state.baseCurrency} />
      <ConvertingTable countries={state.countries} baseValue={state.baseValue} />
    </div>
  );
}
