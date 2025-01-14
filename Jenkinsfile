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
// }

pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = '95768b9b-d5aa-4b58-b3fb-b963e98b1a98'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
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

                // Build the frontend
                dir('client') {
                    echo "Building frontend..."
                    sh '''
                        ls -l
                        npm install
                        npm run build
                    '''
                }

                // Prepare the backend
                dir('server') {
                    echo "Preparing backend..."
                    sh '''
                        ls -l
                        npm install
                    '''
                }
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

                dir('client') {
                    echo "Deploying frontend to Netlify..."
                    sh '''
                        npm install netlify-cli
                        ./node_modules/.bin/netlify status
                        ./node_modules/.bin/netlify deploy --dir=./dist --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN --prod
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                echo "Building backend with Docker Compose..."
                dir('server') {
                    sh '''
                        if ! command -v docker-compose &> /dev/null; then
                            echo "docker-compose could not be found. Please install it on the Jenkins server."
                            exit 1
                        fi
                        docker-compose down || true
                        docker-compose up -d --build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}
