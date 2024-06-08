import React from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelListContainer } from './components';
import { ChannelContainer } from './components';
import './App.css'
const apiKey = 'hyjkk8y5kfjk';

const client = StreamChat.getInstance(apiKey)
export const App = () => {
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer/>
        <ChannelContainer/>
    </Chat>  
    </div>
  )
}

