---
title: "파이썬 기초 문법"
excerpt: "부스트캠프 1주차 Day2 강의를 보고 내용을 정리한 노트입니다."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
  - Development

tags:
  - AI
  - Python

last_modified_at: 2021-01-19T08:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo2.jpg
  overlay_filter: 0.2 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# 파이썬의 기초 문법

---

파이썬 언어에서의 값을 담을 수 있는 변수, 코드를 모듈로 묶어서 실행하는 하나의 단위인 함수, 사용자로 부터 입력을 받는 법, 콘솔에 출력하는 법, 조건문과 반복문 그리고 스트링을 조작할 수 있는 빌트인 모듈에 대해서 알아봅니다.

## 변수

가장 기초적인 프로그래밍 문법개념 입니다.
데이터를 저장하기 위한 메모리 공간의 프로그래밍 상 이름입니다.

다른 프로그래밍 언어와 같이 다음과 같이 선언하고 특정 값으로 초기화 할 수 있습니다.

`a = 5` or `b = 3`

a = 5의 의미는 : "a라는 이름의 변수에 5라는 숫자를 넣어라" 라는 의미와 같습니다.

수학식 $2x + 7y = 14$ 에서 변수는 x와 y를 의미합니다.

프로그래밍에서 변수는 수학과 약간 다른 개념입니다.

프로그래밍에서는 변수는 값을 저장하는 장소이고,
변수는 메모리 주소를 가지고 있고 변수에 들어가는 값은 메모리 주소에 할당됩니다.

- 선언 되는 순간 메모리 특정영역에 물리적인 공간이 할당
- 변수에는 값이 할당되고 해당 값은 메모리에 저장
- A = 8의 의미는 “A는 8이다”가 아닌 A라는 이름을 가진 메모리주소에 8을 저장하라

### 변수와 관련된 파이썬 에서의 자료형, 연산자, 형변환

---

**자료형**

