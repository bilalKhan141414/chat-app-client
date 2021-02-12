module.exports = {
  rules: [
    {
      test: /\.js$/,
      loader: 'webpack-remove-debug'
    },
    {
      test: /\.(txt|csv|mmdb)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: "[path][name].[ext]",
            emitFile: true,
          },
        },
      ],
    },
  ],
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }