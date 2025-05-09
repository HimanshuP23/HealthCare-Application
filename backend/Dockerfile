##Stage 1: Build the Application
FROM maven:3.8.7-eclipse-temurin-17 AS build

## Set the current working directory inside the image
WORKDIR /app

## Copy maven executable to the image
COPY mvnw mvnw
COPY .mvn .mvn

# Copy the pom.xml file
COPY pom.xml .
RUN chmod +x mvnw

# Build all the dependencies in preparation to go offline.
# This is a separate step so the dependencies will be cached unless
# the pom.xml file has changed.
RUN ./mvnw dependency:go-offline -B

# Copy the project source
COPY src src

# Package the application
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

#### Stage 2 : A minimal docker image with command to run the app
FROM eclipse-temurin:17-jre

ARG DEPENDENCY=/app/target/dependency

# Copy project dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT [ "java","-cp","app:app/lib/*","com.healthcare.BackendApplication" ]
