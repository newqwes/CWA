конфиг по адресу /etc/nginx/sites-available/apijira.conf

если там запущенно реакт приложение необходимо подправить работу роутинга добовляется в конфиг server... и там добавить эту првоерку

location / {
if (!-e $request_filename){
      rewrite ^(.*)$ /index.html break;
}
}

после сохранения конфига првоерить синтакс
nginx -t

перезапуск nginx
service nginx restart

посмотреть статус
service nginx status

конфиг pm2 по адресу home/ecosystem.config.js
после изменения конфиг файла pm2 перезапустить pm2 необходимо! pm2 start в директории конфига это всё

команды pm2
pm2 start cwa
pm2 stop cwa
pm2 restart cwa
pm2 monit
pm2 status
pm2 delete
pm2 save

11 deserializeUser
3 UserService
4 authMiddleware
4.2 googleauthorization
5 checkLastRefreshDate
1 refreshController

4 authMiddleware
4.1 authMiddleware
5 checkLastRefreshDate
1 refreshController

Ответ от coinmarketcap -

{
"id": 52,
"name": "XRP",
"symbol": "XRP",
"slug": "xrp",
"num_market_pairs": 673,
"date_added": "2013-08-04T00:00:00.000Z",
"tags": [
"medium-of-exchange",
"enterprise-solutions",
"binance-chain",
"arrington-xrp-capital-portfolio",
"galaxy-digital-portfolio",
"a16z-portfolio",
"pantera-capital-portfolio"
],
"max_supply": 100000000000,
"circulating_supply": 47615126275,
"total_supply": 99989829709,
"platform": null,
"cmc_rank": 8,
"last_updated": "2022-01-13T09:52:00.000Z",
"quote": {
"USD": {
"price": 0.7935336128207117,
"volume_24h": 1847710820.9354305,
"volume_change_24h": 0.5009,
"percent_change_1h": -0.23484957,
"percent_change_24h": 3.80003546,
"percent_change_7d": 6.0787807,
"percent_change_30d": 1.20689666,
"percent_change_60d": -32.72284056,
"percent_change_90d": -28.84022944,
"market_cap": 37784203177.915146,
"market_cap_dominance": 1.8125,
"fully_diluted_market_cap": 79353361282.07,
"last_updated": "2022-01-13T09:52:00.000Z"
}
}
},
