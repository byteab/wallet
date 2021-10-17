import home from './home'
import landing from './landing'
import tokens from './tokens'

import * as React from 'react'
import {StatusBar} from 'react-native'
import {Navigation} from 'react-native-navigation'
import type {LayoutTabsChildren} from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Feather'

export const TOKENS_SCREEN = 'wallet.TokensScreen'
export const HOME_SCREEN = 'wallet.HomeScreen'
export const LANDING_SCREEN = 'wallet.MoreScreen'

export const Screens = new Map()
Screens.set(TOKENS_SCREEN, tokens)
Screens.set(HOME_SCREEN, home)
Screens.set(LANDING_SCREEN, landing)

export const startApp = () => {
  StatusBar.setBarStyle('dark-content', true)

  const iconColor = 'rgba(0,0,0,0.5)'
  const textColor = 'rgba(0,0,0,0.5)'
  const selectedIconColor = '#BB954F'
  const selectedTextColor = '#BB954F'

  const tabs: LayoutTabsChildren[] = [
    {
      stack: {
        id: 'HOME_SCREEN',
        children: [
          {
            component: {
              name: HOME_SCREEN,
            },
          },
        ],
        options: {
          bottomTab: {
            iconColor,
            textColor,
            selectedIconColor,
            selectedTextColor,
            text: 'HOME',
            testID: 'HOME_TAB',
            icon: Icon.getImageSourceSync('home', 30, '#900'),
          },
          topBar: {
            visible: false,
          },
        },
      },
    },
    {
      stack: {
        id: 'TOKENS_SCREEN',
        children: [
          {
            component: {
              name: TOKENS_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Collections',
                  },
                },
              },
            },
          },
        ],
        options: {
          bottomTab: {
            iconColor,
            textColor,
            selectedIconColor,
            selectedTextColor,
            text: 'Categories',
            testID: 'CATEGORIES_TAB',
            icon: Icon.getImageSourceSync('grid', 30, '#900'),
          },
        },
      },
    },
    {
      stack: {
        id: 'CART_SCREEN',
        children: [
          {
            component: {
              name: CART_SCREEN,
            },
          },
        ],
        options: {
          bottomTab: {
            iconColor,
            textColor,
            selectedIconColor,
            selectedTextColor,
            text: 'Cart',
            testID: 'CART_TAB',
            icon: Icon.getImageSourceSync('shopping-cart', 30, '#900'),
          },
        },
      },
    },
    {
      stack: {
        id: 'LANDING_SCREEN',
        children: [
          {
            component: {
              name: LANDING_SCREEN,
            },
          },
        ],
        options: {
          bottomTab: {
            iconColor,
            textColor,
            selectedIconColor,
            selectedTextColor,
            text: 'More',
            testID: 'MORE_TAB',
            icon: Icon.getImageSourceSync('align-left', 30, '#900'),
          },
        },
      },
    },
  ]

  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#fff',
    },
    topBar: {
      title: {
        color: '#000',
      },
      backButton: {
        color: 'white',
      },
      background: {
        color: '#fff',
      },
    },
  })

  return Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'ROOT',
        children: tabs,
      },
    },
  })
}

// add moving to pages logic in here
