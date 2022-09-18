#!/bin/sh
export DATABASE_URL="postgresql://ppp:ppp@db:5432/ppp?schema=public"
npx prisma migrate deploy && npm run build && npm run start
while :
do
    echo "Press [CTRL-C]"
    sleep 1
done
