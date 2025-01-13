FROM node:20-alpine as builder

WORKDIR '/app'

COPY package.json ./
RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx
EXPOSE 3000
# /etc/nginx/conf.d/default.conf는 컨테이너 안에 있는 nginx 설정 파일 경로
# 우리가 설정한 default.conf 파일로 컨테이너 안에 있는 nginx 설정 파일을 덮는다.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# --from=builder는 위에 있는 builder라는 단계에서 생성된 결과물을 가리킨다.
# /app/build는 위에 있는 builder라는 단계에서 생성된 결과물이 들어있는 경로
COPY --from=builder /app/build /usr/share/nginx/html