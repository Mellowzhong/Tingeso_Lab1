FROM openjdk:17
ARG JAR_FILE=target/Backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} backend.jar

# Definir variables de entorno necesarias
ENV PORT=8080
ENV DB_HOST=192.168.1.176
ENV DB_USER=postgres
ENV DB_PASSWORD=admin

ENTRYPOINT ["java", "-jar", "/backend.jar"]