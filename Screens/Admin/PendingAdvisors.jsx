import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { loginStyles, AdvisorStyles } from '../../styles'
import { Icon, Button, ListItem } from 'react-native-elements'
import { GET_ADVISORS } from '../../utils/getQueries'
import { UPDATE_STATUS } from '../../utils/updateMutations'
import Spinner from 'react-native-loading-spinner-overlay';
import client from '../../Config/apollo'

class PendingAdvisors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            allAdvisors: [],
            spin: false,
            updateList: true
        }
    }

    getData = () => {
        client.query({ variables: { adminId: '421c6267-7911-4686-91fe-fe424e8efe00', isApproved: false }, query: GET_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForAdmin } = res.data
                if (getAllAdvisorForAdmin?.user?.length) {
                    setAllAdvisors(getAllAdvisorForAdmin.user)
                    this.setState({ allAdvisors: getAllAdvisorForAdmin.user, isLoading: false })
                }
                else {
                    Alert.alert('Oops Something Went Wrong!')
                    this.setState({ isLoading: false })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                this.setState({ isLoading: false })
            })
    }

    componentDidMount() {
        const { user } = this.props
        // if (!user) {
        //     this.props.history.replace('/login')
        // }
        this.getData()
    }

    updateStatus = (userId, status) => {
        this.setState({ spin: true })
        client.mutate({ variables: { userId, adminId: '421c6267-7911-4686-91fe-fe424e8efe00', status }, mutation: UPDATE_STATUS })
            .then((res) => {
                const { approvedAdvisor } = res.data
                if (approvedAdvisor.success) {
                    this.setState({
                        allAdvisors: [],
                        isLoading: true,
                        spin: false
                    }, () => {
                        getData()
                    })
                }
                else {
                    Alert.alert('Oops Something Went Wrong!')
                    this.setState({ spin: false })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                this.setState({ spin: false })
            })
    }

    render() {
        const { spin, allAdvisors, isLoading } = this.state

        return (
            <SafeAreaView style={loginStyles.setFlex}>
                <Spinner
                    visible={spin}
                    textContent={'Loading...'}
                    textStyle={loginStyles.spinnerTextStyle}
                />
                {allAdvisors.map((v, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff', borderBottomColor: 'rgba(0, 0, 0, 0.5)', borderBottomWidth: 0.5, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: v.image }}
                                    style={{ width: 50, height: 50, marginRight: 10, marginLeft: 10, borderRadius: 250 }}
                                />
                                <Text style={{ fontSize: 16, marginTop: 12 }}>{v.userName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 150, marginRight: 10 }}>
                                <Button
                                    title="Approve"
                                    onPress={() => this.updateStatus(v.id, true)}
                                />
                                <Button
                                    title="Cancel"
                                    onPress={() => this.updateStatus(v.id, false)}
                                    buttonStyle={{ backgroundColor: '#d9534f' }}
                                />
                            </View>
                        </View>
                    )
                })}
                {
                    isLoading && !allAdvisors.length ? <ActivityIndicator
                        color="rgba(0, 0, 0, 0.5)"
                        size="small"
                        style={AdvisorStyles.activityStyle}
                    /> : !isLoading && !allAdvisors.length ? <View style={AdvisorStyles.container}>
                        <Text>No Advisor found!</Text>
                    </View> : null
                }
            </SafeAreaView >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PendingAdvisors)