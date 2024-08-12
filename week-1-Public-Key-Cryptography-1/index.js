
const bytes = new Uint8Array([0, 255, 127, 128])



// Bytes to Ascii

function bytesToAscii(byteArray) {
    return byteArray.map(byte => String.fromCharCode(byte)).join('');
  }
  
  /* Ascii */

  // Example usage:
  const b = [72, 101, 108, 108, 111]; // Corresponds to "Hello"
  const asciiString = bytesToAscii(b);
  console.log(asciiString); // Output: "Hello"


// Ascii to bytes
function asciiToBytes(asciiString) {
    const byteArray = [];
    for (let i = 0; i < asciiString.length; i++) {
      byteArray.push(asciiString.charCodeAt(i));
    }
    return byteArray;
  }
  
  // Example usage:
  const ascii = "Hello";
  const byteArray = asciiToBytes(ascii);
  console.log(byteArray); // Output: [72, 101, 108, 108, 111]



// UInt8Array to ascii
function bytesToAscii(byteArray) {
    return new TextDecoder().decode(byteArray);
  }
  
  // Example usage:
  const bts= Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
  const AsciiString = bytesToAscii(bts);
  console.log(AsciiString); // Output: "Hello"


// Ascii to UInt8Array
function asciiToBytes(asciiString) {
    return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
  }
  
  // Example usage:
  const ascii = "Hello";
  const byteArray = asciiToBytes(ascii);
  console.log(byteArray); // Output: Uint8Array(5) [72, 101, 108, 108, 111]
  


/*    Array to hex */
function arrayToHex(byteArray) {
    let hexString = '';
    for (let i = 0; i < byteArray.length; i++) {
      hexString += byteArray[i].toString(16).padStart(2, '0');
    }
    return hexString;
  }
  
  // Example usage:
  const byteArray = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
  const hexString = arrayToHex(byteArray);
  console.log(hexString); // Output: "48656c6c6f"

  
//   Hex to array
function hexToArray(hexString) {
    const byteArray = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
    }
    return byteArray;
  }
  
  // Example usage:
  const hex = "48656c6c6f";
  const byteArrayFromHex = hexToArray(hex);
  console.log(byteArrayFromHex); // Output: Uint8Array(5) [72, 101, 108, 108, 111]

  
/* Base64 */
// Encode
const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
const base64Encoded = Buffer.from(uint8Array).toString("base64");
console.log(base64Encoded);