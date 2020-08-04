const { merge } = require('webpack-merge');

const path = require('path');


const commonConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}

const mainAppConfig = {
  entry: './main-app/src/index.ts',
  output: {
    filename: 'main-app.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const workerConfig = {
  entry: './worker/src/worker.ts',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist'),
  },
};



module.exports = [
  merge(commonConfig, mainAppConfig),
  merge(commonConfig, workerConfig),
];
