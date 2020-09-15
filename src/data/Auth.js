import { Auth } from "aws-amplify";

Auth.configure({
  region: process.env.REGION,
  userPoolId: process.env.USER_POOL,
  userPoolWebClientId: process.env.USER_POOL_CLIENT,
});

export default Auth;
