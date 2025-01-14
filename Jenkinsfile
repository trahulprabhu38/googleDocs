// pipeline {
//     agent any
//     environment {
//         NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
//         NETLIFY_AUTH_TOKEN = credentials('netlify-token')
//     }

//     stages {
//         stage('Build') {
//             agent {
//                 docker {
//                     image 'node:18-alpine'
//                     reuseNode true
//                 }
//             }
//             steps {
//                 echo "Building the project..."
                
                
//                 dir('client') {
//                     sh 'ls -l'  
//                     sh 'npm install'
//                     sh 'npm run build'
//                 }
//                 dir('server') {
//                     sh 'ls -l'  
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('Deploy to Netlify') {
//             agent {
//                 docker {
//                     image 'node:18-alpine'
//                     reuseNode true
//                 }
//             }
//             steps {
//                 echo "Deploying to Netlify..."
                
            
//                 dir('client') {
//                     sh 'ls -l'  
//                     sh '''
//                         npm install  netlify-cli  
//                         node_modules/.bin/netlify status 
//                         node_modules/.bin/netlify deploy --dir=./dist --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --prod  
//                     '''
//                 }
//             }
//         }
//     }
// // }

// pipeline {
//     agent any
//     environment {
//         NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
//         NETLIFY_AUTH_TOKEN = credentials('netlify-token')
//     }

//     stages {
//         stage('Build') {
//             agent {
//                 docker {
//                     image 'node:18-alpine'
//                     reuseNode true
//                 }
//             }
//             steps {
//                 echo "Building the project..."

//                 // Build the frontend
//                 dir('client') {
//                     echo "Building frontend..."
//                     sh '''
//                         ls -l
//                         npm install
//                         npm run build
//                     '''
//                 }

//                 // Prepare the backend
//                 dir('server') {
//                     echo "Preparing backend..."
//                     sh '''
//                         ls -l
//                         npm install
//                     '''
//                 }
//             }
//         }

//         stage('Deploy to Netlify') {
//             agent {
//                 docker {
//                     image 'node:18-alpine'
//                     reuseNode true
//                 }
//             }
//             steps {
//                 echo "Deploying to Netlify..."

//                 dir('client') {
//                     echo "Deploying frontend to Netlify..."
//                     sh '''
//                         npm install netlify-cli
//                         ./node_modules/.bin/netlify status
//                         ./node_modules/.bin/netlify deploy --dir=./dist --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN --prod
//                     '''
//                 }
//             }
//         }

//         stage('Build Backend') {
//             steps {
//                 echo "Building backend with Docker Compose..."
//                 dir('server') {
//                     sh '''
//                         if ! command -v docker-compose &> /dev/null; then
//                             echo "docker-compose could not be found. Please install it on the Jenkins server."
//                             exit 1
//                         fi
//                         docker-compose down || true
//                         docker-compose up -d --build
//                     '''
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             echo "Pipeline completed successfully!"
//         }
//         failure {
//             echo "Pipeline failed. Check the logs for details."
//         }
//     }
// }
pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            reuseNode true
        }
    }
    
    environment {
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
        DOCKER_IMAGE_BACKEND = 'trahulprabhu38/server-docs-image'
        DOCKER_IMAGE_FRONTEND = 'trahulprabhu38/client-docs-image '
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('server') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('client') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('server') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('client') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDS) {
                        // Build and push backend image
                        def backendImage = docker.build("${DOCKER_IMAGE_BACKEND}", "./server")
                        backendImage.push()
                        
                        // Build and push frontend image
                        def frontendImage = docker.build("${DOCKER_IMAGE_FRONTEND}", "./client")
                        frontendImage.push()
                    }
                }
            }
        }
        
        stage('Deploy Frontend to Netlify') {
            steps {
                dir('client') {
                    sh '''
                        npm install netlify-cli
                        ./node_modules/.bin/netlify deploy --dir=./dist \
                            --site=$NETLIFY_SITE_ID \
                            --auth=$NETLIFY_AUTH_TOKEN \
                            --prod
                    '''
                }
            }
        }
        
        stage('Deploy Backend') {
            steps {
                dir('server') {
                    sh '''
                        docker-compose down || true
                        docker-compose up -d --build
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}
