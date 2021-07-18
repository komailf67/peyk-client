import React, { useEffect } from 'react';

const BankingForm = ({ gatewayData }) => {
  useEffect(() => {
    if (document.getElementById('gatewayForm')) document.getElementById('gatewayForm').submit();
  }, []);

  return (
    <form id="gatewayForm" action={gatewayData.form_parameters.action} method={gatewayData.form_parameters.method} target={gatewayData.form_parameters.target}>
      <>
        {Object.keys(gatewayData.form_inputs).map((value) => (
          <input type="hidden" name={value} value={gatewayData.form_inputs[value]} key={value} />
        ))}

        <input style={{ display: 'none' }} type="submit" value="Submit" />
      </>
    </form>
  );
};
export default BankingForm;
