/**
 * @format
 */
import {Navigation} from 'react-native-navigation'
import {startApp, Screens} from './src/screens'

Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => ScreenComponent),
)

Navigation.events().registerAppLaunchedListener(() => {
  startApp()
})
