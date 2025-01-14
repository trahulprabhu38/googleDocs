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
             image 'docker:19.03.12-dind'  
            args '-v /var/run/docker.sock:/var/run/docker.sock --user root'
            image 'node:18-alpine'
            reuseNode true
        }   

    }
    
    environment {
        DOCKER_USERNAME = 'trahulprabhu38'
        DOCKER_PASSWORD = 'Lonewolf@Namratha38'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
        DOCKER_IMAGE_BACKEND = 'trahulprabhu38/server-docs-image'
        DOCKER_IMAGE_FRONTEND = 'trahulprabhu38/client-docs-image'
    }
    
    stages {

        stage('Install Docker') {
            steps {
                script {
                    sh '''
                        curl -fsSL https://get.docker.com -o get-docker.sh
                        sudo sh get-docker.sh
                    '''
                }
            }
        }

        stage('Testing Docker') {
            steps {
                script {
                    // Check if Docker is available
                    sh 'docker --version'
                    sh 'which docker'
                    sh 'which docker-compose || echo "docker-compose not found"'
                }
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
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        // Login to Docker Hub
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"

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
