import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TextInput, ImageBackground } from 'react-native';
import { Rating, Image } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles, homeStyles } from '../../styles'


const dummyImage = 'https://res.cloudinary.com/dzkbtggax/image/upload/v1595802600/pfz3a6qvkaqtwsenvmh5.jpg'

const Home = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <View style={homeStyles.viewStyles}>
                    <TextInput
                        style={homeStyles.textInputStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Search"
                    />
                </View>
                <View style={homeStyles.viewStyle}>
                    <View style={homeStyles.childStyle}>
                        <Image
                            style={{ height: 170, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                            source={{ uri: dummyImage }}
                        />
                        <Text style={homeStyles.name}>Yasir Khan</Text>
                        <Text style={homeStyles.ctgry}>Love & Career</Text>
                        <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                        {/* <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text> */}
                    </View>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 200, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
