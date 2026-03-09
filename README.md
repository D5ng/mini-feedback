## Description

미니 피드백 서비스의 NestJS 기반 API 서버입니다. 이 문서는 **프론트엔드 개발자가 로컬에서 API 서버를 띄우고 Swagger 문서를 확인하는 방법**을 안내합니다.

---

## 1. 환경 준비

- **필수 소프트웨어**
  - Node.js 20 이상
  - pnpm (`npm install -g pnpm`)
  - Docker, Docker Compose
  - Git

- **Docker 설치 방법 (요약)**
  - **macOS**
    - [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/) 설치
    - 설치 후 Docker Desktop 실행 → 메뉴바에서 고래 아이콘이 보이면 준비 완료
  - **Windows**
    - [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) 설치
    - WSL2 활성화가 필요할 수 있으니 설치 가이드의 안내를 그대로 따라갑니다.
  - **Linux (Ubuntu 기준 예시)**
    - 공식 문서: [Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - 간단 예시:
      ```bash
      sudo apt-get update
      sudo apt-get install -y docker.io docker-compose-plugin
      sudo usermod -aG docker "$USER"
      # 그룹 반영을 위해 재로그인 또는 재부팅 필요
      ```
  - 설치 후 아래 명령으로 정상 설치 여부를 확인할 수 있습니다.
    ```bash
    docker --version
    docker compose version
    ```

- **의존성 설치 (로컬 실행 시 필요)**

  ```bash
  pnpm install
  ```

## 2. 환경 변수 설정

프로젝트 루트에서 예시 파일을 복사해 `.env` 를 생성합니다.

```bash
cp .env.example .env
```

`.env` 파일에서 최소한 아래 값을 채워 주세요.

```env
PORT=8080

DB_HOST=mini-feedback-db
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_DATABASE=your-db-name

DATABASE_URL=postgresql://your-db-username:your-db-password@your-db-host:5432/your-db-name

JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
```

> 실제 값은 백엔드에서 공유한 설정을 그대로 사용하면 됩니다.

## 3. 서버 실행 방법 (권장: Docker)

Docker를 통해 DB + API 서버를 한 번에 띄울 수 있습니다.

```bash
# 백그라운드 실행
pnpm docker:dev:up

# 또는 직접 명령어 사용
docker compose --env-file .env -f docker-compose.yaml up -d --build
```

서버가 정상적으로 뜨면 API는 기본적으로 다음 주소에서 동작합니다.

- API 베이스 URL: `http://localhost:8080`

중지할 때:

```bash
pnpm docker:dev:down
```

## 4. Swagger 문서 확인 방법

서버 실행 후 브라우저에서 아래 주소로 접속합니다.

- Swagger UI: `http://localhost:8080/docs`

### 인증이 필요한 API 사용하기

1. 먼저 `/auth/signin` 엔드포인트로 테스트 계정으로 로그인하여 **accessToken** 을 발급받습니다.
2. Swagger UI 우측 상단 **Authorize** 버튼을 클릭합니다.
3. `bearer` 스킴 입력창에 **JWT 토큰 문자열만** 입력합니다.
   - 예: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. 이후 `@ApiBearerAuth()` 가 붙은 엔드포인트(예: 피드백 생성, 피드백 조회)를 호출할 수 있습니다.

---

## 5. 주요 엔드포인트 개요

- **인증 (`/auth`)**
  - `POST /auth/signup` – 회원가입
  - `POST /auth/signin` – 로그인 (accessToken, refreshToken 발급)
  - `POST /auth/checkEmailAvailability` – 이메일 중복 확인

- **유저 (`/users`)**
  - `GET /users` – 유저 목록 조회
  - `POST /users` – 유저 생성
  - `GET /users/:id` – 유저 상세 조회
  - `DELETE /users/:id` – 유저 삭제

- **피드백 (`/users/:userId/feedbacks`)**
  - `POST /users/:userId/feedbacks` – 특정 유저에게 피드백 작성 (인증 필요)
  - `GET /users/:userId/feedbacks?viewerId=...` – 특정 유저에 대한 피드백 목록 조회 (인증 필요)

프론트엔드는 위 엔드포인트를 기반으로 호출하면 되고, 상세 스키마와 예시는 Swagger UI에서 확인할 수 있습니다.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
pnpm install -g @nestjs/mau
mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
