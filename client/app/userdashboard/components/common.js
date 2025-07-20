import { baseurl } from "@/app/config";
import axios from "axios";

export const myDetailsApi =  async (token)=>{
    try {
      const { data } = await axios.get(`${baseurl}/auth/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data
    } catch (error) {
      console.log(error);
    }
  }


export const profileApi =async (token,id) => {
  try {
    const { data } = await axios.get(`${baseurl}/auth/user/find-user-profile-by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  } catch (error) {
    console.log(error);
  }
}
// export const notificationApi = async (token) => {
//     try {
//       const { data } = await axios.get(`${baseurl}/notification/find`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//         localStorage.setItem('notifications', JSON.stringify(data))
//     } catch (error) {}
//   };

 export const isWebGLAvailable = function () {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

export const commonLogout = async (dispatch, err) => {
  if (err?.response?.data?.error === "Unauthorized") {
    await dispatch({ type: "logout" });
    localStorage.removeItem("myDetails");
    window.location.href = "/login";
  }
};

export const maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  if (!name || !domain) return email;

  const maskedName = name[0] +name[1] + '*'.repeat(name.length - 1) + name[name.length-2] + name[name.length-1];
  return `${maskedName}@${domain}`;
}; 


export const trimSilence = async (blob, threshold = 0.01, padding = 0.1) => {
  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const raw = audioBuffer.getChannelData(0); // Mono for simplicity
  const sampleRate = audioBuffer.sampleRate;
  const trimThreshold = threshold;

  let start = 0;
  let end = raw.length;

  // Find start
  for (let i = 0; i < raw.length; i++) {
    if (Math.abs(raw[i]) > trimThreshold) {
      start = i;
      break;
    }
  }

  // Find end
  for (let i = raw.length - 1; i >= 0; i--) {
    if (Math.abs(raw[i]) > trimThreshold) {
      end = i;
      break;
    }
  }

  // Add some padding
  start = Math.max(0, start - sampleRate * padding);
  end = Math.min(raw.length, end + sampleRate * padding);

  const trimmedLength = end - start;
  const trimmedBuffer = audioContext.createBuffer(1, trimmedLength, sampleRate);
  trimmedBuffer.copyToChannel(raw.slice(start, end), 0);

  // Encode trimmed buffer to WAV Blob
  const wavBlob = await audioBufferToWavBlob(trimmedBuffer);
  return wavBlob;
};

const audioBufferToWavBlob = async (buffer) => {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const bufferArray = new ArrayBuffer(length);
  const view = new DataView(bufferArray);
  const channels = [];

  let offset = 0;

  const writeString = (s) => {
    for (let i = 0; i < s.length; i++) {
      view.setUint8(offset++, s.charCodeAt(i));
    }
  };

  writeString("RIFF");
  view.setUint32(offset, length - 8, true); offset += 4;
  writeString("WAVE");
  writeString("fmt ");
  view.setUint32(offset, 16, true); offset += 4;
  view.setUint16(offset, 1, true); offset += 2;
  view.setUint16(offset, numOfChan, true); offset += 2;
  view.setUint32(offset, buffer.sampleRate, true); offset += 4;
  view.setUint32(offset, buffer.sampleRate * 2 * numOfChan, true); offset += 4;
  view.setUint16(offset, numOfChan * 2, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2;
  writeString("data");
  view.setUint32(offset, length - offset - 4, true); offset += 4;

  for (let i = 0; i < numOfChan; i++) {
    channels.push(buffer.getChannelData(i));
  }

  for (let i = 0; i < buffer.length; i++) {
    for (let j = 0; j < numOfChan; j++) {
      let sample = Math.max(-1, Math.min(1, channels[j][i]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, sample, true);
      offset += 2;
    }
  }

  return new Blob([bufferArray], { type: "audio/wav" });
};

