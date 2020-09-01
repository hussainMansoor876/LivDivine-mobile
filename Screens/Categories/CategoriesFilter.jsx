import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Rating, Image, SearchBar, Button, ListItem, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { loginStyles, homeStyles, AdvisorStyles, categoriesStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { appColor, orderTypes } from '../../utils/constant';
import styles from '../../Navigation/style'
import Modal from 'react-native-modal';
import client from '../../Config/apollo'
import { GET_ALL_ADVISORS, APPLY_FILTER } from '../../utils/getQueries'
import { GET_USER } from '../../utils/authQueries'
import { AdvisorProfile } from '../../Screens'

const CategoriesFilter = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false)
    const [state, setState] = useState({
        searchValue: '',
        allAdvisors: [],
        showAdvisor: false,
        selectedAdvisor: {},
        filterValue: '',
        category: props.category
    })

    const applyFilters = (obj) => {
        client.query({ variables: obj, query: APPLY_FILTER })
            .then((res) => {
                const { getAllAdvisor } = res.data
                if (getAllAdvisor.success) {
                    updateField({ allAdvisors: getAllAdvisor.user })
                }
                else {
                    updateField({ allAdvisors: [] })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
            })
    }

    // useEffect(() => {
    //     const { category } = state
    //     applyFilters({ userId: user.id, category })
    // }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    };

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const updateModal = (val) => {
        const { searchValue, category } = state
        updateField({ filterValue: val })
        applyFilters({ userId: user.id, orderType: val, name: searchValue, category })
        setModalVisible(!isModalVisible)
    }

    const updateSearch = () => {
        const { searchValue, filterValue, category } = state
        applyFilters({ userId: user.id, orderType: filterValue, name: searchValue, category })
    }

    const updateClear = () => {
        const { filterValue, category } = state
        updateField({ searchValue: '' })
        applyFilters({ userId: user.id, orderType: filterValue, category })
    }

    const updateCategory = (val) => {
        const { searchValue, filterValue } = state
        updateField({ category: val })
        applyFilters({ userId: user.id, orderType: filterValue, name: searchValue, category: val })
    }

    if (state.showAdvisor) {
        return (
            <AdvisorProfile hideAdvisor={() => updateField({ showAdvisor: false })} advisor={state.selectedAdvisor} {...props} />
        )
    }
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <View style={AdvisorStyles.headerView}>
                <FeatherIcon
                    name='menu'
                    size={30}
                    color='#fff'
                    onPress={navigation.toggleDrawer}
                />
                <Text style={{ color: '#fff', fontSize: 20, marginLeft: -10, alignSelf: 'center' }}>Categories</Text>
                <FontAwesomeIcon
                    name="filter"
                    size={30}
                    color="#fff"
                    onPress={toggleModal}
                />
            </View>
            <SearchBar
                placeholder="Search Advisors"
                value={state.searchValue}
                onChangeText={(e) => setState({ ...state, searchValue: e })}
                // placeholderTextColor="#fff"
                lightTheme
                inputStyle={{ backgroundColor: '#fff' }}
                onSubmitEditing={updateSearch}
                round
                color="#000000"
                onClear={updateClear}
                containerStyle={{ backgroundColor: appColor }}
                inputContainerStyle={{ backgroundColor: '#fff' }}
            />
            {/* <ScrollView style={loginStyles.setFlex}>
                <View style={homeStyles.viewStyle}>
                    {state.allAdvisors.map((v, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={homeStyles.childStyle}
                                onPress={() => updateField({ showAdvisor: true, selectedAdvisor: v })}
                            >
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
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView> */}
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
                        orderTypes.map((v, i) => (
                            <ListItem
                                key={i}
                                title={
                                    <View style={{ width: '100%' }}>
                                        <TouchableOpacity onPress={() => updateModal(v.orderTypeName)} >
                                            <Text style={{ textAlign: 'center', fontSize: 20 }}>{v.orderTypeName}</Text>
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
    )
};

export default CategoriesFilter;
