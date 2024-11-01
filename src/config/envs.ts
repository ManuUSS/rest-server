import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  port: get('PORT').required().asPortNumber(),
  publicPath: get('PUBLIC_PATH').default('public').asString(),
};
