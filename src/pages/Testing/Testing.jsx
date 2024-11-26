import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Testing() {
  // Validation schema for datetime-local
  const validationSchema = Yup.object({
    dateInput: Yup.date()
      .required('Please select a date and time'),
  });

  const handleSubmit = (values) => {
    const isoDate = new Date(values.dateInput).toISOString(); // Convert to ISO 8601
    console.log('Selected ISO 8601 Date:', isoDate);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Date and Time</h2>
      <Formik
        initialValues={{ dateInput: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="dateInput" style={{ display: 'block', marginBottom: '5px' }}>
                Date and Time:
              </label>
              <Field
                id="dateInput"
                name="dateInput"
                type="datetime-local"
                style={{ padding: '10px', width: '300px' }}
              />
              <ErrorMessage
                name="dateInput"
                component="div"
                style={{ color: 'red', marginTop: '5px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!(isValid && dirty)}
              style={{
                padding: '10px 20px',
                backgroundColor: isValid && dirty ? 'green' : 'gray',
                color: 'white',
                border: 'none',
                cursor: isValid && dirty ? 'pointer' : 'not-allowed',
              }}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Testing;
