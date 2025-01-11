'use client'
import React from 'react'
// let peerConnections = {}
// const initiateWebRTCConnection = (callerId, calleeId) => {
//     const peerConnection = new RTCPeerConnection();
//     peerConnections[calleeId] = peerConnection;

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('iceCandidate', { candidate: event.candidate, callerId, calleeId });
//       }
//     };

//     peerConnection.ontrack = (event) => {
//       remoteVideoRefs.current[calleeId].srcObject = event.streams[0];
//     };

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

//       peerConnection.createOffer().then((offer) => {
//         peerConnection.setLocalDescription(offer);
//         socket.emit('offer', { offer, callerId, calleeId });
//       });
//     });
//   };
//   initiateWebRTCConnection(213,655)
//   initiateWebRTCConnection(213,4755)
//   initiateWebRTCConnection(213,6557645)
//   console.log(peerConnections)
const Page = () => {
  return (
    <div>pagjhfygje</div>
  )
}

export default Page