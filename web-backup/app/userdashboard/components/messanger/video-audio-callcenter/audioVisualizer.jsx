export const visualEffect =(canvas,stream)=> {
    const ctx = canvas?.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let analyser;
    let dataArray;
    let bufferLength;
    console.log(canvas)
    console.log(stream)
    startRecording()
    async function startRecording() {
      try {
        // Get microphone access
        // Create an AudioContext
        let audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create an analyser node
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512; // Set the FFT size for frequency data
    
        // Create a source from the media stream
        const source = audioContext.createMediaStreamSource(stream);
        
        // Connect the source to the analyser
        source.connect(analyser);
        
        // Get the frequency data from the analyser
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        const randV = ['V1','V2','V3'];
        const randD = Math.floor(Math.random() * randV.length);
        const randS = randV[randD];
        randS === 'V1' ? drawVisualizer1() : randS === 'V2'? drawVisualizer2() : randS === 'V3'? drawVisualizer3() : null
      } catch (err) {
        console.error('Error accessing microphone: ', err);
      }
    }
    function drawVisualizer1() {
      const barWidth = canvas.width / bufferLength;
      let barHeight;
      let x;
      function animate() {
        x = 0;
       ctx.clearRect(0,0,canvas.width,canvas.height)
       analyser.getByteTimeDomainData(dataArray);
       for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * (i/50);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(i + Math.PI * 2 / bufferLength * i)
         const hue = i * 2;
        ctx.fillStyle = `hsl(218,1%,8%)`;
        ctx.fillRect(0,0,barWidth,barHeight/2)
        x *= barHeight
        ctx.restore()
       }
       requestAnimationFrame(animate);
      }
      animate()
    }
    function drawVisualizer2() {
      const barWidth = canvas.width / bufferLength;
      let barHeight;
      let x;
      function animate() {
        x = 0;
       ctx.clearRect(0,0,canvas.width,canvas.height)
       analyser.getByteTimeDomainData(dataArray);
       for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.4;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(i + bufferLength)
         const hue = 250 + i * 2;
        ctx.fillStyle = `hsl(218,1%,8%)`;
        ctx.beginPath();
        ctx.arc(0, barHeight/180 * i, barHeight/50,0,Math.PI * 2)
        ctx.fill()
        x += barHeight
        ctx.restore()
       }
       requestAnimationFrame(animate);
      }
      animate()
    }
    function drawVisualizer3() {
      const barWidth = canvas.width / bufferLength;
      let barHeight;
      let x;
      function animate() {
        x = 0;
       ctx.clearRect(0,0,canvas.width,canvas.height)
       analyser.getByteTimeDomainData(dataArray);
       for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.4;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(i + bufferLength)
         const hue = i * 2;
        ctx.fillStyle = `hsl(218,1%,8%)`;
        ctx.beginPath();
        ctx.arc(0, barHeight, barHeight/30,0,Math.PI * 2)
        ctx.fill()
        ctx.beginPath();
        ctx.arc(0, barHeight/1.2, barHeight/40,0,Math.PI * 2)
        ctx.fill()
        ctx.beginPath();
        ctx.arc(0, barHeight/1.5, barHeight/50,0,Math.PI * 2)
        ctx.fill()
        x += barHeight
        ctx.restore()
       }
       requestAnimationFrame(animate);
      }
      animate()
    }
    
}