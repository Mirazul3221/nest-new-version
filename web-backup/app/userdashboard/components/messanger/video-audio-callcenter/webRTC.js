// Single Method for peer connection
export const PeerConnection = (function(bbb){
   let peerConnection;
// console.log(bbb)
   const createPeerConnection = (myStream) => {
       const config = {
           iceServers: [
               {
                   urls: 'stun:stun.l.google.com:19302'
               }
           ]
       };
       peerConnection = new RTCPeerConnection();
   
       // add local stream to peer connection
       localStream.getTracks().forEach(track => {
           peerConnection.addTrack(track, localStream);
       })
       // listen to remote stream and add to peer connection
       peerConnection.ontrack = function(event) {
           remoteVideo.srcObject = event.streams[0];
       }
       // listen for ice candidate
       peerConnection.onicecandidate = function(event) {
           if(event.candidate) {
               socket.emit("icecandidate", event.candidate);
           }
       }
       return peerConnection;
   }

   return (myStream) => {
      if(!peerConnection){
          peerConnection = createPeerConnection(myStream);
      }
      return null;
  }
})();