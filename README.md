# Engage-Microsoft-Teams

![Untitled presentation (3)](https://user-images.githubusercontent.com/64857584/125316253-9404cd00-e355-11eb-8722-2a897b2a878b.png)

## Microsoft Teams Clone

Implementation of Microsoft Teams clone web app in which participants are able to connect with each other to have a video conversation. The app includes features like in-call chat messages, screen sharing, toggling of video/audio stream, view and send messages, start the conversation before the meeting, continue the conversation after the meeting, Firebase Authentication using google account.

#### App Link- https://engage-ms-teams.herokuapp.com/

###### Important- The video call function may show security reasons and not open in some browsers as the camera/audio permissions are blocked. So, please try a different browser or click on the link below to directly join a videocall room.
https://engage-ms-teams-videocall.herokuapp.com/?room=testvc_1670216324

## Features and Functionalities
* One to many participants video calling (Ideal for 2 participants)
* Toggling of video stream (Hide & unhide video)
* Toggling of audio stream (mute & unmute)
* Screen sharing
* Meet-link sharing option
* In-call chat messages
* Pin participants' stream
* Adapt stage Chat feature
    - View & Send messages
    - Continue the conversation after the meeting
    - Start the conversation before the meeting
* Firebase Authentication using google account

## How to run the app

* Client side
    - ```cd ClientChatFeature ```
    - ```npm start``` 
* Server side
    - ```cd MicrosoftTeams```
    - ```nodemon app.js```

## Tech Stack used
* WebRTC 
* Node.js
* Socket.io
* Chat engine
* React.js
* Firebase (for authentication)
* Heroku (Hosting)

## Implementation of Agile Methodology

As the theme of this year’s engage program says “Intelligence is the ability to adapt to change” and so follows the agile methodology. So, I have implemented an agile methodology in building this app also. As agile methodology welcomes changes and new features that we can add to the existing product, I have implemented the chat feature using agile. Also, as i am taking the data of the users during login, the app can adopt to several other features that can make use of the data and the firebase authentication can also be extended to other platforms making it agile.

## Screenshots

### Login Page
![login page](https://user-images.githubusercontent.com/64857584/125251529-0a350f80-e315-11eb-8618-a301c183b47e.png)

### Chat's Feed
![chat's feed](https://user-images.githubusercontent.com/64857584/125251763-49fbf700-e315-11eb-9656-7ebcfe078d2f.png)

### VideoCall- Create Room 
![video room create](https://user-images.githubusercontent.com/64857584/125252009-8891b180-e315-11eb-97e0-1a4758f85868.png)

### Meet-link Share option
![vc](https://user-images.githubusercontent.com/64857584/125316838-1c836d80-e356-11eb-9bb2-65e4b1a807b4.png)

### Join a VideoCall
![video room create](https://user-images.githubusercontent.com/64857584/125252256-c55da880-e315-11eb-945a-8cf50f60f686.png)

### Video Conversation
![vc](https://user-images.githubusercontent.com/64857584/125252541-1d94aa80-e316-11eb-915c-e6c2ca76d990.png)

### In-call Chat messages
![vc](https://user-images.githubusercontent.com/64857584/125331587-cd453900-e365-11eb-97fb-055fbf2a5576.png)


### Screen-Sharing
![vc](https://user-images.githubusercontent.com/64857584/125253037-9ac01f80-e316-11eb-828f-bccf24c50ac9.png)


