# 🚅 express REST API

## 익스프레스 기본 구조

1. 어플리케이션
2. 미들웨어
3. 라우팅
4. 요청객체(req)
5. 응답객체(res)

### 어플리케이션

- 익스프레스 인스턴스를 어플리케이션이라고 함
- 서버에 필요한 기능인 미들웨어를 추가
- 라우팅 설정
- 요청 대기 상태로 만들기

### 미들웨어

- 함수들의 연속
- 일반 미들웨어, 함수 미들웨어
- next()해줘야 다음 미들웨어로 넘어감

### 라우팅

- 요청 url에 대해 적절한 핸들러 함수로 연결해주는 기능
- 어플리케이션의 get,post 메소드
- 라우팅을 위한 전용 Router 클래스 사용 가능

### 요청 객체

- 클라이언트의 요청 정보를 담은 객체
- http모듈의 리퀘스트 객체를 한번 래핑한 것
- req.params(), req.query(), req.body()

## TDD(Test Driven Development)

- 소스코드보다 테스트 코드를 먼저 짠다
- api 서버 개발에 유용
- 유지보수할때 더 유용해짐
- mocha,should,supertest

### Mocha

- 모카는 테스트 코드를 돌려주는 테스트 러너
- 테스트 수트 : describe()
- 테스트 케이스 : it()
- spec : specification(명세)
- assert : 노드 자체의 테스트 모듈. 테스트 코드에는 사용하지 말고 서드파티 라이브러리를 써라
- 단위테스트 : 함수의 기능을 테스트
- 슈퍼테스트 : 익스프레스 통합 테스트용 라이브러리, 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증, supertest모듈을 불러와 expect, get, end 등으로 검증

### req파싱

- req.params
- req.query

### res 전달

- res.json()
- res.status()

### CRUD

#### 메소드

- POST :엔티티 바디 전송(C)
- GET : 리소스 취득(R)
- PUT,PATCH : 리소스 일부 수정(U)
- DELETE : 파일 삭제(D)

#### Delete

- 성공시 204, id 틀리면 400
