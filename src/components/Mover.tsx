import * as React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import FastImage, {Source} from 'react-native-fast-image'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {
  GRAY_100,
  GRAY_400,
  PRIMARY_100,
  PRIMARY_200,
  PRIMARY_50,
} from '../styles/colors'

const Mover: React.FC<{
  title: string
  percentage: string
  source: Source
  backgroundColor: string
}> = ({source, title, percentage, backgroundColor}) => {
  const containerStyle = React.useMemo(
    () => ({
      ...styles.container,
      backgroundColor: backgroundColor || '#fff',
    }),
    [backgroundColor],
  )
  return (
    <Pressable style={containerStyle}>
      <FastImage style={styles.image} source={source} />
      <View style={styles.textsContainer}>
        <Text style={styles.titleFirstPart}>
          {title.split(' ')[0]}
          <Text style={styles.titleSecondPart}>{title.split(' ')[1]}</Text>
        </Text>
        <Text style={styles.percentage}>{percentage}</Text>
      </View>
    </Pressable>
  )
}

export default Mover

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(8),
    height: 180,
    flexBasis: 173,
    flexShrink: 1,
    flexGrow: 0,
    backgroundColor: PRIMARY_50,
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
    margin: 15,
  },
  textsContainer: {
    padding: 20,
  },
  titleFirstPart: {
    fontSize: 18,
    fontWeight: '400',
  },
  titleSecondPart: {
    fontSize: 14,
    color: GRAY_400,
    fontWeight: '400',
  },
  percentage: {
    fontSize: 20,
  },
})
