const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection(
  { host: "15.164.61.1", port: 65400 },
  () => {
    console.log("Connected to server");
    promptForMessage();
  }
);

client.on("data", (data) => {
  console.log(`Received from server: ${data}`);
  promptForMessage(); // Prompt for next message
});

client.on("end", () => {
  console.log("Disconnected from server");
  rl.close();
});

function promptForMessage() {
  rl.question("Enter a message to send to the server: ", (message) => {
    if (message === "exit") {
      client.end();
    } else {
      client.write(message);
    }
  });
}
