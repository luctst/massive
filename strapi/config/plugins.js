const crypto = require('crypto');

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || crypto.randomBytes(16).toString('base64'),
    },
  },
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 5, // Default is 5
    }
  },
  // 'google-auth': {
  //   enabled: true,
  // },
});
