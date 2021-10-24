const isLogin = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return !!userInfo?.token;
};
export default isLogin;
