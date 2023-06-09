module.exports = {
  devServer: {
    host: "hotspot.wifinetcom.net",
    proxy: "https://hotspot.wifinetcom.net:11443/",
    port: 10443,
    //https: { cert: "../certs/hotspot.wifinetcom.net.crt", key: "../certs/hotspot.wifinetcom.net.key" },
    https: { cert: "../certs/fullchain.pem", key: "../certs/privkey.pem" },
  },
};
