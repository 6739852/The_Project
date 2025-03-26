import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  const [facilities, setFacilities] = useState([]);

  const FACILITY = [
    { name: "מתקן 1", description: "תיאור מתקן 1", image: "../Images/logo_1.jpg" },
    { name: "מתקן 2", description: "תיאור מתקן 2", image: "../Images/logo_1.jpg" },
    { name: "מתקן 2", description: "תיאור מתקן 2", image: "../Images/logo_1.jpg" },
    { name: "מתקן 2", description: "תיאור מתקן 2", image: "../Images/logo_1.jpg" },
    { name: "מתקן 2", description: "תיאור מתקן 2", image: "../Images/logo_1.jpg" },
    { name: "מתקן 2", description: "תיאור מתקן 2", image: "../Images/logo_1.jpg" },
    { name: "מתקן 2", description: "תיאור מתקן 2", image: "../Images/logo_1.jpg" },
    { name: "מתקן 2", description: "תיאור מתקן 2", image: "../Images/logo_1.jpg" },
  ];

  return (
    <>
      {/* <Box sx={{ m: 0, p: 0, overflowX: "hidden" ,display: "flex", flexDirection: "column",marginTop: "28vh", alignItems: "center", justifyContent: "center"}}> */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "28vh" }}>
        {/* <div style={{ width: "100vw", height: "90vh", position: "relative", marginTop: "0" }}> */}
        <video src="src/Components/Images/video.mp4" muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* </div> */}

        <video
          src="../Images/logo_1.jpg"
          muted
          loop
          autoPlay
          style={{
            width: "100vw",
            height: "100vh !important", // שיביא אותו לגובה מלא
            objectFit: "cover",
            position: "relative", // מוודא שהוא לא עולה על הניווט
            zIndex: "0", // מבטיח שהוא לא יעלה על ה-NavBar
            marginTop: "0px ", // אם יש מרווחים לא רצויים
          }}
        />
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, padding: 0, marginTop: "0px", width: "100vw", paddingTop: "10px" }}>
          {FACILITY.map((facility, index) => (
            <Box key={index} sx={{ backgroundColor: "#ddd", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
              <img
                src={facility.image}
                alt={facility.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0px" }}
              />
              <Typography variant="h6" sx={{ marginTop: "10px" }}>{facility.name}</Typography>
              <Typography variant="body2">{facility.description}</Typography>
            </Box>
          ))}
        </Box>
      </div>
    </>
  );
};

export default HomePage;