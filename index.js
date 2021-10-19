/**
 * @format
 */
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import {Navigation} from 'react-native-navigation'
import {startApp, Screens} from './src/screens'

Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(
    key,
    () => gestureHandlerRootHOC(ScreenComponent),
    () => ScreenComponent,
  ),
)

Navigation.events().registerAppLaunchedListener(() => {
  startApp()
})
