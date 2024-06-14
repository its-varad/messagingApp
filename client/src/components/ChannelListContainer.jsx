import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { ChannelHeader, ChannelList,useChatContext } from 'stream-chat-react'

import {ChannelSearch, TeamChannelList,TeamChannelPreview} from './'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import { channel } from 'process'
const cookies = new Cookies()
const Sidebar =({logout}) => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
          <img src={HospitalIcon} alt='hospital' width="30"/>
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner' onClick={logout}>
          <img src={LogoutIcon} alt='logout' width="30"/>
      </div>
    </div>

  </div>
)

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>UsChat</p>
  </div>
)
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel)=> channel.type==='team')
}
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel)=> channel.type==='messaging')
}

export const ChannelListContent = ({isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer}) =>{
  const {client} = useChatContext();
  const logout = () => {
     cookies.remove('token')
     cookies.remove('userId')// Ensure the ID is correctly fetched
    cookies.remove('username')
     cookies.remove('fullName')
    cookies.remove('phoneNumber')
    cookies.remove('avatarURL')
    window.location.reload()
  }
  const filters = {members: {$in: [client.userID]}}
  return (
    <>
    <Sidebar logout={logout}/>
    <div className='channel-list__list__wrapper'>
      <CompanyHeader />
      <ChannelSearch setToggleContainer={setToggleContainer}/>
      <ChannelList
      filters={filters}
      channelRenderFilterFn={customChannelTeamFilter}
      List={(listProps)=>(
        <TeamChannelList {
        ...listProps}
        type="team"
        isCreating= {isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}/>
      )}
      Preview={(previewProps)=> (
        <TeamChannelPreview
        {...previewProps}
        setToggleContainer={setToggleContainer}
        type="team"
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}/>
      )
      }/>
      <ChannelList
      filters={filters}
      channelRenderFilterFn={customChannelMessagingFilter}
      List={(listProps)=>(
        <TeamChannelList {
        ...listProps}
        type="messaging"
        isCreating= {isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}/>
      )}
      Preview={(previewProps)=> (
        <TeamChannelPreview
        {...previewProps}
        type="messaging"
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}/>
      )
      }/>
    </div>
    
    </>
  )
}

export const ChannelListContainer = ({setCreateType,setIsCreating,setIsEditing}) => {
    const [toggleContainer,setToggleContainer]= useState(false)
    return (
      <>
      <div className='channel-list__container'>
        <ChannelListContent
        
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}/>
      </div>
      <div className='channel-list__container-responsive'
      style={{left:toggleContainer ? '0%' : "-89%",backgroundColor:"#005fff"}}>
          <div className='channel-list__container-toggle' onClick={() => setToggleContainer(prevToggleContainer => !prevToggleContainer)}>
          </div>
          <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}/>


          
      </div>
      </>
    )
}

