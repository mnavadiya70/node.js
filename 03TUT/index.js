const logEvents = require("./logEvent");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

//listener for log eventy
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  myEmitter.emit("log", "Log event emitted");
}, 2000);
