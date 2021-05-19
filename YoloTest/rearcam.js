function test(testmg) {
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get this party started")
    navigator.mediaDevices.getUserMedia(
        { 
            video: {  
                facingMode: { exact: "environment" }
            }  
        
    }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
  }
}