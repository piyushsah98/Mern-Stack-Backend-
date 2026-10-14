const allString =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let uniqueString = "";

const generateCode = () => {
  uniqueString = "";
  for (let i = 1; i <= 6; i++) {
    uniqueString += allString.charAt(
      Math.floor(Math.random() * allString.length) + 1,
    );
  }
  return uniqueString;
};


export default generateCode;
