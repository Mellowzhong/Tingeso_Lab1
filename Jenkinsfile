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

        stage('Setup Docker Buildx') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker buildx create --use || true'
                        sh 'docker buildx inspect --bootstrap'
                    } else {
                        bat 'docker buildx create --use || true'
                        bat 'docker buildx inspect --bootstrap'
                    }
                }
            }
        }

        stage('Build backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'cd Backend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/backend-presta-banco:latest .'
                    } else {
                        bat 'cd Backend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/backend-presta-banco:latest .'
                    }
                }
                
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    script {
                        if (isUnix()) {
                            sh 'docker login -u mellow03 -p $dhpsw'
                        } else {
                            bat 'docker login -u mellow03 -p %dhpsw%'
                        }
                    }
                }

                script {
                    if (isUnix()) {
                        sh 'docker push mellow03/backend-presta-banco:latest'
                    } else {
                        bat 'docker push mellow03/backend-presta-banco:latest'
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
                        sh 'cd Frontend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/frontend-presta-banco:latest .'
                    } else {
                        bat 'cd Frontend && docker buildx build --platform linux/amd64,linux/arm64 -t mellow03/frontend-presta-banco:latest .'
                    }
                }

                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    script {
                        if (isUnix()) {
                            sh 'docker login -u mellow03 -p $dhpsw'
                        } else {
                            bat 'docker login -u mellow03 -p %dhpsw%'
                        }
                    }
                }

                script {
                    if (isUnix()) {
                        sh 'docker push mellow03/frontend-presta-banco:latest'
                    } else {
                        bat 'docker push mellow03/frontend-presta-banco:latest'
                    }
                }
            }
        }

    }
}