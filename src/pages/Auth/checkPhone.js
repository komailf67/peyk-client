import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AuthActions from '../../redux/actions/authActions';

const CheckPhone = ({ checkPhoneNumber, reset_password }) => {
  const [phone, setPhone] = useState('');
  const handleCheckPhone = () => {
    const phonePrefix = 98;
    const phoneNumber = parseInt(phone, 10);
    const countryId = 9;
    checkPhoneNumber({
      phone: `${phonePrefix}${phoneNumber}`,
      country_id: countryId,
      reset_password: reset_password,
    });
  };
  return (
    <>
      <p>check phone</p>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleCheckPhone} type="button">
        submit
      </button>
    </>
  );
};

const mapStateToProps = (store) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  checkPhoneNumber(data) {
    dispatch({ type: AuthActions.AUTH.CHECK_PHONE.REQUESTING, payload: data });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckPhone);
