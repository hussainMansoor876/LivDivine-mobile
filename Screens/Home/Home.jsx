import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Rating, Image, SearchBar, Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles, homeStyles, AdvisorStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { appColor } from '../../utils/constant';
import Modal from 'react-native-modal';


const dummyImage = 'https://res.cloudinary.com/dzkbtggax/image/upload/v1595802600/pfz3a6qvkaqtwsenvmh5.jpg'

const Home = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false)
    const [state, setState] = useState({
        searchValue: ''
    })

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    };

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <View style={AdvisorStyles.headerView}>
                <FeatherIcon
                    name='menu'
                    size={30}
                    color='#fff'
                    onPress={navigation.toggleDrawer}
                />
                <Text style={{ color: '#fff', fontSize: 20, marginLeft: -10, alignSelf: 'center' }}>Home</Text>
                <FontAwesomeIcon
                    name="filter"
                    size={30}
                    color="#fff"
                />
            </View>
            <SearchBar
                placeholder="Search Advisors"
                value={state.searchValue}
                onChangeText={(e) => setState({ ...state, searchValue: e })}
                // placeholderTextColor="#fff"
                lightTheme
                inputStyle={{ backgroundColor: '#fff' }}
                onSubmitEditing={(e) => console.log('******')}
                round
                color="#000000"
                containerStyle={{ backgroundColor: appColor }}
                inputContainerStyle={{ backgroundColor: '#fff' }}
            />
            <ScrollView style={loginStyles.setFlex}>
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
            <View style={{ flex: 1 }}>
                <Button title="Show modal" onPress={toggleModal} />
                <Modal
                    isVisible={isModalVisible}
                    backdropOpacity={0.5}
                    backdropTransitionInTiming={100}
                    backdropTransitionOutTiming={100}
                >
                    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Hello!</Text>
                        <Button title="Hide modal" onPress={toggleModal} />
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default Home;
