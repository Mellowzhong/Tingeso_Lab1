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
                sh 'cd Backend && docker build -t mellow03/backend-presta-banco:latest .'
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    sh 'docker login -u mellow03 -p $dhpsw'
                }
                sh 'docker push mellow03/backend-presta-banco:latest'
            }
        }

        stage('Test backend') {
            steps {
                sh 'cd Backend && mvn test'
            }
        }

        stage('Build frontend') {
            steps {
                sh 'cd Frontend && docker build -t mellow03/frontend-presta-banco:latest .'
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    sh 'docker login -u mellow03 -p $dhpsw'
                }
                sh 'docker push mellow03/frontend-presta-banco:latest'
            }
        }
    }
}