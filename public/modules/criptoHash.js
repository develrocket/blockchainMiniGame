async function sha256(str) {
  // Convert the string to a byte array
  const buffer = new TextEncoder().encode(str);
  // Calculate the hash of the byte array
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  // Convert the hash to a hexadecimal string
  return hex(hash);
}

function hex(buffer) {
  // Convert the buffer to a hexadecimal string
  const hexCodes = [];
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    const value = view.getUint32(i);
    const stringValue = value.toString(16);
    const padding = "00000000";
    const paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  return hexCodes.join("");
}
