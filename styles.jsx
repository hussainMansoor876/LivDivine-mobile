import React from 'react';
import { StyleSheet } from 'react-native'
import Screen from './utils/ScreenDimensions'
import { appColor } from './utils/constant'

const loginStyles = StyleSheet.create({
    setFlex: {
        flex: 1
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    loginView: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        paddingTop: 20
    },
    TextStyle: {
        textAlign: 'center',
        fontSize: 24,
    },
    connect: {
        marginTop: 10,
        textAlign: 'center',
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dhaa: {
        marginTop: 30,
        textAlign: 'center',
        color: 'orange',
        fontWeight: 'normal',
        fontSize: 16,
        marginBottom: 10
    },
    social: {
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 30
    },
    inputLogin: {
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        borderColor: '#000000',
        marginBottom: -5
    },
    loginBtn: {
        borderRadius: 8,
        width: '96%',
        marginLeft: '2%',
        marginTop: 10,
        marginBottom: 10,
        height: 46
    },
    socialBtn: {
        flex: 1
    },
    forgotPas: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
        color: '#24a0ed',
    },
    logoImg: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 40
    },
    AdvisorLogoImg: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20
    }
})

const signupStyles = StyleSheet.create({
    TextStyle: {
        textAlign: 'center',
        fontSize: 24,
    },
    social: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
    },
    txt: {
        textAlign: 'center',
    },
    baseText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    innerText: {
        color: 'orange',
    },

    service: {
        color: 'orange',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
const categoriesStyles = StyleSheet.create({
    titlesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Screen.height / 4,
        margin: 3
    },

    cardStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        margin: 3
    }
})
const settingsStyles = StyleSheet.create({
    fields: {
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 10,
        fontSize: 16,
        borderTopColor: 'rgba(0, 0, 0, 0.5)',
        borderTopWidth: 1
    },
    fieldsbold: {
        marginLeft: 10,
        paddingTop: 20,
        fontWeight: 'bold',
        fontSize: 18
    },
    header: {
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    textStyle: {
        fontSize: 18,
        marginLeft: 15,
        marginBottom: 5
    },
    settingsView: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        paddingTop: 20,
        borderColor: '#000000',
        borderWidth: 2,
        marginTop: 20,
        paddingBottom: 10,
        borderRadius: 10
    }
})
const fvadStyles = StyleSheet.create({
    titlesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Screen.height / 4,
    },
    cardStyle: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width: '90%',
        marginRight: 10,

    },
    rstyle: {
        marginRight: 10,
    }
})

const AdvisorStyles = StyleSheet.create({
    checkBox: {
        flex: 1,
        margin: 0,
        paddingLeft: 5,
        paddingBottom: 10,
        paddingTop: 5,
        marginLeft: -5
    },
    profileImage: {
        width: 65,
        height: 65,
        marginRight: 10,
        borderRadius: 50,
    },
    setFlex: {
        flex: 1,
        flexDirection: 'row'
    },
    viewProfile: {
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Screen.width / 2,
        zIndex: 9999,
    },
    activityStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 80
    },
    leftIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 60,
        height: 60
    },
    orderView: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    orderText: {
        fontSize: 16,
        letterSpacing: 1.5
    },
    aboutText: {
        fontSize: 14,
        letterSpacing: 1.5,
        marginTop: 10,
        marginBottom: 10
    },
    titleColor: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 13
    },
    headerView: {
        backgroundColor: appColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    btnStyle: {
        backgroundColor: appColor
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const homeStyles = StyleSheet.create({
    viewStyles: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 40,
        padding: 16,
        marginLeft: 10,
        marginRight: 10,
    },
    tile: {
        height: 170,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover'
    },
    main: {
        flex: 1,
        margin: 40,
    },
    image: {
        width: '100%',
        height: 110,
        position: 'absolute',
    },
    viewStyle: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'space-between',
    },
    childStyle: {
        width: '49%',
        height: 250,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'column'
    },
    name: {
        marginTop: -50,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5,
        letterSpacing: 1.2
    },
    ctgry: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 6,
        fontWeight: 'bold',
        letterSpacing: 1.2
    },
    rating: {
        marginTop: 160,
        marginLeft: -75,
    }
})

export {
    loginStyles,
    signupStyles,
    categoriesStyles,
    settingsStyles,
    fvadStyles,
    AdvisorStyles,
    homeStyles
}