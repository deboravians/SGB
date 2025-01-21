# Etapa de build
FROM openjdk:23-jdk-slim AS build
WORKDIR /app
COPY ./target/SB-0.0.1-SNAPSHOT.jar app.jar

# Etapa final
FROM openjdk:23-jdk-slim
WORKDIR /app
COPY --from=build /app/app.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]