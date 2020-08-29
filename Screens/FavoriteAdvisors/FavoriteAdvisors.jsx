import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Rating, Image, SearchBar, Button, ListItem, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { Header } from '../../Components'
import { loginStyles, homeStyles, AdvisorStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { appColor } from '../../utils/constant';
import styles from '../../Navigation/style'
import Modal from 'react-native-modal';
import client from '../../Config/apollo'
import { GET_ALL_ADVISORS } from '../../utils/getQueries'


const dummyImage = 'https://res.cloudinary.com/dzkbtggax/image/upload/v1595802600/pfz3a6qvkaqtwsenvmh5.jpg'

const list = ['24-hour delivery', '1-hour delivery', 'Live video call', 'Live chat', 'Live voice call', 'Live chat', 'Currently offline', 'All advisors']

const Favorite = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false)
    const [state, setState] = useState({
        searchValue: '',
        allAdvisors: []
    })

    useEffect(() => {
        client.query({ query: GET_ALL_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForUser } = res.data
                if (getAllAdvisorForUser?.user?.length) {
                    updateField({ allAdvisors: getAllAdvisorForUser.user })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                // setLoading(false)
            })
    }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    };

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Header {...props} title="Favorites" />
            <ScrollView style={loginStyles.setFlex}>
                <View style={homeStyles.viewStyle}>
                    {state.allAdvisors.map((v, i) => {
                        return (
                            <View style={homeStyles.childStyle} key={i}>
                                <Image
                                    style={homeStyles.tile}
                                    source={{ uri: v.image }}
                                />
                                <Text style={homeStyles.name}>{v.userName}</Text>
                                <Text style={homeStyles.ctgry}>Love & Career</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Rating
                                        imageSize={20}
                                        style={homeStyles.rating}
                                        startingValue={5}
                                    />
                                    <Text style={{ ...homeStyles.rating, marginLeft: 15 }}>5</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <Modal
                isVisible={isModalVisible}
                backdropOpacity={0.5}
                backdropTransitionInTiming={100}
                backdropTransitionOutTiming={100}
                onBackdropPress={toggleModal}
            >
                <View style={AdvisorStyles.advisorModal}>
                    <View style={AdvisorStyles.modalView}>
                        <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10, fontSize: 24, color: 'rgba(0, 0, 0, 0.5)', marginLeft: 10 }}>Select a filter</Text>
                        <TouchableOpacity
                            style={styles.closeIconContainer}
                            onPress={toggleModal}
                        >
                            <Icon
                                name="close"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    {
                        list.map((v, i) => (
                            <ListItem
                                key={i}
                                title={
                                    <View style={{ width: '100%' }}>
                                        <TouchableOpacity onPress={() => console.log('Hello')}>
                                            <Text style={{ textAlign: 'center', fontSize: 20 }}>{v}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                topDivider
                            />
                        ))
                    }
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Favorite;
