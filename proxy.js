const axios = require('axios');
const fs = require('fs');

async function scrapeProxies() {
  const proxySources = [
    'https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=http&proxy_format=ipport&format=text&timeout=20000',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks5.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks4.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/proxy.txt',
    'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
    'https://raw.githubusercontent.com/berkay-digital/Proxy-Scraper/main/proxies.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
    'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
    'https://raw.githubusercontent.com/HumayunShariarHimu/Proxy/main/Anonymous_HTTP_One.md',
    'https://raw.githubusercontent.com/ArrayIterator/proxy-lists/main/proxies/https.txt',
    'https://raw.githubusercontent.com/ArrayIterator/proxy-lists/main/proxies/http.txt',
    'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt',
    'https://raw.githubusercontent.com/elliottophellia/proxylist/master/results/http/global/http_checked.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
    'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/https.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/http.txt',
    'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/https.txt',
    'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/socks5.txt',
    'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/socks4.txt',
    'https://raw.githubusercontent.com/themiralay/Proxy-List-World/master/data.txt',
    'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
    'https://raw.githubusercontent.com/Skiddle-ID/proxylist/main/proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
    'https://raw.githubusercontent.com/MrMarble/proxy-list/main/all.txt',
    'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/http.txt',
    'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/http.txt',
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
    'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/miyukii-chan/proxy-list/master/proxies/http.txt',
    'https://raw.githubusercontent.com/mishakorzik/Free-Proxy/main/proxy.txt',
    'https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt',
    'https://raw.githubusercontent.com/j0rd1s3rr4n0/api/main/proxy/http.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt',
    'https://proxyspace.pro/http.txt',
    'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks4.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks4.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks5.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/connect.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks4/socks4.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks5/socks5.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks4_proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks5_proxies.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks5.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks4.txt',
    'https://raw.githubusercontent.com/yemixzy/proxy-list/master/proxies.txt',
    'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/socks5.txt',
    'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/socks4.txt',
    'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/socks5_proxies.txt',
    'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/socks4_proxies.txt',
    'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/generated/http_proxies.txt',
    'https://proxyspace.pro/socks5.txt',
    'https://proxyspace.pro/socks4.txt',
    'https://proxyspace.pro/https.txt',
    'https://proxyspace.pro/http.txt',
    'https://proxy-spider.com/api/proxies.example.txt',
    'https://openproxylist.xyz/socks5.txt',
    'https://openproxylist.xyz/socks4.txt',
    'https://openproxylist.xyz/https.txt',
    'https://openproxylist.xyz/http.txt',
    'https://naawy.com/api/public/proxylist/getList/?proxyType=socks5&format=txt',
    'https://naawy.com/api/public/proxylist/getList/?proxyType=socks4&format=txt',
    'https://naawy.com/api/public/proxylist/getList/?proxyType=https&format=txt',
    'https://naawy.com/api/public/proxylist/getList/?proxyType=http&format=txt',
    'https://multiproxy.org/txt_all/proxy.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/working.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/ultrafast.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/socks5.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/socks4.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/premium.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/new.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/http.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/fast.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks5.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks4.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
  ];

  let proxies = [];

    // Hapus File Proxies Lama
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
    console.log(`Proxies Lama Berhasil Dihapus`);
  }
  
  for (const source of proxySources) {
    try {
      const response = await axios.get(source);
      proxies = proxies.concat(response.data.split('\n'));
    } catch (error) {
      console.log(`Error Scraping Proxies`);
    }
  }

  fs.writeFileSync('proxy.txt', proxies.join('\n'));
  console.log(`Proxies Successfully Scraped And Saved To proxy.txt`);
}
module.exports = scrapeProxies;
