import React from 'react';

import { Provider } from 'react-redux'

import PlacesNavigator from './navigation/PlacesNavigator'
import store from './store/store';

import { init } from './helpers/db'

init().then(() => {
  console.log('success')
}).catch((err) => {
  console.log(err)
})

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )
}

