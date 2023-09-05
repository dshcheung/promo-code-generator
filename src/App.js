import React, { useState } from 'react';

const generateRandomString = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  return randomString;
};

const generateCVSLine = (arr) => {
  const line = new Array(38).fill('');

  arr.forEach(([index, value]) => {
    if (index === 0) {
      if (!value?.prefix && !value?.suffix && !value?.code)
        throw new Error('Prefix or Code OR Suffix is missing');
      const prefix = value?.prefix ? `${value?.prefix.toUpperCase()}-` : '';
      const suffix = value?.suffix ? `-${value?.suffix.toUpperCase()}` : '';
      line[index] =
        value?.prefix || value?.suffix
          ? `${prefix}${generateRandomString().toUpperCase()}${suffix}`
          : value.code.toUpperCase();
    } else {
      line[index] = value;
    }
  });

  return line.join(',');
};

const generateCSVCollection = (arr) => {
  const newCSVDoc = [HEADERS.join(',')];

  arr.forEach((item) => {
    newCSVDoc.push(generateCVSLine(item));
  });

  return newCSVDoc.join('\n');
};

const getItemData = (data, index) => {
  return data.find(([i]) => index === i);
};

const getCodeFormat = (value = {}) => {
  const prefix = value?.prefix ? `${value?.prefix.toUpperCase()}-` : '';
  const suffix = value?.suffix ? `-${value?.suffix.toUpperCase()}` : '';

  return value?.prefix || value?.suffix
    ? `${prefix}${generateRandomString().toUpperCase()}${suffix}`
    : value.code.toUpperCase();
};

export default function App() {
  const [items, setItems] = useState([
    {
      amount: 100,
      data: [
        [13, 'Supporting Organisation | Blockchain at HKU'],
        [0, { code: 'HKU-DISCOUNT' }],
        [1, 'Percent'],
        [2, '15%'],
        [6, '1'],
        [7, '2'],
        [3, '50'],
        [17, 'Y'],
      ],
    },
    {
      amount: 100,
      data: [
        [13, 'Supporting Organisation | Blockchain at HKU'],
        [0, { code: 'HKU-DISCOUNT' }],
        [1, 'Percent'],
        [2, '15%'],
        [6, '1'],
        [7, '2'],
        [3, '50'],
        [17, 'Y'],
      ],
    },
  ]);

  return (
    <div className="container-fluid my-3">
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-sm align-middle">
          <thead>
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Format</th>
              <th scope="col">DisType</th>
              <th scope="col">DisAmount</th>
              <th scope="col">Redeemable</th>
              <th scope="col">Min/Purchase</th>
              <th scope="col">Max/Purchase</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr key={i}>
                  <td scope="row">{item.amount}</td>
                  <td>{getItemData(item.data, 1)?.[1]}</td>
                  <td>{getCodeFormat(getItemData(item.data, 0)?.[1])}</td>
                  <td>{getItemData(item.data, 2)?.[1]}</td>
                  <td>{getItemData(item.data, 3)?.[1]}</td>
                  <td>{getItemData(item.data, 6)?.[1]}</td>
                  <td>{getItemData(item.data, 7)?.[1]}</td>
                  <td>{getItemData(item.data, 13)?.[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <div class="btn-group">
          <button type="button" class="btn btn-primary">
            Download
          </button>
          <button type="button" class="btn btn-danger">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
