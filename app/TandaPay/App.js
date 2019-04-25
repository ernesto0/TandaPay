import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SubgroupStatus from './src/screens/SubgroupStatus';
import TandaStatus from './src/screens/TandaStatus';
import SubgroupScreen from './src/screens/SubgroupScreen';
import SubgroupInfo from './src/screens/SubgroupInfo';
import SubgroupNew from './src/screens/SubgroupNew';
import HomeScreen from './src/screens/HomeScreen';
import LoadScreen from './src/screens/LoadScreen';
import PayScreen from './src/screens/PayScreen';
import PayPremium from './src/screens/PayPremium';
import ClaimScreen from './src/screens/ClaimScreen';
import CharterScreen from './src/screens/Charter';
import {Provider} from 'react-redux';
import reducers from './src/reducers/index';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage';
import {PersistGate} from 'redux-persist/integration/react';

const RootStack = createStackNavigator(
  {
    Charter: CharterScreen,
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen, 
    SubgroupStatus: SubgroupStatus,
    TandaStatus: TandaStatus,
    Subgroup: SubgroupScreen,
    SubgroupInfo: SubgroupInfo,
    SubgroupNew: SubgroupNew,
    Home: HomeScreen,
    Load: LoadScreen,
    Pay: PayScreen,
    Claim: ClaimScreen,
    PayPremium: PayPremium
  },
  {
    initialRouteName: 'Charter',
  }
);

const Navigation = createAppContainer(RootStack);


  const config = {
    key: 'root',
    storage
  };

  const persistedReducer = persistCombineReducers(config, reducers);

  let store = createStore(persistedReducer, compose(
    applyMiddleware(thunk, logger)
    ));

  let persistor = persistStore(store)

  // persistor.purge();

export default class App extends React.Component {

  renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    return(
     <Provider store={store}>
      <PersistGate persistor={persistor} loading={this.renderLoading()}>
        <Navigation />
      </PersistGate>
     </Provider>
    );
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

