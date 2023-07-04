const whiteList = [
  "http://localhost:3000/",
  "https://www.google.com/",
  "http://mysite:3000/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
