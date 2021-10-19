import * as React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import FastImage, {Source} from 'react-native-fast-image'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {
  GRAY_400,
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
    height: wp(42),
    width: wp(42),
    backgroundColor: PRIMARY_50,
    justifyContent: 'space-between',
  },
  image: {
    width: wp(10),
    height: wp(10),
    margin: wp(5),
  },
  textsContainer: {
    padding: wp(5),
  },
  titleFirstPart: {
    fontSize: wp(4.5),
    fontWeight: '400',
  },
  titleSecondPart: {
    fontSize: wp(3.2),
    color: GRAY_400,
    fontWeight: '400',
  },
  percentage: {
    fontSize: wp(4),
    marginTop: wp(0.5),
  },
})
