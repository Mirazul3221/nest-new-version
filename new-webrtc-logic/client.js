// pages/index.js
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to the signaling server

let peerConnections = {}; // Store peer connections for all other users

export default function Home() {
  const [stream, setStream] = useState(null);
  const [clients, setClients] = useState([]);
  const videoRefs = useRef([]);

  // Get user media (video & audio)
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(userStream);
        // Broadcast user stream to other clients
        socket.emit('new-user');
      } catch (error) {
        console.error('Error accessing media devices', error);
      }
    };

    getUserMedia();
  }, []);

  // When a new user connects, handle it
  useEffect(() => {
    socket.on('new-user', (userId) => {
      // Create a peer connection for the new user
      createPeerConnection(userId);
      // After creating peer connection, send an offer to the new user
      createAndSendOffer(userId);
    });

    socket.on('offer', (offer, from) => {
      handleOffer(offer, from);
    });

    socket.on('answer', (answer, from) => {
      handleAnswer(answer, from);
    });

    socket.on('ice-candidate', (candidate, from) => {
      handleIceCandidate(candidate, from);
    });

    return () => {
      socket.off('new-user');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
    };
  }, []);

  // Handle incoming offer
  const handleOffer = async (offer, from) => {
    const peerConnection = createPeerConnection(from);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit('answer', answer, from);
  };

  // Handle incoming answer
  const handleAnswer = (answer, from) => {
    const peerConnection = peerConnections[from];
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  // Handle ICE candidates
  const handleIceCandidate = (candidate, from) => {
    const peerConnection = peerConnections[from];
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  // Create a peer connection for another user
  const createPeerConnection = (userId) => {
    const peerConnection = new RTCPeerConnection();

    // Add local stream to peer connection
    if (stream) {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
    }

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate, userId);
      }
    };

    // When remote stream is added, show it on the screen
    peerConnection.ontrack = (event) => {
      const remoteVideoElement = document.createElement('video');
      remoteVideoElement.srcObject = event.streams[0];
      remoteVideoElement.autoplay = true;
      remoteVideoElement.controls = true;
      videoRefs.current.push(remoteVideoElement);
      setClients((prevClients) => [...prevClients, userId]);
    };

    peerConnections[userId] = peerConnection;

    return peerConnection;
  };

  // Create and send an offer to another user
  const createAndSendOffer = async (userId) => {
    const peerConnection = peerConnections[userId];
    
    // Create an offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    // Send offer to the other user
    socket.emit('offer', offer, userId);
  };

  // Handle user joining the call
  const handleStartCall = () => {
    socket.emit('new-user');
  };

  return (
    <div>
      <h1>Video Call</h1>
      <div>
        <video
          ref={(ref) => {
            if (ref && stream) {
              ref.srcObject = stream;
            }
          }}
          autoPlay
          muted
          controls
        />
      </div>
      <div>
        {videoRefs.current.map((video, idx) => (
          <div key={idx}>
            <h3>User {clients[idx]}</h3>
            <video ref={(ref) => (videoRefs.current[idx] = ref)} autoPlay />
          </div>
        ))}
      </div>
    </div>
  );
}
