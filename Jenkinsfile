pipeline {
    agent any
    tools {
        maven 'maven_3_8_1'
    }
    stages {

        stage('Checkout repository') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1']])
            }
        }

        stage('Build backend') {
            steps {
                script {
                    if (isUnix()) {
                        // Usar Docker Buildx para construir la imagen multi-arquitectura
                        sh '''
                            docker buildx create --use
                            cd Backend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/backend-presta-banco:latest --push .
                        '''
                    } else {
                        bat '''
                            docker buildx create --use
                            cd Backend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/backend-presta-banco:latest --push .
                        '''
                    }
                }
            }
        }

        stage('Test backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'cd Backend && mvn test'
                    } else {
                        bat 'cd Backend && mvn test'
                    }
                }
            }
        }

        stage('Build frontend') {
            steps {
                script {
                    if (isUnix()) {
                        // Usar Docker Buildx para construir la imagen multi-arquitectura
                        sh '''
                            docker buildx create --use
                            cd Frontend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/frontend-presta-banco:latest --push .
                        '''
                    } else {
                        bat '''
                            docker buildx create --use
                            cd Frontend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/frontend-presta-banco:latest --push .
                        '''
                    }
                }
            }
        }

    }
}