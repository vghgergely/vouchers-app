FROM node:18-alpine

WORKDIR /wecan-vouchers-frontend

COPY public/ /wecan-vouchers-frontend/public
COPY src/ /wecan-vouchers-frontend/src

COPY package.json /wecan-vouchers-frontend/
COPY tsconfig.json /wecan-vouchers-frontend/
COPY tailwind.config.js /wecan-vouchers-frontend/
COPY scripts/ /wecan-vouchers-frontend/scripts
COPY config/ /wecan-vouchers-frontend/config

RUN npm install
RUN npx tailwindcss -i ./src/index.css -o ./src/output.css

EXPOSE 3000

CMD ["npm", "start"]