const env = {
  // mock 环境变量
  mock: {
    variables: {
      API_PROTOCOL: 'https://',
      API_HOST: 'testwts.masvn.com',
      API_BASE_PATH: '',
    },
  },

  // dev 环境变量 (npm run dev 将使用此配置)
  dev: {
    variables: {
      API_PROTOCOL: 'https://',
      API_HOST: 'testwts.masvn.com',
      API_BASE_PATH: '',
    },
  },

  // prod 环境变量 (npm run build 将使用此配置)
  prod: {
    variables: {
      API_PROTOCOL: 'https://',
      API_HOST: 'testwts.masvn.com',
      API_BASE_PATH: '',
    },
  },
}

export default env
