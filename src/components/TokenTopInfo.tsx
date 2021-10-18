import * as React from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import type {Source} from 'react-native-fast-image'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {GRAY_100, GRAY_200, GRAY_400, GRAY_500, PRIMARY_500, PRIMARY_700} from '../styles/colors'

const TokenInfo: React.FC<{
  image: Source
  currency: string
  currencySymbol: string
  price: string
  percentage: string
  backgroundColor: string
}> = ({
  image,
  backgroundColor,
  price,
  percentage,
  currencySymbol,
  currency,
}) => {
  const imageContainer = React.useMemo(
    () => ({
      backgroundColor,
      borderRadius: wp(100),
      padding: wp(2.3),
      marginRight: wp(3),
    }),
    [backgroundColor],
  )
  return (
    <Pressable style={style.container}>
      <View style={imageContainer}>
        <FastImage style={style.image} source={image} />
      </View>
      <View style={style.left}>
        <Text style={style.leftTopText}>{currency}</Text>
        <Text style={style.leftBottomText}>{currencySymbol}</Text>
      </View>
      <View style={style.right}>
        <Text style={style.rightTopText}>{price}</Text>
        <Text style={style.rightBottomText}>{percentage}</Text>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    borderRadius: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: wp(0.3),
    borderColor: GRAY_100,
    paddingHorizontal: wp(5),
    paddingVertical: wp(5),
    marginBottom: wp(4),
  },
  image: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(100),
  },
  left: {
    marginRight: 'auto',
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
  },
  rightBottomText: {
    fontSize: wp(3.5),
    color: PRIMARY_500,
    textAlign: 'right',
  },
})

export default TokenInfo
