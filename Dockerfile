FROM node:alpine
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start-dev"]

# RUN과 CMD 차이점
# RUN : 명령어는 이미지를 빌드하는 순간에 실행. 라이브러리 설치 용도
# CMD : 컨테이너를 생성하여 최초로 실행할 때 수행
# 컨테이너가 실행되면 npm run start-dev를 해야 하므로 CMD를 사용
# 출처 : https://seokhyun2.tistory.com/61

# docker build -f Dockerfile -t docker-prac-be .
# docker run -d --name docker-prac-be -p 4000:4000 docker-prac-be