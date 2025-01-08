// Fetch the user's IP and location
async function fetchIPAndLocation() {
  const ipDisplay = document.getElementById("ip-display");
  const locationDisplay = document.getElementById("location-display");
  const errorMessage = document.getElementById("error-message");

  try {
    // Fetch public IP and location using ipapi.co
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error("Failed to fetch IP and location");

    const data = await response.json();

    // Display the IP
    ipDisplay.textContent = data.ip;

    // Display the location (city, region, country)
    locationDisplay.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
  } catch (error) {
    ipDisplay.textContent = "N/A";
    locationDisplay.textContent = "N/A";
    errorMessage.textContent = "Error fetching IP and location. Please try again later.";
    console.error("Error fetching IP and location:", error);
  }
}

// Call the function on page load
fetchIPAndLocation();
