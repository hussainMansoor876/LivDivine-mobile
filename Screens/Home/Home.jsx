import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TextInput, ImageBackground } from 'react-native';
import { Rating, Image, SearchBar } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles, homeStyles } from '../../styles'
import { useState } from 'react';


const dummyImage = 'https://res.cloudinary.com/dzkbtggax/image/upload/v1595802600/pfz3a6qvkaqtwsenvmh5.jpg'

const Home = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        searchValue: ''
    })
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <SearchBar
                placeholder="Search Advisors"
                value={state.searchValue}
                onChangeText={(e) => setState({ ...state, searchValue: e })}
                placeholderTextColor="#fff"
                inputStyle={{ color: '#fff' }}
                onSubmitEditing={(e) => console.log('******')}
            />
            <ScrollView style={loginStyles.setFlex}>
                {/* <View style={homeStyles.viewStyles}>
                    <TextInput
                        style={homeStyles.textInputStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Search"
                    />
                </View> */}
                <View style={homeStyles.viewStyle}>
                    <View style={homeStyles.childStyle}>
                        <Image
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        />
                        <Text style={homeStyles.name}>Yasir Khan</Text>
                        <Text style={homeStyles.ctgry}>Love & Career</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Rating
                                imageSize={20}
                                style={homeStyles.rating}
                                startingValue={5}
                            />
                            <Text style={{ ...homeStyles.rating, marginLeft: 15 }}>5</Text>
                        </View>
                        {/* <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
