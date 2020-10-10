import React from 'react';
import { Row } from 'antd';
import cc from '../static/cc.svg';

export default function Converter() {
  return (
    <div className="Converter-page">
      <Row>
        <img src={cc} className="Converter-logo" alt="Currency conversion visual" />
        <code style={{ color: 'white' }} className="Converter-title">
          Currency Converter
        </code>
      </Row>
    </div>
  );
}
