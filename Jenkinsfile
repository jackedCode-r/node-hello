pipeline {
    agent any

    environment {
        EC2_IP = "13.233.162.132"
        EC2_USER = "ubuntu"
        APP_DIR = "/home/ubuntu/node-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                url: 'https://github.com/jackedCode-r/node-hello.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy to EC2') {
            steps {

                sshagent(['ec2-ssh-key']) {

                    sh """
                    ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_IP '
                        rm -rf $APP_DIR
                        mkdir -p $APP_DIR
                    '
                    """

                    sh """
                    scp -r . $EC2_USER@$EC2_IP:$APP_DIR
                    """

                    sh """
                    ssh $EC2_USER@$EC2_IP '
                        cd $APP_DIR
                        npm install
                        node index.js &
                    '
                    """

                }

            }
        }

    }
}
