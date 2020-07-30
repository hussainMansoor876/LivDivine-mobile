import React from 'react';
import
{
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles, fvadStyles } from '../../styles'
import { Card, Rating } from 'react-native-elements';


const FavoriteAdvisors = (props) =>
{
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <View style={fvadStyles.titlesView}>

                    <View style={fvadStyles.cardStyle}>
                        <Card

                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}


                        ></Card>
                    </View>
                    <View style={fvadStyles.cardStyle}>
                        <Card

                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}
                            style={fvadStyles.picture}

                        >

                            <Text>Hello world</Text>
                            <Rating />
                        </Card>

                    </View>
                </View>
                <View style={fvadStyles.titlesView}>

                    <View style={fvadStyles.cardStyle}>
                        <Card
                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}
                        ></Card>
                    </View>
                    <View style={fvadStyles.cardStyle}>
                        <Card
                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}

                        ></Card>
                    </View>
                </View>
                <View style={fvadStyles.titlesView}>

                    <View style={fvadStyles.cardStyle}>
                        <Card
                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}
                        ></Card>
                    </View>
                    <View style={fvadStyles.cardStyle}>
                        <Card
                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}

                        ></Card>
                    </View>
                </View>
                <View style={fvadStyles.titlesView}>

                    <View style={fvadStyles.cardStyle}>
                        <Card
                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}
                        ></Card>
                    </View>
                    <View style={fvadStyles.cardStyle}>
                        <Card
                            containerStyle={fvadStyles.cardStyle}
                            image={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            }}

                        ></Card>
                    </View>
                </View>



            </ScrollView>
        </SafeAreaView>
    );
};

export default FavoriteAdvisors;
