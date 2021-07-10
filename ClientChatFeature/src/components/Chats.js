import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import {auth} from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import mslogo from "../assets/msteams-logo.png";
import axios from 'axios';
import {VideoCameraOutlined} from '@ant-design/icons';

export default function Chats() {
    const didMountRef = useRef(false)
    const [loading, setLoading] =useState(true)
    const {user} =useAuth()
    const history = useHistory()
    
    async function handleLogout() {
        await auth.signOut()
        history.push("/")
    }
    // async function handlevideocall() {
    //   //await auth.signOut()
      
    // }
    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
    }
    const openInNewTab = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

   useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: { 
          "project-id": '50364033-27a6-41ad-9d13-fa712fcca418',
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL)
        .then(avatar => {
          formdata.append('avatar', avatar, avatar.name)

          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key": '3e51ae9b-f211-4499-873e-37841aef1119'  }}
          )
          .then(() => setLoading(false))
          .catch(e => console.log('e', e.response))
        })
      })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
        <img class="logo-ms2" src={mslogo} alt=""/>
          Microsoft Teams
        </div>
        <div onClick={() => openInNewTab('https://engage-ms-teams-videocall.herokuapp.com/')} className='videocall-tab'>
        <VideoCameraOutlined />
          <span class="vc">VideoCall</span>
        </div>
        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID='50364033-27a6-41ad-9d13-fa712fcca418'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}