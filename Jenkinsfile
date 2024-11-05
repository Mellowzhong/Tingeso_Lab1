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
                        sh 'cd Backend && docker build -t mellow03/backend-presta-banco:latest .'
                    } else {
                        bat 'cd Backend && docker build -t mellow03/backend-presta-banco:latest .'
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
                        sh 'cd Frontend && docker build -t mellow03/frontend-presta-banco:latest .'
                    } else {
                        bat 'cd Frontend && docker build -t mellow03/frontend-presta-banco:latest .'
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