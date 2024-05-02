import { jwtDecode } from "jwt-decode";
export function generateUniqueId() {
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.random().toString(16).substr(2, 8);
  return `${timestamp}-${randomPart}`;
}

export const getTokenExpiration = (jwt: string) => {
  try {
    const decoded = jwtDecode(jwt);
    const exp: number = decoded.exp;
    const expirationDate = new Date(exp * 1000);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = exp - currentTime;
    const expirationReadable = expirationDate.toUTCString();

    return {
      expirationDate,
      expirationReadable,
      timeRemaining,
    };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const convertSecondsToFormattedTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsAfterMinutes = remainingSeconds % 60;
  const padWithZero = (number: number) => (number < 10 ? `0${number}` : number);
  const formattedTime = `${padWithZero(hours)}:${padWithZero(
    minutes
  )}:${padWithZero(remainingSecondsAfterMinutes)}`;

  return formattedTime;
};
