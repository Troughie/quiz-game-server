const splitPin = () => {
  const pin = Math.floor(100000 + Math.random() * 900000);
  const pinArray = pin.toString().split("");
  const pinArray2 = pinArray.slice(0, 3);
  const pinArray3 = pinArray.slice(3, 6);
  return pinArray2.join("") + " " + pinArray3.join("");
};

export { splitPin };
