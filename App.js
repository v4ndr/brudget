import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {inputScreen, monitorScreen, toCheckScreen, checkedScreen, cfgScreen, addBudgetScreen, addRecurenceScreen, editOpScreen} from './components/index'
import {store, persistor} from './store/configureStore'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const ToggleDrawerButton = (props) => (
  <TouchableOpacity onPress={()=>{props.navigation.toggleDrawer()}}>
    <FontAwesomeIcon icon={faBars} style={styles.headerButton}/>
  </TouchableOpacity>
)

const inputStack = () => {
  const Stack = createStackNavigator()
  return(
    <Stack.Navigator>
      <Stack.Screen name='inputScreen' component={inputScreen} options={({navigation})=>({
        title:'Budget.',
        headerLeft:()=>(<ToggleDrawerButton navigation={navigation}/>)
      })}/>
    </Stack.Navigator>
  )
}

const monitorStack = () => {
  const Stack = createStackNavigator()
  return(
    <Stack.Navigator>
      <Stack.Screen name='monitorScreen' component={monitorScreen} options={({navigation})=>({
        title:'Budget.',
        headerLeft:()=>(<ToggleDrawerButton navigation={navigation}/>)
      })}/>
    </Stack.Navigator>
  )
}

const releveStack = () => {
  const Stack = createStackNavigator()
  return(
    <Stack.Navigator>
      <Stack.Screen name='toCheckScreen' component={toCheckScreen} options={({navigation})=>({
        title:'Budget.',
        headerLeft:()=>(<ToggleDrawerButton navigation={navigation}/>)
      })}/>
      <Stack.Screen name='checkedScreen' component={checkedScreen} options={({navigation})=>({
        title:'Opérations pointées',
        headerBackTitle:'Retour'
      })}/>
      <Stack.Screen name='editOpScreen' component={editOpScreen} options={({navigation})=>({
        title:'Editer une opération',
        headerBackTitle:'Retour'
      })}/>
    </Stack.Navigator>
  )
}

const cfgStack = () => {
  const Stack = createStackNavigator()
  return(
    <Stack.Navigator>
      <Stack.Screen name='cfgScreen' component={cfgScreen} options={({navigation})=>({
        title:'Budget.',
        headerLeft:()=>(<ToggleDrawerButton navigation={navigation}/>)
      })}/>
      <Stack.Screen name='addBudgetScreen' component={addBudgetScreen} options={({navigation})=>({
        title:'Nouveau budget',
        headerBackTitle:'Retour'
      })}/>
      <Stack.Screen name='addRecurenceScreen' component={addRecurenceScreen} options={({navigation})=>({
        title:'Nouvelle opération récurente',
        headerBackTitle:'Retour'
      })}/>
    </Stack.Navigator>
  )
}

const App = () => {
  const Drawer = createDrawerNavigator()
  return(
    <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator drawerType='slide'>
            <Drawer.Screen name="Nouvelle opération" component={inputStack}/>
            <Drawer.Screen name='Tableau de bord' component={monitorStack}/>
            <Drawer.Screen name='Opérations à pointer' component={releveStack}/>
            <Drawer.Screen name='Configuration du budget' component={cfgStack}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({
  headerButton:{
    margin: 20
  }
})