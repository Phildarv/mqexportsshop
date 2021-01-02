import axios, {AxiosResponse} from 'axios';
import OAuth from 'oauth-1.0a';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

export const config = {
  WC_BASE_URL: 'https://mqexports.com/',
  WC_API_URL: '/wp-json/wc/v3',
  WC_CONSUMER_KEY: 'ck_9f85ad35dd02ec8c8622e07a510692ae9212b8b6',
  WC_CONSUMER_SECRET: 'cs_7a5b2d6feabffb82fde36a592788f4b7d677e339',
};

const _getOAuth = (): OAuth =>
  new OAuth({
    consumer: {
      key: config.WC_CONSUMER_KEY,
      secret: config.WC_CONSUMER_SECRET,
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString: string, key: string) =>
      Base64.stringify(hmacSHA1(baseString, key)),
  });

const get = async (path: string): Promise<AxiosResponse<object>> => {
  const request = {
    url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
    method: 'GET',
  };
  const oauth = _getOAuth().authorize(request);

  return axios.get(request.url, {params: oauth});
};

const post = async (
  path: string,
  body: object,
): Promise<AxiosResponse<object>> => {
  const request = {
    url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
    method: 'POST',
  };
  const oauth = _getOAuth().authorize(request);

  return axios.post(request.url, body, {params: oauth});
};

export default {
  get,
  post,
};
