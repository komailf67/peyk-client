import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CssBaseline,
  CardActions,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  FormControlLabel,
  Checkbox,
  CardHeader,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import DropDownMenu from '../components/menus/DropDownMenu';
import { connect } from 'react-redux';
import BaseInfoActions from '../redux/actions/baseInfoActions';
import CargoActions from '../redux/actions/cargoActions';
import NotificationActions from '../redux/actions/notificationActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: { marginTop: '20px' },
  card: {
    minWidth: 275,
    marginBottom: '50px',
    // padding: '10px 20px 20px 20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  bottomNavbar: {
    display: 'flex',
    justifyContent: 'center',
    height: '80px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
  },
}));
const NewService = ({ getDiretions, directions, createCargo, isFormSubmitted, changeFormSubmitState, setError }) => {
  const classes = useStyles();
  const [directionId, setDirectionId] = React.useState('');
  const [selectedDirection, setSelectedDirection] = React.useState(false);

  useEffect(() => {
    getDiretions();
  }, []);

  const handleChangeDirection = (event) => {
    setDirectionId(event.target.value);
    const direction = directions.find((item) => item.id === event.target.value);
    setSelectedDirection(direction);
  };

  const validationSchema = yup.object({
    senderName: yup.string().required('وارد کردن این فیلد الزامی است'),
    senderNationalCode: yup.number().test('maxDigits', 'کد ملی باید 10 رقم باشد', (number) => String(number).length === 10),
    senderPhone: yup.number().test('maxDigits', ' شماره موبایل باید با 98 وارد شود و 12 رقم باشد', (number) => String(number).length === 12),
    senderCity: yup.string().required('وارد کردن این فیلد الزامی است'),
    senderState: yup.string().required('وارد کردن این فیلد الزامی است'),
    senderAddress: yup.string().required('وارد کردن این فیلد الزامی است'),
    senderPlateNumber: yup.number().required('وارد کردن این فیلد الزامی است'),
    senderUnit: yup.number().required('وارد کردن این فیلد الزامی است'),
    senderPostalCode: yup.number().test('maxDigits', 'کد پستی باید 10 رقم باشد', (number) => String(number).length === 10),
    receiverName: yup.string().required('وارد کردن این فیلد الزامی است'),
    receiverNationalCode: yup.number().test('maxDigits', 'کد ملی باید 10 رقم باشد', (number) => String(number).length === 10),
    receiverPhone: yup.number().test('maxDigits', ' شماره موبایل باید با 98 وارد شود و 12 رقم باشد', (number) => String(number).length === 12),
    receiverCity: yup.string().required('وارد کردن این فیلد الزامی است'),
    receiverState: yup.string().required('وارد کردن این فیلد الزامی است'),
    receiverAddress: yup.string().required('وارد کردن این فیلد الزامی است'),
    receiverPlateNumber: yup.number().required('وارد کردن این فیلد الزامی است'),
    receiverUnit: yup.number().required('وارد کردن این فیلد الزامی است'),
    receiverPostalCode: yup.number().test('maxDigits', 'کد پستی باید 10 رقم باشد', (number) => String(number).length === 10),
    content: yup.string().required('وارد کردن این فیلد الزامی است'),
    weight: yup.number().required('وارد کردن این فیلد الزامی است'),
    value: yup.number().required('وارد کردن این فیلد الزامی است'),

    // password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      senderName: '',
      senderNationalCode: '',
      senderPhone: '',
      senderCity: '',
      senderState: '',
      senderAddress: '',
      senderPlateNumber: '',
      senderUnit: '',
      senderPostalCode: '',
      receiverName: '',
      receiverNationalCode: '',
      receiverPhone: '',
      receiverCity: '',
      receiverState: '',
      receiverAddress: '',
      receiverPlateNumber: '',
      receiverUnit: '',
      receiverPostalCode: '',
      content: '',
      weight: '',
      value: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!!directionId === false) {
        setError({
          message: 'یک مسیر انتخاب کنید',
        });
      }
      const selectedDirection = directions.find((item) => item.id === directionId);
      const dataToSend = {
        content: values.content,
        weight: values.weight,
        value: values.value,
        origin_address: {
          country_id: selectedDirection.origin_country.id,
          city_name: values.senderCity,
          province_name: values.senderState,
          full_name: values.senderName,
          national_code: values.senderNationalCode.toString(),
          postal_code: values.senderPostalCode.toString(),
          phone: values.senderPhone.toString(),
          address_line_one: values.senderAddress,
          address_line_two: null,
          plate_number: values.senderPlateNumber.toString(),
          unit: values.senderUnit.toString(),
          // unit3: 4,
        },
        destination_address: {
          country_id: selectedDirection.destination_country.id,
          city_name: values.receiverCity,
          province_name: values.receiverState,
          full_name: values.receiverName,
          national_code: values.receiverNationalCode.toString(),
          postal_code: values.receiverPostalCode.toString(),
          phone: values.receiverPhone.toString(),
          address_line_one: values.receiverAddress,
          address_line_two: null,
          plate_number: values.receiverPlateNumber.toString(),
          unit: values.receiverUnit.toString(),
          // unit3: 4,
        },
      };
      createCargo(dataToSend);
    },
  });
  useEffect(() => {
    if (isFormSubmitted) {
      formik.resetForm();
      changeFormSubmitState(false);
    }
  }, [isFormSubmitted]);
  return (
    <>
      <Container className={classes.container} component="main" maxWidth="md">
        <Typography variant="h6" gutterBottom>
          انتخاب مسیر
        </Typography>
        <form id="my-form" onSubmit={formik.handleSubmit}>
          <Box boxShadow={3}>
            <Card className={classes.card}>
              {/* <CardHeader title="Shrimp and Chorizo Paella" /> */}
              {/* <Box> */}
              <FormControl className={classes.formControl} style={{ direction: 'rtl', minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">انتخاب مسیر</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={directionId} onChange={handleChangeDirection}>
                  {directions.length &&
                    directions.map(({ id, origin_country, destination_country }, index) => (
                      <MenuItem key={index} value={id}>
                        {origin_country.name} به {destination_country.name}
                      </MenuItem>
                    ))}
                  {/* <MenuItem value={10}>Ten</MenuItem> */}
                </Select>
              </FormControl>
              {/* <DropDownMenu buttonName="انتخاب مسیر" /> */}
              {/* </Box> */}
            </Card>
          </Box>
          <Box display="flex">
            <Typography variant="h6" gutterBottom>
              آدرس فرستنده{' '}
            </Typography>
            {selectedDirection?.origin_country?.name ? (
              <Box ml={1}>
                <FormControl className={classes.formControl} disabled style={{ minWidth: 100 }}>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={1}
                    // onChange={handleChange}
                  >
                    <MenuItem value={1}>{selectedDirection?.origin_country?.name}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ) : null}
          </Box>
          <Box boxShadow={3}>
            <Card className={classes.card}>
              {/* <CardHeader title="آدرس فرستنده" /> */}
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="senderName"
                      name="senderName"
                      label="نام و نام خانوادگی"
                      fullWidth
                      autoComplete="shipping address-level2"
                      value={formik.values.senderName}
                      onChange={formik.handleChange}
                      error={formik.touched.senderName && Boolean(formik.errors.senderName)}
                      helperText={formik.touched.senderName && formik.errors.senderName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="senderNationalCode"
                      name="senderNationalCode"
                      label="کد ملی"
                      fullWidth
                      value={formik.values.senderNationalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.senderNationalCode && Boolean(formik.errors.senderNationalCode)}
                      helperText={formik.touched.senderNationalCode && formik.errors.senderNationalCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="senderPhone"
                      name="senderPhone"
                      label="شماره تماس"
                      fullWidth
                      autoComplete="شماره تماس"
                      value={formik.values.senderPhone}
                      onChange={formik.handleChange}
                      error={formik.touched.senderPhone && Boolean(formik.errors.senderPhone)}
                      helperText={formik.touched.senderPhone && formik.errors.senderPhone}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="senderCity"
                      name="senderCity"
                      label="شهر"
                      fullWidth
                      autoComplete="shipping address-level2"
                      value={formik.values.senderCity}
                      onChange={formik.handleChange}
                      error={formik.touched.senderCity && Boolean(formik.errors.senderCity)}
                      helperText={formik.touched.senderCity && formik.errors.senderCity}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="senderState"
                      name="senderState"
                      label="استان"
                      fullWidth
                      value={formik.values.senderState}
                      onChange={formik.handleChange}
                      error={formik.touched.senderState && Boolean(formik.errors.senderState)}
                      helperText={formik.touched.senderState && formik.errors.senderState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="senderAddress"
                      name="senderAddress"
                      label="آدرس فرستنده"
                      fullWidth
                      autoComplete="shipping address-line1"
                      value={formik.values.senderAddress}
                      onChange={formik.handleChange}
                      error={formik.touched.senderAddress && Boolean(formik.errors.senderAddress)}
                      helperText={formik.touched.senderAddress && formik.errors.senderAddress}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="senderPlateNumber"
                      name="senderPlateNumber"
                      label="پلاک"
                      fullWidth
                      autoComplete="پلاک"
                      value={formik.values.senderPlateNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.senderPlateNumber && Boolean(formik.errors.senderPlateNumber)}
                      helperText={formik.touched.senderPlateNumber && formik.errors.senderPlateNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="senderUnit"
                      name="senderUnit"
                      label="واحد"
                      fullWidth
                      autoComplete="واحد"
                      value={formik.values.senderUnit}
                      onChange={formik.handleChange}
                      error={formik.touched.senderUnit && Boolean(formik.errors.senderUnit)}
                      helperText={formik.touched.senderUnit && formik.errors.senderUnit}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="senderPostalCode"
                      name="senderPostalCode"
                      label="کد پستی"
                      fullWidth
                      autoComplete="کد پستی"
                      value={formik.values.senderPostalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.senderPostalCode && Boolean(formik.errors.senderPostalCode)}
                      helperText={formik.touched.senderPostalCode && formik.errors.senderPostalCode}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
          <Box display="flex">
            <Typography variant="h6" gutterBottom>
              آدرس گیرنده{' '}
            </Typography>
            {selectedDirection?.destination_country?.name ? (
              <Box ml={1}>
                <FormControl className={classes.formControl} disabled style={{ minWidth: 100 }}>
                  <Select
                    labelId="demo-simple-select-disabled-label"
                    id="demo-simple-select-disabled"
                    value={1}
                    // onChange={handleChange}
                  >
                    <MenuItem value={1}>{selectedDirection?.destination_country?.name}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ) : null}
          </Box>
          <Box boxShadow={3}>
            <Card className={classes.card}>
              {/* <CardHeader title="آدرس گیرنده" /> */}
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="receiverName"
                      name="receiverName"
                      label="نام و نام خانوادگی"
                      fullWidth
                      autoComplete="shipping address-level2"
                      value={formik.values.receiverName}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverName && Boolean(formik.errors.receiverName)}
                      helperText={formik.touched.receiverName && formik.errors.receiverName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="receiverNationalCode"
                      name="receiverNationalCode"
                      label="کد ملی"
                      fullWidth
                      value={formik.values.receiverNationalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverNationalCode && Boolean(formik.errors.receiverNationalCode)}
                      helperText={formik.touched.receiverNationalCode && formik.errors.receiverNationalCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="receiverPhone"
                      name="receiverPhone"
                      label="شماره تماس"
                      fullWidth
                      autoComplete="شماره تماس"
                      value={formik.values.receiverPhone}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverPhone && Boolean(formik.errors.receiverPhone)}
                      helperText={formik.touched.receiverPhone && formik.errors.receiverPhone}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="receiverCity"
                      name="receiverCity"
                      label="شهر"
                      fullWidth
                      autoComplete="shipping address-level2"
                      value={formik.values.receiverCity}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverCity && Boolean(formik.errors.receiverCity)}
                      helperText={formik.touched.receiverCity && formik.errors.receiverCity}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="receiverState"
                      name="receiverState"
                      label="استان"
                      fullWidth
                      value={formik.values.receiverState}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverState && Boolean(formik.errors.receiverState)}
                      helperText={formik.touched.receiverState && formik.errors.receiverState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="receiverAddress"
                      name="receiverAddress"
                      label="آدرس فرستنده"
                      fullWidth
                      autoComplete="shipping address-line1"
                      value={formik.values.receiverAddress}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverAddress && Boolean(formik.errors.receiverAddress)}
                      helperText={formik.touched.receiverAddress && formik.errors.receiverAddress}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="receiverPlateNumber"
                      name="receiverPlateNumber"
                      label="پلاک"
                      fullWidth
                      autoComplete="پلاک"
                      value={formik.values.receiverPlateNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverPlateNumber && Boolean(formik.errors.receiverPlateNumber)}
                      helperText={formik.touched.receiverPlateNumber && formik.errors.receiverPlateNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="receiverUnit"
                      name="receiverUnit"
                      label="واحد"
                      fullWidth
                      autoComplete="واحد"
                      value={formik.values.receiverUnit}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverUnit && Boolean(formik.errors.receiverUnit)}
                      helperText={formik.touched.receiverUnit && formik.errors.receiverUnit}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id="receiverPostalCode"
                      name="receiverPostalCode"
                      label="کد پستی"
                      fullWidth
                      autoComplete="کد پستی"
                      value={formik.values.receiverPostalCode}
                      onChange={formik.handleChange}
                      error={formik.touched.receiverPostalCode && Boolean(formik.errors.receiverPostalCode)}
                      helperText={formik.touched.receiverPostalCode && formik.errors.receiverPostalCode}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
          <Typography variant="h6" gutterBottom>
            مشخصات بسته
          </Typography>
          <Box mb={12} boxShadow={3}>
            <Card className={classes.card}>
              {/* <CardHeader title="مشخصات بسته" /> */}
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} disabled style={{ minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-disabled-label">نوع بسته</InputLabel>
                      <Select
                        labelId="demo-simple-select-disabled-label"
                        id="demo-simple-select-disabled"
                        value={1}
                        // onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>پاکت</MenuItem>
                      </Select>
                    </FormControl>{' '}
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="content"
                        name="content"
                        label="محتویات بسته"
                        fullWidth
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        error={formik.touched.content && Boolean(formik.errors.content)}
                        helperText={formik.touched.content && formik.errors.content}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="number"
                        id="value"
                        name="value"
                        label="ارزش بسته(تومان)"
                        fullWidth
                        value={formik.values.value}
                        onChange={formik.handleChange}
                        error={formik.touched.value && Boolean(formik.errors.value)}
                        helperText={formik.touched.value && formik.errors.value}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="number"
                        id="weight"
                        name="weight"
                        label="وزن بسته (کیلوگرم)"
                        fullWidth
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        error={formik.touched.weight && Boolean(formik.errors.weight)}
                        helperText={formik.touched.weight && formik.errors.weight}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
          <Box boxShadow={3} className={classes.bottomNavbar}>
            <Container className={classes.container} component="main" maxWidth="md">
              <Box fullWidth width={1 / 4} alignSelf="center">
                <Button form="my-form" type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  ادامه
                </Button>
              </Box>
            </Container>
          </Box>
        </form>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    directions: state.baseInfo.directions.list,
    isFormSubmitted: state.cargo.createCargo.success,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDiretions: () => {
    dispatch({
      type: BaseInfoActions.BASE_INFO.DIRECTIONS.REQUESTING,
    });
  },
  createCargo: (data) => {
    dispatch({
      type: CargoActions.CARGO.CREATE.REQUESTING,
      payload: data,
    });
  },
  changeFormSubmitState: (state) => {
    dispatch({
      type: CargoActions.CARGO.CREATE.FORM_SUBMIT_STATE,
      payload: state,
    });
  },
  setError(data) {
    dispatch({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: data,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewService);
