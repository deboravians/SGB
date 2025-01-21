# Etapa de build
FROM node:22.11.0 AS build
WORKDIR /app
COPY ./my-app /app
RUN npm install && npm run build

# Etapa final (runtime)
FROM node:22.11.0
WORKDIR /app
COPY --from=build /app /app
EXPOSE 5173
CMD ["npm", "start"]