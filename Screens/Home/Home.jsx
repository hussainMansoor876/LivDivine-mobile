import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Rating, Image, SearchBar, Button, ListItem, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, removeUser } from '../../Redux/actions/authActions'
import { loginStyles, homeStyles, AdvisorStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { appColor, orderTypes } from '../../utils/constant'
import styles from '../../Navigation/style'
import Modal from 'react-native-modal'
import client from '../../Config/apollo'
import { GET_ALL_ADVISORS, APPLY_FILTER } from '../../utils/getQueries'
import { GET_USER } from '../../utils/authQueries'
import { getFilterData } from '../../utils/helpers'
import { AdvisorProfile } from '../../Screens'

const Home = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()
    const [isModalVisible, setModalVisible] = useState(false)
    const [state, setState] = useState({
        searchValue: '',
        allAdvisors: [],
        showAdvisor: false,
        selectedAdvisor: {},
        filterValue: ''
    })

    const getAll = () => {
        setState({ ...state, searchValue: '' })
        client.query({ variables: { userId: user.id }, query: GET_ALL_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForUser } = res.data
                if (getAllAdvisorForUser?.user?.length) {
                    updateField({ allAdvisors: getFilterData(getAllAdvisorForUser.user) })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
            })
    }

    useEffect(() => {
        client.query({ variables: { userId: user.id }, query: GET_USER })
            .then((res) => {
                const { data } = res
                if (data?.user) {
                    dispatch(loginUser(data.user))
                }
                else {
                    dispatch(removeUser())
                }
            })
            .catch((e) => {
                dispatch(removeUser())
            })
        getAll()
    }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const applyFilters = (obj) => {
        client.query({ variables: obj, query: APPLY_FILTER })
            .then((res) => {
                const { getAllAdvisor } = res.data
                console.log(getAllAdvisor)
                if (getAllAdvisor.success) {
                    updateField({ allAdvisors: getFilterData(getAllAdvisor.user) })
                }
                else {
                    Alert.alert('No user Found!')
                    updateField({ allAdvisors: [] })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
            })
    }

    const updateModal = (val) => {
        const { searchValue } = state
        if (!val) {
            updateField({ filterValue: '' })
            if (searchValue) {
                applyFilters({ userId: user.id, name: searchValue })
            }
            else {
                getAll()
            }
            setModalVisible(!isModalVisible)
        }
        else {
            updateField({ filterValue: val })
            applyFilters({ userId: user.id, orderType: val, name: searchValue })
            setModalVisible(!isModalVisible)
        }
    }

    const updateSearch = () => {
        const { searchValue, filterValue } = state
        if (searchValue) {
            if (filterValue) {
                applyFilters({ userId: user.id, orderType: filterValue, name: searchValue })
            }
            else {
                applyFilters({ userId: user.id, name: searchValue })
            }
        }
        else {
            getAll()
        }
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
                <Text style={{ color: '#fff', fontSize: 20, marginLeft: -10, alignSelf: 'center' }}>Home</Text>
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
                onClear={getAll}
                containerStyle={{ backgroundColor: appColor }}
                inputContainerStyle={{ backgroundColor: '#fff' }}
            />
            <ScrollView style={loginStyles.setFlex}>
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
                                {/* <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text> */}
                            </TouchableOpacity>
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
                    <ListItem
                        title={
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity onPress={() => updateModal(false)} >
                                    <Text style={{ textAlign: 'center', fontSize: 20 }}>Clear Filter</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        bottomDivider
                        topDivider
                    />
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Home
