//פונקציה שמחלצת את הנתונים מהטוקן
export default function parseJwt() {
    const t = localStorage.getItem("token");
    if (!t) {
      console.error("No token found in localStorage");
      return null;
    }
    try {
      const base64Url = t.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  }