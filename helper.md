конфиг по адресу /etc/nginx/sites-available/apijira.conf

после сохранения конфига првоерить синтакс
nginx -t

перезапуск nginx
service nginx restart

посмотреть статус
service nginx status

конфиг pm2 по адресу home/ecosystem.config.js
после изменения конфиг файла pm2 перезапустить pm2 необходимо!

команды pm2
pm2 start cwa
pm2 stop cwa
pm2 restart cwa
pm2 monit
pm2 status
pm2 delete
pm2 save

http://localhost:3015/api/auth/google
