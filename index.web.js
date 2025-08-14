/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App.tsx';

function AppWrapper() {
  return <App />;
}

AppRegistry.registerComponent(appName, () => AppWrapper);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
