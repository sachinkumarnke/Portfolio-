pipeline {
  agent any

  environment {
    IMAGE_NAME = "portfolio-image"
    CONTAINER_NAME = "portfolio"

    // EmailJS
    VITE_APP_EMAILJS_SERVICE_ID = credentials('VITE_APP_EMAILJS_SERVICE_ID')
    VITE_APP_EMAILJS_TEMPLATE_ID = credentials('VITE_APP_EMAILJS_TEMPLATE_ID')
    VITE_APP_EMAILJS_PUBLIC_KEY = credentials('VITE_APP_EMAILJS_PUBLIC_KEY')

    // Firebase
    VITE_APP_FIREBASE_API_KEY = credentials('VITE_APP_FIREBASE_API_KEY')
    VITE_APP_FIREBASE_AUTH_DOMAIN = credentials('VITE_APP_FIREBASE_AUTH_DOMAIN')
    VITE_APP_FIREBASE_PROJECT_ID = credentials('VITE_APP_FIREBASE_PROJECT_ID')
    VITE_APP_FIREBASE_STORAGE_BUCKET = credentials('VITE_APP_FIREBASE_STORAGE_BUCKET')
    VITE_APP_FIREBASE_MESSAGING_SENDER_ID = credentials('VITE_APP_FIREBASE_MESSAGING_SENDER_ID')
    VITE_APP_FIREBASE_APP_ID = credentials('VITE_APP_FIREBASE_APP_ID')
    VITE_APP_FIREBASE_MEASUREMENT_ID = credentials('VITE_APP_FIREBASE_MEASUREMENT_ID')
    // AWS
    AWS_REGION = 'ap-south-1'
    VITE_APP_AWS_BUCKET_NAME = 'portfoliosachin'
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
            url: 'https://github.com/sachinkumarnke/Portfolio-.git',
            credentialsId: 'github-creds'
      }
    }

    stage('Build & Deploy') {
      steps {

        withCredentials([
          [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']
        ]) {

          sh '''
          docker build \
            --build-arg VITE_APP_EMAILJS_SERVICE_ID=$VITE_APP_EMAILJS_SERVICE_ID \
            --build-arg VITE_APP_EMAILJS_TEMPLATE_ID=$VITE_APP_EMAILJS_TEMPLATE_ID \
            --build-arg VITE_APP_EMAILJS_PUBLIC_KEY=$VITE_APP_EMAILJS_PUBLIC_KEY \
            --build-arg VITE_APP_FIREBASE_API_KEY=$VITE_APP_FIREBASE_API_KEY \
            --build-arg VITE_APP_FIREBASE_AUTH_DOMAIN=$VITE_APP_FIREBASE_AUTH_DOMAIN \
            --build-arg VITE_APP_FIREBASE_PROJECT_ID=$VITE_APP_FIREBASE_PROJECT_ID \
            --build-arg VITE_APP_FIREBASE_STORAGE_BUCKET=$VITE_APP_FIREBASE_STORAGE_BUCKET \
            --build-arg VITE_APP_FIREBASE_MESSAGING_SENDER_ID=$VITE_APP_FIREBASE_MESSAGING_SENDER_ID \
            --build-arg VITE_APP_FIREBASE_APP_ID=$VITE_APP_FIREBASE_APP_ID \
            --build-arg VITE_APP_FIREBASE_MEASUREMENT_ID=$VITE_APP_FIREBASE_MEASUREMENT_ID \
            --build-arg VITE_APP_AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
            --build-arg VITE_APP_AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
            --build-arg VITE_APP_AWS_REGION=$AWS_REGION \
            --build-arg VITE_APP_AWS_BUCKET_NAME=$VITE_APP_AWS_BUCKET_NAME \
            -t $IMAGE_NAME .

          docker stop $CONTAINER_NAME || true
          docker rm $CONTAINER_NAME || true
          docker run -d \
            --name $CONTAINER_NAME \
            -p 80:80 \
            $IMAGE_NAME
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Portfolio deployed successfully"
    }
    failure {
      echo "❌ Deployment failed"
    }
  }
}
