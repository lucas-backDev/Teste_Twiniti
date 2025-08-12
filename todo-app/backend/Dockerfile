# Usa uma imagem base oficial do OpenJDK para Java 17
FROM openjdk:17-jdk-slim as build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo pom.xml para que as dependências sejam baixadas primeiro
# Isso aproveita o cache do Docker para builds mais rápidos
COPY pom.xml .

# Copia o restante do código fonte
COPY src ./src

# Empacota a aplicação Spring Boot em um JAR executável
# O comando 'mvn clean package -DskipTests' compila e cria o JAR, pulando os testes
# O './mvnw' é o wrapper Maven que garante que o Maven seja executado mesmo sem instalação global
RUN ./mvnw clean package -DskipTests

# Segunda fase: Cria uma imagem menor para a execução
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR executável da fase de build
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta que a aplicação Spring Boot usa
EXPOSE 8080

# Define o comando para executar a aplicação quando o contêiner iniciar
ENTRYPOINT ["java", "-jar", "app.jar"]