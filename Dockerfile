FROM node:18-alpine
WORKDIR /app

COPY . .
RUN yarn
RUN npx prisma migrate dev
RUN npx nest build

CMD ["node", "dist/main"]

EXPOSE 3000
