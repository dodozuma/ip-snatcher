// Fetch Public IP Address using an external API
async function fetchPublicIP() {
    const publicIpDisplay = document.getElementById("public-ip");
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      if (!response.ok) throw new Error("Failed to fetch public IP");
      const data = await response.json();
      publicIpDisplay.textContent = data.ip;
    } catch (error) {
      publicIpDisplay.textContent = "N/A";
      console.error("Error fetching public IP:", error);
    }
  }
  
  // Fetch Local IP Address using WebRTC
  function fetchLocalIP() {
    const localIpDisplay = document.getElementById("local-ip");
    const errorMessage = document.getElementById("error-message");
  
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
  
    peerConnection.createDataChannel("");
  
    peerConnection.createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .catch((error) => {
        console.error("Error creating WebRTC offer:", error);
        errorMessage.textContent = "Unable to fetch local IP.";
      });
  
    peerConnection.onicecandidate = (event) => {
      if (event && event.candidate) {
        const candidate = event.candidate.candidate;
        const localIP = candidate.match(/(\d{1,3}\.){3}\d{1,3}/);
        if (localIP) {
          localIpDisplay.textContent = localIP[0];
          peerConnection.close();
        }
      }
    };
  }
  
  // Call both functions on page load
  fetchPublicIP();
  fetchLocalIP();
  