import React, { useState } from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelListContainer } from './components';
import { ChannelContainer } from './components';
import {Auth} from './components'
import 'stream-chat-react/dist/css/index.css'
import './App.css'

const apiKey = 'hyjkk8y5kfjk';
const cookies = new Cookies()
const authToken = cookies.get('token');
const api_secret ='mtvarszf6anqhae2q7n5vx4g8qvamucvqbexpk9henkcrxvxtenhn3qqetu7tgsg'
const client = StreamChat.getInstance(apiKey)
const jwt = require('jsonwebtoken');

const extractUserIdFromToken = (token, secret) => {
    try {
        const decodedToken = jwt.verify(token, secret);
        return decodedToken.user_id;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

const verifyUserIdFromToken = (token, userId) => {
  // Assuming you have a utility function to extract user ID from token
  const extractedUserId = extractUserIdFromToken(token, api_secret); // Pass the secret used to sign the token
  return extractedUserId === userId;
};
if(authToken){
  client.connectUser({
    id: cookies.get('userId'), // Ensure the ID is correctly fetched
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
   
  },authToken)
}
export const App = () => {
  const [createType,setCreateType]= useState('')
  const [isCreating,setIsCreating]= useState(false)
  const [isEditing,setIsEditing]= useState(false)
  if(!authToken){
    return <Auth/>
  }
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team dark'>
        <ChannelListContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setCreateType={setCreateType}/>
        <ChannelContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        createType={createType}/>
    </Chat>  
    </div>
  )
}