- 정수형 integer : 양/음의 정수이고, (1,2,3,100와 같은 것)
- 실수형 float : 소수점이 포함된 실수이고, (1.0,2.2,3.01 와 같은 것)
- 문자형 string : 따옴표 (' / ")에 들어가 있는 문자형 (abc, a20abc 와 같은 것)

**사용 예시**

```python
>>> a = 1 # Integer >>> b = 1 # Integer
>>> print (a, b)
11
>>> a = 1.5 # Float
>>> b = 3.5 # Float
>>> print (a, b)
1.5 3.5
>>> a = "ABC" # String
>>> b = "101010" # String
>>> print (a, b)
ABC 101010
>>> a = True # Boolean 대소문자 구분
>>> b = False # Boolean 대소문자 구분
>>> print (a, b)
True False
```

---

**연산자 피연산자**

- +,-,\*,/같은 기호들을 연산자라고 칭함
- 연산자에 의해 계산이 되는 숫자들은 피연산자라 칭함
- 수식에서 연산자의 역할은 수학에서 연산자와 동일
- 연산의 순서는 수학에서 연산순서와 같음
- 문자간에도 + 연산이 가능함 -> concatenate

**제곱 구하기**

```python
>>> print (3 * 3 * 3 * 3 * 3) # 3을 다섯 번 곱함 243
>>> print (3 ** 5) # 3의 5승
243
```

---

**증가또는감소연산**

```python
# 변수 a 에 1을 할당
# a 에 1를 더한 후 그 값을 a에 할당
# a 출력
>>>a=1
>>> a = a + 1
>>> print (a) 2
# a 증가 연산 # a 출력
>>> a += 1
>>> print (a) 3
# a 에 1를 뺀 후 그 값을 a에 할당
# a 감소 연산
# a 출력
>>> a = a – 1
>>> a -= 1
>>> print (a) 1
```

---

**데이터형변환:정수형↔실수형**

```python
# a 변수에 정수 데이터 10을 할당
# a가 정수형으로 출력

>>> a = 10
>>> print (a)
10
# a를 실수형으로 변환 / 정수형은 int()
# a를 출력
# a가 실수형으로 출력됨
>>> a = float(10)
>>> print (a)
10.0
# b 에 정수 데이터 3 할당
# 실수형으로 a 나누기 b를 출력
# 실수형 결과값 출력
>>> b = 3
>>> print (a / b)
3.33333333333
```

## 함수

어떤 일을 수행하는 코드의 덩어리 입니다.

```python
# 사각형의 넓이를 구하는 함수
def calculate_rectangle_area (x , y):
return x * y # 가로, 세로를 곱해서 반환
```

- 반복적인 수행을 1회만 작성 후 호출
- 코드를 논리적인 단위로 분리
- 캡슐화:인터페이스만 알면 타인의 코드사용

---

**함수 선언 문법**

```python
def 함수 이름 (parmaeter #1,...,):
수행문 #1(statements)
수행문 #2(statements)
return <반환값>
```

---

**함수 선언 예시**

```python
def calculate_rectangle_area(x , y) return x * y
rectangle_x = 10
rectangle_y = 20
print ("사각형 x의 길이: ", rectangle_x) print ("사각형 y의 길이: ", rectangle_y)
# 넓이를 구하는 함수 호출
print ("사각형의 넓이: ", calculate_rectangle_area(rectangle_x, rectangle_y))
```

## 입 출력

input() 함수를 이용해 콘솔창에서 사용자로 부터 입력을 받을 수 있습니다.

**예시**

```python
print ("Enter your name:")
somebody = input() # 콘솔창에서 입력한 값을 somebody에 저장
print ("Hi", somebody, "How are you today?")
```

**실행**

```python
python console_test.py
Enter your name:
Sungchul Choi
Hi Sungchul Choi How are you today?
```

---

print() 함수는 콘솔창으로 문자열을 출력하는 함수입니다.

콤마(,) 사용할 경우 print 문이 연결됩니다.

**예시**

```python
>>> print ("Hello World!", "Hello Again!!!") # , 사용
Hello World! Hello Again!!! # 실행 시 두 문장이 연결 돼서 출력됨
```

---

**온도를 입력받고 실수형으로 출력해보기 **

```python
temperature = float(input("온도를 입력하세요 :")) # 입력 시 바로 형 변환 하기
print(temperature)
```

실행 값

```python
python temperature.py
온도를 입력하세요 : 103
103.0
```

## 조건문과 반복문

**조건문이란 ?**

조건문은 조건을 나타내는 기준과 실행해야 할 명령으로 구성됩니다.
조건의 참,거짓에 따라 실행해야 할 명령이 수행되거나 되지않습니다.

파이썬은 조건문으로 if , else , elif 등의 예약어를 사용합니다.

**if-else문 문법**

```python
if <조건>: # if를 쓰고 조건 삽입 후 “:” 입력
  <수행 명령1-1> # 들여쓰기(indentation)후 수행명령 입력
  <수행 명령1-2> # 같은 조건하에 실행일 경우 들여쓰기 유지
else: # 조건이 불일치할 경우 수행할 명령 block
  <수행명령2-1> #조건불 일치 시 수행할 명령 입력
  <수행 명령2-2> # 조건 불일치 시 수행할 명령 들여쓰기 유지
```

---

**if-else문의 예시**

가장 기본적인 조건문으로 조건에 따른 명령을 실행

```python
print ("Tell me your age?")
myage = int(input()) # 나이를 입력 받아 myage 변수에 할당
if myage < 30: # myage 가 30 미만일 때
    print ("Welcome to the club")
else: # myage 가 30 이상일 때
    print ("Oh! No. You are not accepted.")
```

---

**조건 판단 방법**

if 다음에 조건을 표기하여 참 또는 거짓을 판단 그리고 참/거짓의 구분을 위해서는 비교 연산자를 활용

- x < y : ~보다 작음
- x > y : ~보다 큼
- x == y : 같음
- x != y : 다름

---

**반복문이란 ?**

정해진 동작을 반복적으로 수행하게 하는 명령문 입니다.

다음은 반복문이 쓰여질 수 있는 상황들 입니다.

- 100명의 학생에 성적을 산출할 때, 검색 결과를 출력해 줄 때
- 워드에서 단어 바꾸기 명령 실행
  반복문은 반복 시작 조건, 종료 조건, 수행 명령으로 구성됨 반복문 역시 반복 구문은 들여쓰기와 block으로 구분됨

파이썬은 반복문으로 for, while 등의 명령 키워드를 사용합니다.

---

**for loop**

기본적인 반복문으로서 반복 범위를 지정하여 반복문 안에 구문들을 수행합니다.

**예시**

```python
for i in [1,2,3]
    print('hello)
```

---

**range() 사용하기**

```python
for i in range(0,5)
    print('hello)
```

range(0,5) = [0,1,2,3,4] 와 같은 의미입니다. (End element is exclusive)

---

**반복문 변수명에서의 변수명**

- 임시적인 반복 변수는 대부분 i, j, k로 정함
- 이것은 수학에서 변수를 x, y, z로 정하는 것과 유사한 관례

**0부터 시작하는 반복문**

- 반복문은 대부분 0부터 반복을 시작
- 이것도 일종의 관례로 1부터 시작하는 언어도 존재
- 2진수가 0부터 시작하기 때문에 0부터 시작하는 걸 권장
  무한 loop
- 반복 명령이 끝나지 않는 프로그램 오류
- CPU와 메모리 등 컴퓨터의 리소스를 과다하게 점유

## 스트링 함수

다음은 파이썬에서 문자열을 다룰 때 유용하고 많이 쓰이는 Built In 함수입니다.

`a 는 스트링 입니다. ex) 'hello world'`

- len(a) : 문자열의 문자 개수를 반환 -> 5
- a.count('l') : 문자열 a에 'l'이 들어간 횟수 반환 -> 3
- len(a) : 문자열의 문자 개수를 반환 -> 11
- a.capitalize() : 첫 문자를 대문자로 변환 -> 'Hello world'
- a.find('e') : 문자열 a에 'e'가 들어간 위치(오프셋) 반환 -> 1
- a.startswith('he') : 문자열 a는 'he'로 시작하는 문자열 여부 반환 -> True
- a.split('') : ' '을 기준으로 나눠 리스트로 반환 -> ['hello', 'world']
- a.strip() : 좌우 공백을 없앰
- a.isdigit() : 문자열이 숫자인지 여부 반환 -> False
- a.islower() : 문자열에 대문자가 하나라도 포함되어 있으면 False 그 이외에는 True를 반환 -> 예제의 경우는 True 반환

# 피어세션 정리

오늘은 조원과 만난 두 번째 날이었고, 서로 전날에 공부한 것과 오늘 공부한 것을 얘기하고 궁금한 것을 서로 물어보며 유익한 시간을 가질 수 있었습니다.

오늘은 어제에 비해 강의 영상이 다소 길어졋고, 또한 과제까지 추가 되면서 조원 모두 분주한 기색이 없지 않아 있었던거 같고, 그래서 피어세션 시간에 영상은 어디까지 봤는지, 과제는 어떻게 되가는지에 대해 얘기하는 시간을 가질 수 있었습니다.
오늘은 긴 영상과 더불어 공부한 것을 정리하는 노트와 당일 과제 제출까지 해야하는 바람에 하루 마무리 하는 시간은 약간 늦어질거 같습니다.

피어플랜 계획대로 서로 판다스 비디오를 보면서 각자 진행상황을 확인하는 시간도 가질 수 있었습니다.

# 과제 진행 상황 정리

오늘 부여된 과제는 총 4개이고

- basic math
- text processing
- text processing
- basic baseball

지금 글을 쓰는 시점에서 위에 4가지 과제 전부 완료 하였습니다.

`basic math`에서는 기본적인 수학 연산과 최대, 최소, 평균 그리고 중앙값을 구하는 연산을 연습할 수 있었습니다.
`text processing1, 2`에서는 문자열 함수를 써봄으로서 문자열을 보다 다양하고 손쉽게 다룰 수 있도록 연습할 수 있었으며 이를 응용해 다양한 문제를 풀 수 있었습니다.
`basic baseball`에서는 여러 가지 함수를 조합함으로서 다소 복잡한 구현 문제를 풀 수 있는 과정을 기를 수 있었던 것 같았습니다.

## References

- 파이선 기본문법 - 최성철 교수님
- [Python - wikipedia](https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%EC%8D%AC)
