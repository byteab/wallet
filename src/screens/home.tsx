import * as React from 'react'
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import type {Source} from 'react-native-fast-image'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {tobTabs, tokensInfo} from '../data/fake-data'
import {
  GRAY_400,
  GRAY_800,
  PRIMARY_50,
  SECONDARY_200,
  SECONDARY_50,
  SECONDARY_500,
} from '../styles/colors'
import {paddings} from '../styles/sizes'
import Mover from '../components/Mover'
import TokenTopInfo from '../components/TokenTopInfo'
import RNBootSplash from 'react-native-bootsplash'
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const home = () => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      RNBootSplash.hide({fade: true})
    }
  }, [])

  const HEADER_HEIGHT = wp(20)
  const clamp = (value: number, lowerBound: number, upperBound: number) => {
    'worklet'
    return Math.min(Math.max(lowerBound, value), upperBound)
  }

  const scrollClamp = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler<{prevY: number}>({
    onScroll: (event, ctx) => {
      const diff = event.contentOffset.y - ctx.prevY
      scrollClamp.value = clamp(scrollClamp.value + diff, 0, HEADER_HEIGHT)
      console.log(scrollClamp.value)
    },
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y
    },
  })

  const topPartRef = React.useRef()

  const aValue = -wp(25)
  const topPartStyle = useAnimatedStyle(() => {
    const clampedScrollY = interpolate(
      scrollClamp.value,
      [0, HEADER_HEIGHT],
      [0, HEADER_HEIGHT],
      Extrapolate.CLAMP,
    )
    const minusScrollY = clampedScrollY * -1
    const translateY = clamp(minusScrollY, aValue, 0)
    return {
      position: 'absolute',
      transform: [
        {
          translateY,
        },
      ],
      paddingHorizontal: paddings.screenPaddingHorizontal,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 1000,
    }
  })

  return (
    <SafeAreaView style={styles.body}>
      <Animated.View
        onLayout={e => {
          //@ts-ignore
          // topPartRef.current?.measure((fx, fy, width, height, px, py) => {
          //   y.value = py
          // })
        }}
        style={[
          topPartStyle,
          {width: wp(100), paddingTop: paddings.screenPaddingTop},
        ]}
        //@ts-ignore
        ref={topPartRef}>
        <Header scrollClamp={scrollClamp} />
        <View style={styles.tabs}>
          {tobTabs.map(({imageUrl, text, active}) => (
            <TabItem isActive={!!active} imageUrl={imageUrl} text={text} />
          ))}
        </View>
      </Animated.View>
      <AnimatedFlatList
        style={styles.flatList}
        onScroll={scrollHandler}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={() => (
          <View style={tokenTopInfoStyle.container}>
            <View style={styles.moverContainer}>
              <View style={styles.moverHeader}>
                <Text style={styles.moverTitle}>Top Movers</Text>
                <Text style={styles.moverShowMore}>See all</Text>
              </View>
              <View style={styles.movers}>
                <Mover
                  backgroundColor={PRIMARY_50}
                  percentage="+99.87%"
                  title="BCH $0.68"
                  source={require('../assets/images/bitcoin-cash.png')}
                />
                <Mover
                  backgroundColor={SECONDARY_50}
                  percentage="+97.87%"
                  title="BIN $0.70"
                  source={require('../assets/images/binance.png')}
                />
              </View>
            </View>
            <Text style={tokenTopInfoStyle.text}>Gainers & Losers</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TokenTopInfo
              currency={item.tokenName}
              percentage={item.raisePercentage}
              backgroundColor={item.backgroundColor}
              price={item.price}
              currencySymbol={item.abbr}
              // using index as key is terrible
              key={index}
              image={item.image}
            />
          )
        }}
        data={tokensInfo}
      />
    </SafeAreaView>
  )
}

const tokenTopInfoStyle = StyleSheet.create({
  container: {
    marginBottom: wp(3),
    marginTop: wp(7),
  },
  text: {
    fontSize: wp(4.7),
  },
})

const Header: React.FC<{scrollOffset: SharedValue<number>}> = () => {
  const container = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 15,
      // backgroundColor: 'rgba(255,255,255,0.8)',
    }
  })
  return (
    <Animated.View style={container}>
      <View style={headerStyle.left}>
        <FastImage
          source={require('../assets/images/menu.png')}
          style={headerStyle.icon}
        />
        <Text style={headerStyle.text}>Home</Text>
      </View>
      <View style={headerStyle.right}>
        <FastImage
          style={headerStyle.image}
          source={require('../assets/images/profile.jpeg')}
        />
      </View>
    </Animated.View>
  )
}

const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp(5),
    height: wp(8),
    margin: wp(2),
  },
  text: {
    fontSize: wp(3.5),
  },
  right: {
    backgroundColor: '#fff',
    width: wp(12),
    height: wp(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(100),
    borderWidth: 0.1,
  },
})

const TabItem: React.FC<{imageUrl: Source; text: string; isActive: boolean}> =
  ({imageUrl, text, isActive}) => {
    const tabItemStyle = React.useMemo(
      () =>
        StyleSheet.create({
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          imageContainer: {
            borderRadius: wp(100),
            backgroundColor: isActive ? SECONDARY_200 : SECONDARY_50,
            padding: wp(3),
            aspectRatio: 1,
          },
          circle: {
            borderWidth: wp(0.5),
            borderRadius: wp(100),
            padding: wp(1.5),
            aspectRatio: 1,
            borderColor: isActive ? SECONDARY_200 : SECONDARY_50,
          },
          image: {
            width: wp(7),
            height: wp(7),
            alignSelf: 'center',
          },
          text: {
            fontSize: wp(3),
            fontWeight: '500',
            marginTop: wp(2),
            color: isActive ? GRAY_800 : GRAY_400,
          },
        }),
      [isActive],
    )
    return (
      <Pressable style={tabItemStyle.container}>
        <View style={tabItemStyle.circle}>
          <View style={tabItemStyle.imageContainer}>
            <FastImage source={imageUrl} style={tabItemStyle.image} />
          </View>
        </View>
        <Text style={tabItemStyle.text}>{text}</Text>
      </Pressable>
    )
  }

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: paddings.screenPaddingHorizontal,
    paddingTop: wp(2),
  },
  flatList: {},
  flatListContent: {
    paddingTop: wp(40),
    // paddingBottom: wp(20),
    // paddingHorizontal: paddings.screenPaddingHorizontal,
  },
  container: {},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: wp(4),
  },
  // MOVER
  moverContainer: {
    // paddingVertical: 40,
    paddingBottom: wp(5),
    // paddingTop: wp(5)
  },
  moverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: wp(2),
  },
  moverTitle: {
    fontSize: wp(5),
  },
  moverShowMore: {
    fontSize: wp(3.3),
    color: SECONDARY_500,
  },
  movers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default home
