export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-app-api-dev-attachmentsbucket-1ss1mj4e4d6ro"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://xoh8ekrogl.execute-api.ap-southeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_UBcc8kWWR",
    APP_CLIENT_ID: "651alt2e4hi74f0qpbfeks4895",
    IDENTITY_POOL_ID: "ap-southeast-2:9cb67888-a436-4494-8d8a-ae2949f8c351"
  }
};
