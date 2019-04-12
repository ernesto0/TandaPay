import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StatusScreen from './src/screens/StatusScreen';
import SubgroupScreen from './src/screens/SubgroupScreen';
import SubgroupInfo from './src/screens/SubgroupInfo';
import SubgroupNew from './src/screens/SubgroupNew';
import HomeScreen from './src/screens/HomeScreen';
import LoadScreen from './src/screens/LoadScreen'
import {Provider} from 'react-redux';
import reducers from './src/reducers/index';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage';
import {persistGate, PersistGate} from 'redux-persist/integration/react';

const RootStack = createStackNavigator(
  {
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen, 
    Status: StatusScreen,
    Subgroup: SubgroupScreen,
    SubgroupInfo: SubgroupInfo,
    SubgroupNew: SubgroupNew,
    Home: HomeScreen,
    Load: LoadScreen
  },
  {
    initialRouteName: 'Start',
  }
);

const Navigation = createAppContainer(RootStack);


  const config = {
    key: 'root',
    storage: 'AsyncStorage',
  };

  const persistedReducer = persistCombineReducers(config, reducers);

  let store = createStore(persistedReducer, compose(
    applyMiddleware(thunk, logger)
    ));

  let persistor = persistStore(store)

export default class App extends React.Component {

  renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    return(
     <Providor store={store}>
      <PersistGate persistor={persistor} loading={this.renderLoading()}>
        <Navigation />
      </PersistGate>
     </Providor>
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

