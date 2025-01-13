pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
        NETLIFY_AUTH_TOKEN=credentials('netlify-token')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                   
                }
            }
            steps {
                echo "Building the project..."
                sh 'ls -l /var/jenkins_home/workspace/google-Docs-Deployment'  
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy to Netlify') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                   
                }
            }
            steps {
                echo "Deploying to Netlify..."
                sh 'ls -l /var/jenkins_home/workspace/google-Docs-Deployment'  
                sh '''
                    npm install netlify-cli 
                    node_modules/.bin/netlify status
                    node_modules/.bin/netlify deploy --dir=./client/dist --prod
                '''
            }
        }
    }
}

