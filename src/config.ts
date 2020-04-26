const dev = {
  STRIPE_KEY: "pk_test_1LvPnx5EfGRNqeGlOsY8ntUD004gU45lCk",
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-app-api-dev-attachmentsbucket-1ss1mj4e4d6ro"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://7f6vl4k379.execute-api.ap-southeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_3QkiQX2Yo",
    APP_CLIENT_ID: "3499m8d9unip8eo96kb8rvg03n",
    IDENTITY_POOL_ID: "ap-southeast-2:b7a0f270-65a7-47a1-b176-54280b9106c1"
  }
};

const prod = dev;

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
