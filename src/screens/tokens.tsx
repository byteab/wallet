import * as React from 'react'
import {Text, FlatList, View, StyleSheet, SafeAreaView} from 'react-native'
import FastImage from 'react-native-fast-image'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import TokenInfo from '../components/TokenInfo'
import {tokensInfo} from '../data/fake-data'
import {GRAY_400, GRAY_800} from '../styles/colors'
import {paddings} from '../styles/sizes'
let data = [...tokensInfo, ...tokensInfo, ...tokensInfo, ...tokensInfo]
const tokens = () => {
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.headerTextsContainer}>
              <Text style={styles.headerPrice}>$ 72,163.00</Text>
              <Text style={styles.headerTitle}>Portfolio balance</Text>
            </View>
            <View style={styles.headerImageContainer}>
              <FastImage
                style={styles.headerImage}
                source={require('../assets/images/profile.jpeg')}
              />
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        data={data}
        renderItem={({item, index}) => {
          return (
            <TokenInfo
              amount={item.amount}
              currency={item.tokenName}
              price={item.price}
              currencySymbol={item.abbr}
              // using index as key is terrible
              key={index}
              image={item.image}
            />
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  headerTextsContainer: {},
  headerPrice: {
    fontSize: wp(5),
    color: GRAY_800,
  },
  headerTitle: {
    fontSize: wp(3.5),
    color: GRAY_400,
  },
  headerImageContainer: {
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
  headerImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(100),
    borderWidth: 0.1,
  },
  flatList: {},
  flatListContainer: {
    paddingTop: paddings.screenPaddingTop,
    paddingHorizontal: paddings.screenPaddingHorizontal,
  },
})

export default tokens
