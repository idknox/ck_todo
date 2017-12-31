const { environment } = require('@rails/webpacker')

environment.loaders.append('sass-resources-loader', {
  test: /\.scss$/,
  use: [
    {
      loader: 'sass-resources-loader',
      options: {
        resources: ['./app/client/styles/mixins.scss', './app/client/styles/variables.scss']
      }
    }
  ]
});

module.exports = environment
