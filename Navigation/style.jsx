import React from 'react'
import { StyleSheet, Dimensions, Platform } from 'react-native'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 65,
    flex: 1,
    width: '100%'
  },
  drawerImage: {
    // position: "absolute",
    // left: 10,
    // top: Platform.OS === "android" ? deviceHeight / 11 : deviceHeight / 12,
    width: 120,
    height: 120,
    resizeMode: "cover",
    marginLeft: 10,
    borderRadius: 60
  },
  drawerText: {
    // position: "relative",
    // right: 40,
    // bottom: 480,
    color: '#fff',
    fontSize: 20,
    marginTop: 50,
    flex: 1,
    marginLeft: 5,

  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
})

export default styles
