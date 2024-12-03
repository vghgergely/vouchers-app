FROM gradle:8.10-jdk23 AS build

WORKDIR /wecan-vouchers-backend

COPY src ./src
COPY build.gradle settings.gradle  ./

RUN gradle clean build

FROM openjdk:23-jdk as runner


COPY --from=build /wecan-vouchers-backend/build/libs/*.jar app.jar
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
