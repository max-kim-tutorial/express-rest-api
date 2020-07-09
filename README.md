# 🚅 express REST API

## 이 레포에서 연습

- [x] CRUD 완성
- [x] 구조 잡기
- [x] 관계형 DB 연동 + ORM 사용하기(시퀄라이저)
- [] 리팩토링 + MySql 적용
- [] passport, 인증 수행하기
- [] 타입스크립트 끼얹기

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
- 리팩토링시에도 테스트코드를 기준으로 잘 동작하는지 알아볼 수 있음
- 깔끔하게 볼 수 있는 방법 강구, 앱 로그같은거 뜨지 않게

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
- PUT: 리소스 일부 수정(U)
- DELETE : 파일 삭제(D)

#### Create

- 생성된 유저 객체 반환, 입력한 name을 반환
- name 파라미터 누락시 400 반환, name이 중복일 경우 409?를 반환

#### Delete

- 성공시 204, id 틀리면 400

#### update

- 변경된 name 응답
- 정수가 아니면 400, name이 없으면 400, 없는 유저 404, 이름이 중복이면 409

## 데이터베이스

- Sqlite 사용할 것
- SQL : MySql, PostgreSQL
- NoSQL : MongoDB, DynamoDB
- In Memory DB : **Redis**, Memcached
  - 서비스의 성능 향상을 위해 인메모리 디비 사용
  - 재구동될때 데이터 없어짐

### 쿼리(sql)

```sql
insert users(`name`)values('alice');
select * from users;
update users set name = 'bek' where id = 1;
delete from users where id = 1;
```

### ORM

- Object Relational Mapping : 데이터베이스를 객체로 추상화
- 쿼리를 직접 작성하는 대신 ORM의 메소드로 데이터를 관리할 수 잇음
- 노드에서 SQL ORM은 시퀄라이저를 주로 사용함
- ORM의 모델 : 데이터베이스 테이블을 ORM으로 추상화한 것
  - sequelize.define() : 모델 정의
  - sequelize.sync() : 데이터베이스 연동

```js
// insert users(`name`)values('alice');
User.create({ name: "alice" });

// select * from users;
User.findAll();

// update users set name = 'bek' where id = 1;
User.update({ name: "bek" }, { where: { id: 1 } });

// delete from users where id = 1;
User.destroy({ where: { id: 1 } });
```

## 구조에 대한 레퍼런스

[여기](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf), [여기](http://jeonghwan-kim.github.io/express-js-1-%EC%84%A4%EC%B9%98%EC%99%80-%EA%B5%AC%EC%A1%B0/) 참조

### 원칙

1. 3 Layer architecture : 3개로 관심사를 분리. controller, service layer, data access layer

   - controller : 라우트 컨트롤러
   - service : DB에 접근하는 로직, 동작 정의, 정의된 동작으로만 DB에 접근한다. **컨트롤러에 쿼리를 작성하지 않는다 + 컨트롤러에서 모델에 직접 접근하지 않는다**
   - data access layer : 모델, 모델 스키마 정의

2. 컨트롤러에 비즈니스 로직을 넣지 마라 : 스파게티 코드 각임. 유닛 테스트 모킹할때도 복잡

3. pub/sub 구조 : 구독자 패턴, publisher와 subscriber의 분리. 서비스 로직 하나에서 모두 처리하려고 하지 말고, 이벤트를 알려주는 패턴을 사용해서 로직을 분리해라

4. 의존성 주입 : 파라미터같은거 명시해서 가독성 올리고, 클래스나 함수에서 다루는 값들을 쉽게 파악할 수 있도록 한다. 클래스 같은 경우 인자로 받는 얘들을 멤버변수화해서 처리

5. 클래스 활용 : 임포트 할때 유용하기도 하고, 다형성을 쉽게 구현할 수 있게끔 함. 타입스크립트의 클래스 기능이 더 좋으므로 그걸 한번 공부해봐야 할듯.

### 구조 폴더

- loader : 앱을 시작하기 위한 함수 or 클래스. 진입점에서 실행시킨다. app.js에 앱을 시작하는 코드들을 모두 때려박으면 넘 길고 구구절절해지므로 모듈화를 한다. 데이터베이스를 연결하는 로직, 라우터를 연결하는 로직, 서버를 실제로 시작하는 로직 등등을 모듈화해서 깔끔하게 정리할 수 있음
- config : 환경변수를 모아둔다(dotenv.config())
- models : 데이터베이스 관련한 로직. 데이터베이스 스키마를 작성하는 로직과, ORM등을 설정하는 로직을 분리하면 좋을 것 같다
- services : 데이터베이스에 접근하는 로직들을 작성한다. 쿼리를 짜주는 곳이라고 생각하면 될듯.
- controllers/API/routers : 라우팅하는 URL에 맞춰 관련한 로직들을 한꺼번에 폴더에 정리한다. 폴더의 index에서는 라우터와 컨트롤러 함수를 매칭하고, ctrl 파일에서 라우트 함수의 구체적인 로직을 짠다. 테스트 파일도 같이 넣어준다(따로 test 폴더를 운용하는 것보다 이렇게 하는게 더 나을듯). middleware 폴더를 따로 만들어줘도 좋다. 최상위의 index에는 모든 라우터 로직들을 패키지로 묶어줌
