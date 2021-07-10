import React from 'react';
import {GoogleOutlined} from '@ant-design/icons';
import "firebase/app";
import {auth} from "../firebase";
import firebase from 'firebase/app';
import mslogo from "../assets/msteams-logo.png";
import meetavatar from "../assets/avatar3.png";

export default function Login() {
    return (
      <div id='login-page'>
        <div class="container-fluid" id='login-card'>
        <div>
        <img class="logo-ms2" src={mslogo} alt=""/> <span id="ms">Microsoft Teams</span>
        </div>
        <div class="meet-avatar"><img class="meet-avatar-logo" src={meetavatar} alt=""/></div>
        <div class="chat-room">Login to Chat Room</div>
        <div
            className='login-button google'
            onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
          >
            <GoogleOutlined /> Sign In with Google
          </div>
        </div>
      </div>
    )
  }