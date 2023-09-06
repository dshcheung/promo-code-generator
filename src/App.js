import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Formik, Field, Form } from 'formik';

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
    ? `${prefix}XXXXX${suffix}`
    : value.code?.toUpperCase();
};

export default function App() {
  const [items, setItems] = useState([]);

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

  const onSubmit = (values, formikBags) => {
    const newData = { amount: values.amount, data: [] };

    if (values.description) newData.data.push([13, values.description]);
    if (values.prefix || values.suffix || values.code) {
      newData.data.push([
        0,
        { code: values.code, prefix: values.prefix, suffix: values.suffix },
      ]);
    }
    if (values.discountType) newData.data.push([1, values.discountType]);
    if (values.discountAmount) {
      newData.data.push([
        2,
        `${values.discountAmount}${
          values.discountType === 'Percent' ? '%' : ''
        }`,
      ]);
    }
    if (values.redeemable) newData.data.push([3, `${values.redeemable}`]);
    if (values.minPurchase) newData.data.push([6, `${values.minPurchase}`]);
    if (values.maxPurchase) newData.data.push([7, `${values.maxPurchase}`]);
    values.tickets?.forEach((ticketIndex) => {
      newData.data.push([ticketIndex, 'Y']);
    });

    setItems((currItems) => {
      return [...currItems, newData];
    });

    formikBags.resetForm();
  };

  const onItemDelete = (index) => {
    if (window.confirm('Are you sure you want to delete item?')) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const onItemCopy = (item) => {
    console.log(item);
  };

  // TODO: Validation
  // TODO: Dup Item to Form

  return (
    <div className="container-fluid my-3">
      <Formik
        initialValues={{
          prefix: '',
          suffix: '',
          code: '',
          amount: 1,
          discountType: 'Percent',
          discountAmount: 0,
          redeemable: 0,
          minPurchase: 0,
          maxPurchase: 0,
          description: '',
          tickets: [],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="row">
            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="prefix" className="form-label">
                Prefix
              </label>
              <Field
                id="prefix"
                name="prefix"
                className="form-control"
                type="text"
                placeholder="[Prefix]-xxxxx"
              />
            </div>

            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="suffix" className="form-label">
                Suffix
              </label>
              <Field
                id="suffix"
                name="suffix"
                className="form-control"
                type="text"
                placeholder="xxxxx-[Suffix]"
              />
            </div>

            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <Field
                id="code"
                name="code"
                className="form-control"
                type="text"
                placeholder="Override Code Regardless of Prefix or Suffix"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="amount" className="form-label">
                Number Of Code To Generate
              </label>
              <Field
                id="amount"
                name="amount"
                className="form-control"
                type="number"
              />
            </div>

            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="discountType" className="form-label">
                Discount Type
              </label>
              <Field
                id="discountType"
                name="discountType"
                className="form-control"
                component="select"
              >
                <option value="Percent">Percent</option>
                <option value="Flat">Flat</option>
              </Field>
            </div>

            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="discountAmount" className="form-label">
                Discount Amount
              </label>
              <Field
                id="discountAmount"
                name="discountAmount"
                className="form-control"
                type="number"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="redeemable" className="form-label">
                Max Redeemable (Use 0 for no restrictions)
              </label>
              <Field
                id="redeemable"
                name="redeemable"
                className="form-control"
                type="number"
                placeholder="Leave Blank For No Limit"
              />
            </div>

            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="minPurchase" className="form-label">
                Min Per Purchase (Use 0 for no restrictions)
              </label>
              <Field
                id="minPurchase"
                name="minPurchase"
                className="form-control"
                type="number"
              />
            </div>

            <div className="mb-2 col-12 col-md-4">
              <label htmlFor="maxPurchase" className="form-label">
                Max Per Purchase (Use 0 for no restrictions)
              </label>
              <Field
                id="maxPurchase"
                name="maxPurchase"
                className="form-control"
                type="number"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-2 col-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Field
                id="description"
                name="description"
                className="form-control"
                type="text"
                placeholder="Any Title/Notes/Description For Internal Tracking"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-2 col-12">
              <label htmlFor="tickets" className="form-label">
                Tickets (Hold Control/Command To Select Multiple)
              </label>
              <Field
                id="tickets"
                name="tickets"
                className="form-control"
                component="select"
                multiple
              >
                <option value="14">VIP Networking</option>
                <option value="31">Investor</option>
                <option value="34">Student</option>
                <option value="17">General Attendee</option>
                <option value="37">General Attendee (Online only)</option>
                <option value="20">General Attendee + GBA Day</option>
                <option value="22">Greater Bay Area (GBA) Day</option>
                <option value="21">
                  Greater Bay Area (GBA) Day + Startup Kiosk
                </option>
                <option value="28">Startup Kiosk (+2 tickets)</option>
                <option value="25">Startup Online (with virtual booth)</option>
              </Field>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </Form>
      </Formik>

      <div className="border-top my-3"></div>

      <div className="table-responsive my-3">
        <table className="table table-striped table-bordered table-sm align-middle">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Format</th>
              <th scope="col">Number Of Code To Generate</th>
              <th scope="col">Discount Type</th>
              <th scope="col">Discount Amount</th>
              <th scope="col">Max Redeemable</th>
              <th scope="col">Min Per Purchase</th>
              <th scope="col">Max Per Purchase</th>
              <th scope="col">Tickets</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr key={i}>
                  <td scope="row">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={() => onItemCopy(item)}
                      >
                        <i className="bi bi-clipboard"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        type="button"
                        onClick={() => onItemDelete(i)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-nowrap">
                    {getCodeFormat(getItemData(item.data, 0)?.[1])}
                  </td>
                  <td>{item.amount}</td>
                  <td>{getItemData(item.data, 1)?.[1]}</td>
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

      <div className="text-center my-3">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onDownload}
            disabled={items.length === 0}
          >
            Download
          </button>
          <button type="button" className="btn btn-danger" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
