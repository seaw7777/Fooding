pipeline {
    // 파이프라인을 실행하고 싶은 위치 정의
    agent none
    // gitlab의 소스를 jenkins 디렉토리로 내려받을 시
    // skipDefaultCheckout(true)일 경우 내려받는 프로세스 skip
    // skipDefaultCheckout(false)일 경우 gitlab 소스 체크
    options { skipDefaultCheckout(false) }
    // stage의 모음
    stages {
    // 실제 작업이 수행되는 블록
        stage('Docker build') {
            agent any
            steps {
                sh 'docker build -t testfront:latest /var/jenkins_home/workspace/fooding/client'
                sh 'docker build -t testback:latest /var/jenkins_home/workspace/fooding/server'
            }
        }
        stage('Docker run') {
            agent any
            steps {
                // 현재 동작중인 컨테이너 중 <front-image-name>의 이름을 가진
                // 컨테이너를 stop 한다
                sh 'docker ps -f name=testfront -q \
                | xargs --no-run-if-empty docker container stop'
                // 현재 동작중인 컨테이너 중 <back-image-name>의 이름을 가진
                // 컨테이너를 stop 한다
                sh 'docker ps -f name=testback -q \
                | xargs --no-run-if-empty docker container stop'
                // <front-image-name>의 이름을 가진 컨테이너를 삭제한다.
                sh 'docker container ls -a -f name=testfront -q \
                | xargs -r docker container rm'
                // <back-image-name>의 이름을 가진 컨테이너를 삭제한다.
                sh 'docker container ls -a -f name=testback -q \
                | xargs -r docker container rm'
                // docker image build 시 기존에 존재하던 이미지는
                // dangling 상태가 되기 때문에 이미지를 일괄 삭제
                sh 'docker images -f "dangling=true" -q \
                | xargs -r docker rmi'
                // docker container 실행
                sh 'docker run -d --name testfront \
                -p 80:80 \
                -p 443:443 \
                -v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/fooding/sslkey/ \
                testfront:latest'
                sh 'docker run \
                -v img-vol:/img \
                -d --name testback -p 8000:8000 testback:latest'
            }
        }
    }
}
