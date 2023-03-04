import {EaseChat} from 'agora-chat-uikit'
import agoraCradential from './utils/agoraCradential'

const WebIM = EaseChat.getSdk({appkey:agoraCradential.AppKey})

export default WebIM