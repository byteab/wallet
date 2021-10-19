import * as React from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import type {Source} from 'react-native-fast-image'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {
  GRAY_100,
  GRAY_300,
  GRAY_400,
  GRAY_700,
} from '../styles/colors'

const TokenInfo: React.FC<{
  image: Source
  currency: string
  currencySymbol: string
  price: string
  amount: number
}> = ({image, price, currencySymbol, amount, currency}) => {
  return (
    <Pressable style={style.container}>
      <View style={style.left}>
        <FastImage style={style.image} source={image} />
        <Text style={style.leftTopText}>{currency}</Text>
      </View>
      <View style={style.right}>
        <Text style={style.rightTopText}>{price}</Text>
        <Text style={style.rightBottomText}>
          {(amount || 0) + ' ' + currencySymbol}
        </Text>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: wp(0.3),
    borderColor: GRAY_100,
    paddingHorizontal: wp(5),
    paddingVertical: wp(2),
    marginBottom: wp(4),
  },
  image: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(100),
    marginRight: wp(2),
  },
  left: {
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftTopText: {
    fontSize: wp(4),
  },
  leftBottomText: {
    fontSize: wp(2.5),
    color: GRAY_400,
  },
  right: {},
  rightTopText: {
    fontSize: wp(4),
    color: GRAY_700,
  },
  rightBottomText: {
    fontSize: wp(3.5),
    color: GRAY_300,
    textAlign: 'right',
  },
})

export default TokenInfo
