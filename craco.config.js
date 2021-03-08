module.exports = {
  rules: [
    {
      test: /\.js$/,
      loader: 'webpack-remove-debug'
    },
    {
      test: /\.(mov|mp4)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }  
        }
      ]
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
  loaders: [
      {
        test: /\.js$/,
        loader: 'webpack-remove-debug'
      }
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