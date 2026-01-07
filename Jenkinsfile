pipeline {
    agent any

    environment {
        // Name of the image to build
        IMAGE_NAME = "portfolio-app"
        // ID of the 'Secret File' credential in Jenkins containing your .env content
        ENV_CREDENTIAL_ID = "portfolio-env-file"
    }

    stages {
        stage('Checkout') {
                // Explicitly checkout git repo since 'checkout scm' fails if script is pasted manually
                git branch: 'main', url: 'https://github.com/sachinkumarnke/Portfolio-.git'
        }

        stage('Setup Environment') {
            steps {
                script {
                    echo "Injecting environment variables..."
                    // This pulls the secret file from Jenkins and saves it as '.env' in the workspace
                    withCredentials([file(credentialsId: "${ENV_CREDENTIAL_ID}", variable: 'ENV_FILE')]) {
                        sh 'cp $ENV_FILE .env'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    // Build the image. Vite will read the .env file automatically during build.
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                    sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
                }
            }
        }

        /* 
        // Optional: Push to Docker Hub / AWS ECR
        stage('Push Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-hub-credentials', url: '') {
                        sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }
        */
    }

    post {
        always {
            // Cleanup .env file to prevent leakage in workspace
            sh 'rm -f .env'
            cleanWs()
        }
    }
}
