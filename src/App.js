import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const HEADERS = [
  'Code*', // 0
  'Type [Flat|Percent]*', // 1
  'Value*', // 2
  'Quantity', // 3
  'Available From', // 4
  'Available To', // 5
  'Min. Tickets', // 6
  'Max. Tickets', // 7
  'Show Public Tickets', // 8
  'Show Secret Tickets', // 9
  'Source Code', // 10
  'Disable If Volume Pricing', // 11
  'Block Orders If Not Applicable', // 12
  'Description for Organizer', // 13
  'VIP Networking', // 14
  'General Attendee (Super Early Bird)', // 15
  'General Attendee (Early Bird)', // 16
  'General Attendee', // 17
  'General Attendee + GBA Day (Super Early Bird)', // 18
  'General Attendee + GBA Day (Early Bird)', // 19
  'General Attendee + GBA Day', // 20
  'Greater Bay Area (GBA) Day + Startup Kiosk', // 21
  'Greater Bay Area (GBA) Day', // 22
  'Startup Online (with virtual booth) (Super Early Bird)', // 23
  'Startup Online (with virtual booth) (Early Bird)', // 24
  'Startup Online (with virtual booth)', // 25
  'Startup Kiosk (+2 tickets) (Super Early Bird)', // 26
  'Startup Kiosk (+2 tickets) (Early Bird)', // 27
  'Startup Kiosk (+2 tickets)', // 28
  'Investor (Super Early Bird)', // 29
  'Investor (Early Bird)', // 30
  'Investor', // 31
  'Student (Super Early Bird)', // 32
  'Student (Early Bird)', // 33
  'Student', // 34
  'General Attendee (Online only) (Super Early Bird)', // 35
  'General Attendee (Online only) Early Bird', // 36
  'General Attendee (Online only)', // 37
];

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

const getTicketTypes = (data) => {
  const tickets = [];

  data.forEach(([index]) => {
    if (index >= 14 && index <= 37) {
      tickets.push(HEADERS[index]);
    }
  });

  return tickets;
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
        [23, 'Y'],
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

  const onDownload = () => {
    const csvCollection = [];

    items.forEach((item) => {
      if (item.amount > 1) {
        for (let i = 0; i < item.amount; i += 1) {
          csvCollection.push(item.data);
        }
      } else {
        csvCollection.push(item.data);
      }
    });

    const blob = new Blob([generateCSVCollection(csvCollection)]);
    saveAs(blob, 'codes.csv');
  };

  const onClear = () => {
    if (window.confirm('Are you sure you want to clear?')) {
      setItems([]);
    }
  };

  return (
    <div className="container-fluid my-3">
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-sm align-middle">
          <thead>
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Format</th>
              <th scope="col">Discount Type</th>
              <th scope="col">Discount Amount</th>
              <th scope="col">Max Redeemable</th>
              <th scope="col">Min Purchase</th>
              <th scope="col">Max Purchase</th>
              <th scope="col">Tickets</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr key={i}>
                  <td scope="row">{item.amount}</td>
                  <td>{getItemData(item.data, 1)?.[1]}</td>
                  <td className="text-nowrap">
                    {getCodeFormat(getItemData(item.data, 0)?.[1])}
                  </td>
                  <td>{getItemData(item.data, 2)?.[1]}</td>
                  <td>{getItemData(item.data, 3)?.[1]}</td>
                  <td>{getItemData(item.data, 6)?.[1]}</td>
                  <td>{getItemData(item.data, 7)?.[1]}</td>
                  <td>
                    <ul className="list-group">
                      {getTicketTypes(item.data)?.map((name, i) => (
                        <li key={i} className="list-group-item text-nowrap">
                          {name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{getItemData(item.data, 13)?.[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-primary"
            onClick={onDownload}
            disabled={items.length === 0}
          >
            Download
          </button>
          <button type="button" class="btn btn-danger" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>

      <div className="border-top my-3"></div>
    </div>
  );
}
