pipeline {
    agent any
    tools{
        maven 'maven_3_8_1'
    }
    stages{
        stage('Build bacekdn'){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Mellowzhong/Tingeso_Lab1.git']])
                sh 'cd Backend'
                sh 'docker build -t mellow03/backend:latest .'
                withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                    sh 'docker login -u mellow03 -p %dhpsw%'
                }
                sh 'docker push mellow03/backend:latest'
            }
        }
    }
}