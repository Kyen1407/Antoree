pipeline {
    agent any

    environment {
        IMAGE_NAME = 'yourdockerhub/antoree-laravel'
        CONTAINER_NAME = 'laravel-antoree'
        SSH_HOST = 'user@your-server-ip'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred-id')
    }

    stages {
        stage('Clone Source') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/antoree-laravel.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['ssh-key-id']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $SSH_HOST << 'ENDSSH'
                        docker pull $IMAGE_NAME
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                        docker run -d --name $CONTAINER_NAME -p 80:80 $IMAGE_NAME
                        ENDSSH
                    """
                }
            }
        }
    }
}
