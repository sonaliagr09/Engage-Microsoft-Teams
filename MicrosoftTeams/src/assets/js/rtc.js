
import h from '../helpers.js';

function getQString( url = '', keyToReturn = '' ) {
    url = url ? url : location.href;
    let queryStrings = decodeURIComponent( url ).split( '#', 2 )[0].split( '?', 2 )[1];

    if ( queryStrings ) {
        let splittedQStrings = queryStrings.split( '&' );

        if ( splittedQStrings.length ) {
            let queryStringObj = {};

            splittedQStrings.forEach( function ( keyValuePair ) {
                let keyValue = keyValuePair.split( '=', 2 );

                if ( keyValue.length ) {
                    queryStringObj[keyValue[0]] = keyValue[1];
                }
            } );

            return keyToReturn ? ( queryStringObj[keyToReturn] ? queryStringObj[keyToReturn] : null ) : queryStringObj;
        }

        return null;
    }

    return null;
};
function userMediaAvailable() {
    return !!( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
};

function getUserAudio() {
    if ( userMediaAvailable() ) {
        return navigator.mediaDevices.getUserMedia( {
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        } );
    }

    else {
        throw new Error( 'User media not available' );
    }
};
function getUserFullMedia() {
    if ( userMediaAvailable() ) {
        return navigator.mediaDevices.getUserMedia( {
            video: true,
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        } );
    }

    else {
        throw new Error( 'User media not available' );
    }
};
function setLocalStream( stream, mirrorMode = true ) {
    const localVidElem = document.getElementById( 'local' );

    localVidElem.srcObject = stream;
    mirrorMode ? localVidElem.classList.add( 'mirror-mode' ) : localVidElem.classList.remove( 'mirror-mode' );
};

window.addEventListener( 'load', () => {
    const room = getQString( location.href, 'room' );
    const username = sessionStorage.getItem( 'username' );
    

    if ( !room ) {
        document.querySelector( '#room-create' ).attributes.removeNamedItem( 'hidden' );
    }

    else if ( !username ) {
        document.querySelector( '#username-set' ).attributes.removeNamedItem( 'hidden' );
    }

    else {
        let commElem = document.getElementsByClassName( 'room-comm' );

        for ( let i = 0; i < commElem.length; i++ ) {
            commElem[i].attributes.removeNamedItem( 'hidden' );
        }

        var pc = [],names={};

        let socket = io( '/stream' );

        var socketId = '';
        var myStream = '';
        var screen = '';
       

        //Get user video by default
        getAndSetUserStream();


        socket.on( 'connect', () => {
            //set socketId
            socketId = socket.io.engine.id;
            
            socket.emit( 'subscribe', {
                room: room,
                socketId: socketId
            } );


            socket.on( 'new user', ( data ) => {
                
                socket.emit( 'newUserStart', { to: data.socketId, sender: socketId } );
                pc.push( data.socketId );
                init( true, data.socketId );
            } );


            socket.on( 'newUserStart', ( data ) => {
                pc.push( data.sender );
                init( false, data.sender );
            } );


            socket.on( 'ice candidates', async ( data ) => {
                data.candidate ? await pc[data.sender].addIceCandidate( new RTCIceCandidate( data.candidate ) ) : '';
            } );


            socket.on( 'sdp', async ( data ) => {
                if ( data.description.type === 'offer' ) {
                    data.description ? await pc[data.sender].setRemoteDescription( new RTCSessionDescription( data.description ) ) : '';

                    getUserFullMedia().then( async ( stream ) => {
                        if ( !document.getElementById( 'local' ).srcObject ) {
                            setLocalStream( stream );
                        }

                        //save my stream
                        myStream = stream;
                        

                        stream.getTracks().forEach( ( track ) => {
                            pc[data.sender].addTrack( track, stream );
                        } );

                        let answer = await pc[data.sender].createAnswer();

                        await pc[data.sender].setLocalDescription( answer );

                        socket.emit( 'sdp', { description: pc[data.sender].localDescription, to: data.sender, sender: socketId } );
                    } ).catch( ( e ) => {
                        console.error( e );
                    } );
                }

                else if ( data.description.type === 'answer' ) {
                    await pc[data.sender].setRemoteDescription( new RTCSessionDescription( data.description ) );
                }
            } );


            socket.on( 'chat', ( data ) => {
                //console.log(data);
                addChat( data, 'remote' );
            } );

        } );


        function getAndSetUserStream() {
            getUserFullMedia().then( ( stream ) => {
                //save my stream
                myStream = stream;

                setLocalStream( stream );
            } ).catch( ( e ) => {
                console.error( `stream error: ${ e }` );
            } );
        }

        function sendMsg( msg ) {
            let data = {
                room: room,
                msg: msg,
                sender: username
            };

            //emit chat message
            socket.emit( 'chat', data );

            //add localchat
            addChat( data, 'local' );
        }

        function adjustVideoElemSize() {
            let elem = document.getElementsByClassName( 'card' );
            let totalRemoteVideosDesktop = elem.length;
            let newWidth = totalRemoteVideosDesktop <= 2 ? '50%' : (
                totalRemoteVideosDesktop == 3 ? '33.33%' : (
                    totalRemoteVideosDesktop <= 8 ? '25%' : (
                        totalRemoteVideosDesktop <= 15 ? '20%' : (
                            totalRemoteVideosDesktop <= 18 ? '16%' : (
                                totalRemoteVideosDesktop <= 23 ? '15%' : (
                                    totalRemoteVideosDesktop <= 32 ? '12%' : '10%'
                                )
                            )
                        )
                    )
                )
            );
    
    
            for ( let i = 0; i < totalRemoteVideosDesktop; i++ ) {
                elem[i].style.width = newWidth;
            }
        };
    
        function closeVideo( elemId ) {
            if ( document.getElementById( elemId ) ) {
                document.getElementById( elemId ).remove();
                adjustVideoElemSize();
            }
        };
        
        function pageHasFocus() {
            return !( document.hidden || document.onfocusout || window.onpagehide || window.onblur );
        };
        
        function addChat( data, senderType ) {
            let chatMsgDiv = document.querySelector( '#chat-messages' );
            let contentAlign = 'justify-content-end';
            let senderName = 'You';
            let msgBg = 'msgColor';
    
            if ( senderType === 'remote' ) {
                contentAlign = 'justify-content-start';
                senderName = data.sender;
                msgBg = '';
    
                toggleChatNotificationBadge();
            }
    
            let infoDiv = document.createElement( 'div' );
            infoDiv.className = 'sender-info';
            infoDiv.innerHTML = `${ senderName } - ${ moment().format( 'Do MMMM, YYYY h:mm a' ) }`;
    
            let colDiv = document.createElement( 'div' );
            colDiv.className = `col-10 chatbox chat-card msg ${ msgBg }`;
            colDiv.innerHTML = xssFilters.inHTMLData( data.msg );
    
            let rowDiv = document.createElement( 'div' );
            rowDiv.className = `row ${ contentAlign } mb-2`;
    
    
            colDiv.appendChild( infoDiv );
            rowDiv.appendChild( colDiv );
    
            chatMsgDiv.appendChild( rowDiv );
    
            /**
             * Move focus to the newly added message but only if:
             * 1. Page has focus
             * 2. User has not moved scrollbar upward. This is to prevent moving the scroll position if user is reading previous messages.
             */
            if ( pageHasFocus ) {
                rowDiv.scrollIntoView();
            }
        };

  
 
        function toggleChatNotificationBadge() {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                document.querySelector( '#new-chat-notification' ).setAttribute( 'hidden', true );
            }
    
            else {
                document.querySelector( '#new-chat-notification' ).removeAttribute( 'hidden' );
            }
        };
        function getIceServer() {
            return {
                iceServers: [
                    {
                        urls: ["stun:bn-turn1.xirsys.com"]
                    },
                    {
                        username: "kXGZxE7sBoIU0h9Dnd_m7w6dkDiuOG2j8HKkVFKIETO50mIWD8kmP515b7pJhNF4AAAAAGDsTLZzb25hbGlhZ3I=",
                        credential: "8aacc93c-e31a-11eb-bbdf-0242ac140004",
                        urls: [
                            "turn:bn-turn1.xirsys.com:80?transport=udp",
                            "turn:bn-turn1.xirsys.com:3478?transport=udp",
                            "turn:bn-turn1.xirsys.com:80?transport=tcp",
                        ]
                    }
                ]
            };
        };
        function init( createOffer, partnerName ) {
            pc[partnerName] = new RTCPeerConnection( getIceServer() );

            if ( screen && screen.getTracks().length ) {
                screen.getTracks().forEach( ( track ) => {
                    pc[partnerName].addTrack( track, screen );//should trigger negotiationneeded event
                } );
            }

            else if ( myStream ) {
                myStream.getTracks().forEach( ( track ) => {
                    pc[partnerName].addTrack( track, myStream );//should trigger negotiationneeded event
                } );
            }

            else {
                getUserFullMedia().then( ( stream ) => {
                    //save my stream
                    myStream = stream;

                    stream.getTracks().forEach( ( track ) => {
                        pc[partnerName].addTrack( track, stream );//should trigger negotiationneeded event
                    } );

                    setLocalStream( stream );
                } ).catch( ( e ) => {
                    console.error( `stream error: ${ e }` );
                } );
            }



            //create offer
            if ( createOffer ) {
                pc[partnerName].onnegotiationneeded = async () => {
                    let offer = await pc[partnerName].createOffer();

                    await pc[partnerName].setLocalDescription( offer );

                    socket.emit( 'sdp', { description: pc[partnerName].localDescription, to: partnerName, sender: socketId } );
                };
            }



            //send ice candidate to partnerNames
            pc[partnerName].onicecandidate = ( { candidate } ) => {
                socket.emit( 'ice candidates', { candidate: candidate, to: partnerName, sender: socketId } );
            };



            //add
            pc[partnerName].ontrack = ( e ) => {
                let str = e.streams[0];
                if ( document.getElementById( `${ partnerName }-video` ) ) {
                    document.getElementById( `${ partnerName }-video` ).srcObject = str;
                }

                else {
                    //video elem
                    let newVid = document.createElement( 'video' );
                    newVid.id = `${ partnerName }-video`;
                    newVid.srcObject = str;
                    newVid.autoplay = true;
                    newVid.className = 'remote-video';
                    
                    //video controls elements
                    let controlDiv = document.createElement( 'div' );
                    controlDiv.className = 'remote-video-controls';
                    //console.log(names,"hey",socketId);
                    // <span class="nameDisplay"> ${username+" "}</span>
                    controlDiv.innerHTML =`<i class="fa fa-expand text-white expand-remote-video" aria-hidden="true" title="Expand"></i>`;
                    
                    let emojiDiv =document.createElement('div');
                    emojiDiv.className='emoji';
                    //emojiDiv.innerHTML=`${emoji}`;
                    emojiDiv.innerHTML=`<img class="avatar-image" src="./assets/avatar3.png">`;

                    //create a new div for card
                    let cardDiv = document.createElement( 'div' );
                    cardDiv.className = 'card card-sm';
                    cardDiv.id = partnerName;
                    cardDiv.appendChild( newVid );
                    cardDiv.appendChild( controlDiv );
                    cardDiv.appendChild( emojiDiv );
                    //put div in main-section elem
                    document.getElementById( 'videos' ).appendChild( cardDiv );

                    h.adjustVideoElemSize();
                }
            };



            pc[partnerName].onconnectionstatechange = ( d ) => {
                switch ( pc[partnerName].iceConnectionState ) {
                    case 'disconnected':
                    case 'failed':
                        closeVideo( partnerName );
                        break;

                    case 'closed':
                        closeVideo( partnerName );
                        break;
                }
            };



            pc[partnerName].onsignalingstatechange = ( d ) => {
                switch ( pc[partnerName].signalingState ) {
                    case 'closed':
                        console.log( "Signalling state is 'closed'" );
                        closeVideo( partnerName );
                        break;
                }
            };
        }

        function sharingScreen() {
            if ( userMediaAvailable() ) {
                return navigator.mediaDevices.getDisplayMedia( {
                    video: {
                        cursor: "always"
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                } );
            }
    
            else {
                throw new Error( 'User media not available' );
            }
        };
    
        function toggleShareIcons( share ) {
            let shareIconElem = document.querySelector( '#share-screen' );
    
            if ( share ) {
                shareIconElem.setAttribute( 'title', 'Stop sharing screen' );
                shareIconElem.children[0].classList.add( 'text-primary' );
                shareIconElem.children[0].classList.remove( 'text-white' );
            }
    
            else {
                shareIconElem.setAttribute( 'title', 'Share screen' );
                shareIconElem.children[0].classList.add( 'text-white' );
                shareIconElem.children[0].classList.remove( 'text-primary' );
            }
        };
    
    
        function toggleVideoBtnDisabled( disabled ) {
            document.getElementById( 'toggle-video' ).disabled = disabled;
        };
    
        function shareScreen() {
            sharingScreen().then( ( stream ) => {
                toggleShareIcons( true );

                //disable the video toggle btns while sharing screen. This is to ensure clicking on the btn does not interfere with the screen sharing
                //It will be enabled was user stopped sharing screen
                toggleVideoBtnDisabled( true );

                //save my screen stream
                screen = stream;

                //share the new stream with all partners
                broadcastNewTracks( stream, 'video', false );

                //When the stop sharing button shown by the browser is clicked
                screen.getVideoTracks()[0].addEventListener( 'ended', () => {
                    stopSharingScreen();
                } );
            } ).catch( ( e ) => {
                console.error( e );
            } );
        }



        function stopSharingScreen() {
            //enable video toggle btn
            toggleVideoBtnDisabled( false );

            return new Promise( ( res, rej ) => {
                screen.getTracks().length ? screen.getTracks().forEach( track => track.stop() ) : '';

                res();
            } ).then( () => {
                toggleShareIcons( false );
                broadcastNewTracks( myStream, 'video' );
            } ).catch( ( e ) => {
                console.error( e );
            } );
        }

        function replaceTrack( stream, recipientPeer ) {
            let sender = recipientPeer.getSenders ? recipientPeer.getSenders().find( s => s.track && s.track.kind === stream.kind ) : false;
    
            sender ? sender.replaceTrack( stream ) : '';
        };
    

        function broadcastNewTracks( stream, type, mirrorMode = true ) {
            setLocalStream( stream, mirrorMode );

            let track = type == 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];

            for ( let p in pc ) {
                let pName = pc[p];

                if ( typeof pc[pName] == 'object' ) {
                    replaceTrack( track, pc[pName] );
                }
            }
        }




        //Chat textarea
        document.getElementById( 'chat-input' ).addEventListener( 'keypress', ( e ) => {
            if ( e.which === 13 && ( e.target.value.trim() ) ) {
                e.preventDefault();

                sendMsg( e.target.value );

                setTimeout( () => {
                    e.target.value = '';
                }, 50 );
            }
        } );

        function getURL() {
            alert("The meeting link is: " + window.location.href + "  Share this link with others you want in the meeting");
        }

        //When the meeting-link icon is clicked
        document.getElementById( 'meeting-link' ).addEventListener( 'click', ( e ) => {
            e.preventDefault();
            getURL();
        } );
    


        //When the video icon is clicked
        document.getElementById( 'toggle-video' ).addEventListener( 'click', ( e ) => {
            e.preventDefault();

            let elem = document.getElementById( 'toggle-video' );
           
            
            if ( myStream.getVideoTracks()[0].enabled ) {
                e.target.classList.remove( 'fa-video' );
                e.target.classList.add( 'fa-video-slash' );
                elem.setAttribute( 'title', 'Show Video' );

                myStream.getVideoTracks()[0].enabled = false;
               
            }

            else {
                e.target.classList.remove( 'fa-video-slash' );
                e.target.classList.add( 'fa-video' );
                elem.setAttribute( 'title', 'Hide Video' );

                myStream.getVideoTracks()[0].enabled = true;
            }

            broadcastNewTracks( myStream, 'video' );
        } );


        //When the mute icon is clicked
        document.getElementById( 'toggle-mute' ).addEventListener( 'click', ( e ) => {
            e.preventDefault();

            let elem = document.getElementById( 'toggle-mute' );

            if ( myStream.getAudioTracks()[0].enabled ) {
                e.target.classList.remove( 'fa-microphone-alt' );
                e.target.classList.add( 'fa-microphone-alt-slash' );
                elem.setAttribute( 'title', 'Unmute' );

                myStream.getAudioTracks()[0].enabled = false;
            }

            else {
                e.target.classList.remove( 'fa-microphone-alt-slash' );
                e.target.classList.add( 'fa-microphone-alt' );
                elem.setAttribute( 'title', 'Mute' );

                myStream.getAudioTracks()[0].enabled = true;
            }

            broadcastNewTracks( myStream, 'audio' );
        } );

        //When user clicks the 'Share screen' button
        document.getElementById( 'share-screen' ).addEventListener( 'click', ( e ) => {
            e.preventDefault();

            if ( screen && screen.getVideoTracks().length && screen.getVideoTracks()[0].readyState != 'ended' ) {
                stopSharingScreen();
            }

            else {
                shareScreen();
            }
        } );

       

    }
} );
