pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    environment {
        NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
        NETLIFY_AUTH_TOKEN = credentials('jenkins-deployment')
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy to netlify') {
            steps {
                sh '''
                    npm install netlify-cli 
                    node_modules/.bin/netlify status
                    node_modules/.bin/netlify deploy --dir=build --prod
                '''
            }
        }
    }
}