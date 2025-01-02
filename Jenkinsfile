pipeline {
    agent any
    tools {
        nodejs 'nodejs'  // Ensure NodeJS is correctly configured in Jenkins
    }

    environment {
        NODEJS_HOME = 'C:/Program Files/nodejs'  
        SONAR_SCANNER_PATH = 'C:/Users/Aditya/Downloads/sonar-scanner-6.2.1.4610-windows-x64/bin'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Set the PATH and install dependencies using npm
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm ci  // Ensure clean installation of dependencies
                '''
            }
        }

        stage('Debug ESLint Plugins') {
            steps {
                // Check if eslint-plugin-react is installed
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm list eslint-plugin-react || echo "eslint-plugin-react not found"
                '''
            }
        }

        stage('Lint') {
            steps {
                // Run linting to ensure code quality
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm run lint
                '''
            }
        }

        stage('Build') {
            steps {
                // Build the React app
                bat '''
                set PATH=%NODEJS_HOME%;%PATH%
                npm run build
                '''
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token') // Accessing the SonarQube token stored in Jenkins credentials
            }
            steps {
                // Ensure that sonar-scanner is in the PATH
                bat '''
                set PATH=%SONAR_SCANNER_PATH%;%PATH%
                where sonar-scanner || echo "SonarQube scanner not found. Please install it."
                sonar-scanner -Dsonar.projectKey=backend_sonar ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.token=%SONAR_TOKEN% 2>&1
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for more details.'
        }
        always {
            echo 'This runs regardless of the result.'
        }
    }
}
