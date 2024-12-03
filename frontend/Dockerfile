FROM node:18-alpine

WORKDIR /wecan-vouchers-frontend

COPY public/ /wecan-vouchers-frontend/public
COPY src/ /wecan-vouchers-frontend/src

COPY package.json /wecan-vouchers-frontend/
COPY tsconfig.json /wecan-vouchers-frontend/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]