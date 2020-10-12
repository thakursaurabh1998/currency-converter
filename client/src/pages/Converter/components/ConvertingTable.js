import React from 'react';
import PropTypes from 'prop-types';
import { Row, Table, Tag, Col, Button } from 'antd';

const colorMap = {
  code: 'volcano',
  name: 'blue',
  symbol: 'green',
  rate: 'geekblue',
};

export default function ConvertingTable({ countries, baseValue }) {
  const columns = [
    {
      title: 'Country',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Population',
      dataIndex: 'population',
      key: 'population',
    },
    {
      title: () => (
        <>
          Official Currencies
          <br />
          {Object.keys(colorMap).map((key) => (
            <Tag color={colorMap[key]} key={key}>
              {key.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
      dataIndex: 'officialCurrencies',
      key: 'officialCurrencies',
      render: (officialCurrencies) => (
        <>
          {officialCurrencies.map((currency) => (
            <Row key={currency}>
              <Col span={16} style={{ marginTop: 5, marginBottom: 5 }}>
                {Object.keys(currency).map((key) => (
                  <Tag color={colorMap[key]} key={key}>
                    {key === 'rate' ? currency[key].toFixed(2) : currency[key]}
                  </Tag>
                ))}
              </Col>
              <Col span={8}>
                <Button style={{ width: '100%' }} type="primary" danger>{`${currency.symbol} ${(
                  currency.rate * baseValue
                ).toFixed(2)}`}</Button>
              </Col>
            </Row>
          ))}
        </>
      ),
    },
  ];

  return (
    <Row>
      <Table
        pagination={false}
        className="Converter-table"
        columns={columns}
        dataSource={countries}
      />
    </Row>
  );
}

ConvertingTable.defaultProps = {
  countries: [],
};

ConvertingTable.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.string),
  baseValue: PropTypes.number.isRequired,
};
