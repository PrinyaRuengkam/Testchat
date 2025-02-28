const webpack = require('webpack'); // เพิ่มบรรทัดนี้

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // หรือ true หากต้องการรายละเอียด mismatch
      }),
    ],
  },
};

module.exports = {
  publicPath: '/', // ตั้งค่า publicPath เป็น root
};