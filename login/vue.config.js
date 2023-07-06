module.exports = {
  devServer: {
    host: "hotspot.wifinetcom.net",
    proxy: "https://hotspot.wifinetcom.net:11443/",
    port: 60443,
    https: { cert: "../certs/fullchain.pem", key: "../certs/privkey.pem" },
  },
};
