pipeline {
    agent any
    tools {
        maven 'maven_3_8_1'
    }
    stages {
        stage('Build backend') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1']])
                sh 'cd Backend && docker build -t mellow03/backend-presta-banco:latest .'
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    sh 'docker login -u mellow03 -p $dhpsw'
                }
                sh 'docker login'
                sh 'docker push mellow03/backend:latest'
            }
        }

        stage('Build frontend') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1']])
                sh 'cd Frontend && docker build -t mellow03/frontend-presta-banco:latest .'
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    sh 'docker login -u mellow03 -p $dhpsw'
                }
                sh 'docker login'
                sh 'docker push mellow03/frontend:latest'
            }
        }

        stage('nginx-backend-build') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1']])
                sh 'cd nginx && docker build -t mellow03/nginx-backend-presta-banco:latest .'
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    sh 'docker login -u mellow03 -p $dhpsw'
                }
                sh 'docker login'
                sh 'docker push mellow03/nginx-backend-presta-banco:latest'
            }
        }

        stage('nginx-frontend-build') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1']])
                sh 'cd nginx && docker build -t mellow03/nginx-frontend-presta-banco:latest .'
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    sh 'docker login -u mellow03 -p $dhpsw'
                }
                sh 'docker login'
                sh 'docker push mellow03/nginx-frontend-presta-banco:latest'
            }
        }

        stage('Docker Compose') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1']])
                sh 'docker-compose up'
            }
        }
    }
}