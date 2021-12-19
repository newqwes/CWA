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
