pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
        NETLIFY_AUTH_TOKEN = credentials('jenkins-deployment')

    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                     args '-u 1000:1000 -v /var/jenkins_home/workspace/google-Docs-Deployment:/var/jenkins_home/workspace/google-Docs-Deployment:rw,z'
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy to netlify') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                     args '-u 1000:1000 -v /var/jenkins_home/workspace/google-Docs-Deployment:/var/jenkins_home/workspace/google-Docs-Deployment:rw,z'
                }
            }
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