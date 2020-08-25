import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
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
            updateList: true,
            spin: false,
        }
    }

    getData = () => {
        client.query({ variables: { adminId: '421c6267-7911-4686-91fe-fe424e8efe00', isApproved: false }, query: GET_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForAdmin } = res.data
                if (getAllAdvisorForAdmin?.user?.length) {
                    this.setState({
                        allAdvisors: getAllAdvisorForAdmin.user,
                        isLoading: false
                    })
                }
                else {
                    this.setState({
                        isLoading: false
                    })
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
                    this.setState({ allAdvisors: [], isLoading: true, spin: false }, () => {
                        this.getData()
                    })
                }
                else {
                    Alert.alert('Oops Something Went Wrong!')
                    setSpin(false)
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                setSpin(false)
            })
    }

    render() {
        const { allAdvisors, isLoading, spin } = this.state

        return (
            <SafeAreaView style={loginStyles.setFlex}>
                <Spinner
                    visible={spin}
                    textContent={'Loading...'}
                    textStyle={loginStyles.spinnerTextStyle}
                />
                {allAdvisors.length ? allAdvisors.map((item, i) => {
                    return (
                        <ListItem
                            key={i}
                            title={item.userName}
                            leftAvatar={{ source: { uri: item.image } }}
                            bottomDivider
                            chevron={
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 150 }}>
                                    <Button
                                        title="Approve"
                                        onPress={() => this.updateStatus(item.id, true)}
                                    />
                                    <Button
                                        title="Cancel"
                                        onPress={() => this.updateStatus(item.id, false)}
                                        buttonStyle={{ backgroundColor: '#d9534f' }}
                                    />
                                </View>
                            }
                        />
                    )
                }
                ) : null}
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