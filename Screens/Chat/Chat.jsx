import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../Redux/actions/authActions'
import { loginStyles } from '../styles'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

const Chat = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        dispatch(removeUser())
        var obj = {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any'
            }
        }
        setMessages([obj])
    }, [])

    const onSend = useCallback((messages = []) => {
        console.log('messages', messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (prop) => {
        return (
            <Bubble
                {...prop}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#FF1493'
                    },
                    left: {
                        backgroundColor: '#0099FF'
                    }
                }}
                textStyle={{
                    left: {
                        color: '#FFFFFF'
                    }
                }}
            />
        )
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    avatar: 'https://placeimg.com/140/140/any'
                }}
                showAvatarForEveryMessage
                showUserAvatar
                renderBubble={renderBubble}
            />
        </SafeAreaView>
    )
}

export default Chat
