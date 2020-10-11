import React, { useState } from 'react';
import { Input, Row, Select } from 'antd';
import * as HTTPRequests from '../utils/HTTPRequests';
import { debounce } from '../utils/helper';
import { openNotification } from '../utils/NotificationUtility';

export default function SearchInput({ addCountryToList, baseCurrency }) {
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({
    countryList: [],
    value: null,
  });

  const handleSearch = debounce(async (countryQuery) => {
    if (countryQuery) {
      if (countryQuery.length < 3) {
        return;
      }
      try {
        setLoading(true);
        const countryList = await HTTPRequests.searchCountryInfo(countryQuery, baseCurrency);
        setState({
          ...state,
          countryList,
        });
      } catch (error) {
        openNotification('BANNER', 'error', error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setState({ ...state, countryList: [] });
    }
  }, 500);

  const handleChange = (value) => {
    addCountryToList(state.countryList.find((country) => country.fullName === value));
    setState({ ...state, countryList: [], value: null });
  };

  const options = state.countryList.map((d) => (
    <Select.Option key={d.fullName} value={d.fullName}>
      {d.fullName}
    </Select.Option>
  ));
  return (
    <Row className="Converter-search-bar">
      <Input.Group compact>
        <Input disabled style={{ width: '30%' }} prefix="Country" />
        <Select
          autoFocus
          showSearch
          value={state.value}
          style={{ width: '70%' }}
          placeholder="(type atleast 3 chars)"
          showArrow={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent="No matches"
          loading={isLoading}
        >
          {options}
        </Select>
      </Input.Group>
    </Row>
  );
}
