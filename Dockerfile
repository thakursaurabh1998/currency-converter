FROM node:erbium-alpine

COPY . /app
WORKDIR /app

EXPOSE 8081

RUN npm ci --production --prefix=backend && npm ci --prefix=client && npm run build --prefix=client
RUN npm test --prefix=backend

USER node
CMD [ "node", "./backend/index.js" ]
