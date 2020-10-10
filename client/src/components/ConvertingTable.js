import React from 'react';
import { Row, Table, Tag, Col, Button } from 'antd';

const colorMap = {
  code: 'volcano',
  symbol: 'green',
  rate: 'geekblue',
  name: 'blue',
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
          OfficialCurrencies{' '}
          {Object.keys(colorMap).map((key) => (
            <Tag color={colorMap[key]}>{key.toUpperCase()}</Tag>
          ))}
        </>
      ),
      dataIndex: 'officialCurrencies',
      key: 'officialCurrencies',
      render: (officialCurrencies) => (
        <>
          {officialCurrencies.map((currency) => (
            <Row>
              <Col style={{ marginTop: 5, marginBottom: 5 }}>
                {Object.keys(currency).map((key) => (
                  <Tag color={colorMap[key]} key={colorMap[key]}>
                    {key === 'rate' ? currency[key].toFixed(2) : currency[key]}
                  </Tag>
                ))}
              </Col>
              <Col offset={3} span={8}>
                <Button type="primary" danger>{`${currency.symbol} ${(currency.rate * baseValue).toFixed(2)}`}</Button>
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
