import React from 'react'
import { Channel,useChatContext} from 'stream-chat-react'
import {ChannelInner,CreateChannel,EditChannel} from './'
import { MessageSimple } from 'stream-chat-react'
import {EmptyStateIndicator } from 'stream-chat-react'
export const ChannelContainer = (
  {isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
    createType
  }
) => {
  const {channel} = useChatContext();
  if(isCreating) {
    return (
      <div className='Channel__container'>
        <CreateChannel createType={createType}
        setIsCreating={setIsCreating}/> </div>
    )
  }
  if(isEditing) {
    return (
      <div className='Channel__container'>
        <EditChannel 
        setIsEditing={setIsEditing}/>
      </div>
    )
  }

  const EmptyState = ()=> (
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>This is the beginning of your channel history</p>
      <p className='channel-empty__second'>Send messages, attachments, links, emojis, and more!</p>
    </div>
  )
  return (
    <div className='channel__container'>
      <Channel
      EmptyStateIndicator={EmptyState}
      Message={(messageProps,i)=> <MessageSimple key={i} {...messageProps}/>}>
        <ChannelInner
        setIsEditing={setIsEditing}/>
      </Channel>
      
    </div>
  )
}

