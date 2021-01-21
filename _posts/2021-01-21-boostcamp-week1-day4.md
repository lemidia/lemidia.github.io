---
title: "파이썬 기초 문법 3"
excerpt: "부스트캠프 1주차 Day4 강의를 보고 내용을 정리한 노트입니다."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
  - Development

tags:
  - AI
  - Python

last_modified_at: 2021-01-20T18:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo2.jpg
  overlay_filter: 0.3 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# Python Object-Oriented Programming & module and project

파이썬에서의 코드를 객체지향적으로 작성하는 방법을 알아보고, 또한 파이썬의 모듈과 패키지를 알아봅니다.

## 파이썬에서의 객체지향 프로그래밍

Object-Oriented Programming, OOP 라고도 하며 실생활에서 존재하는 존재나 물건을 코드에서의 객체로 표현하는 방법입니다. OOP에서 이러한 객체 개념은 속성의 변수(variable), 행동은 함수(method)로 표현됩니다.

- 객체: 실생활에서 일종의 물건. 속성(Attribute)와 행동(Action)을 가짐

클래스는 객체를 설계하는 청사진과도 같다고 볼 수 있습니다. 또는 붕어빵틀.

다음은 축구 선수 정보를 Class로 구현한 것입니다.

```python
class SoccerPlayer(object):
    def __init__(self, name, position, back_number):
        self.name = name
        self.position = position self.back_number = back_number
    def change_back_number(self, new_number):
        print("선수의 등번호를 변경합니다 : From %d to %d" % (self.back_number, new_number)) self.back_number = new_number
```

`class SoccerPlayer(object):`에서 맨 앞 키워드는 클래스를 정의하는 예약어, 그 다음은 클래스명, 그다음은 상속받는 객체명입니다.
`__init__은 객체 초기화 예약 함수`는 객체 초기화 예약 함수입니다.

**파이썬에서 \_\_ 의미**

예) \_\_는 특수한 예약 함수나 변수 그리고 함수명 변경(맨글링)으로 사용합니다.

```python
class SoccerPlayer(object):
    def __str__(self):
          return "Hello, My name is %s. I play in %s in center " % \
        (self.name, self.position)

jinhyun = SoccerPlayer("Jinhyun", "MF", 10)
print(jinhyun)
```

---

`클래스에서 method(Action) 추가는 기존 함수와 같으나, 반드시 self를 추가해야만 class 함수로 인정됩니다.`

Object 이름 선언과 함께 초기값 입력 하는 방법은 다음과 같습니다.
`jinhyun = SoccerPlayer("Jinhyun", "MF", 10)`

---

**상속**

상속은 부모 클래스로 부터 속성과 함수를 물려받은 자식 클래스를 생성 하는 것이라고 말할 수 있습니다.

다음은 Korean 클래스가 Person 클래스를 상속하는 코드입니다.

```python
class Person(object):
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Korean(Person):
    pass

first_korean = Korean("Sungchul", 35)
print(first_korean.name)
```

**polymorphism**

다형성이란 하나의 메소드나 클래스가 있을 때 이것들이 다양한 방법으로 동작할 수 있다는 것을 의미합니다.  
객체 선언시 여러개의 부모 객체가 각기 다른 자식 클래스 종류의 인스턴스를 가지고 있음으로 표현할 수 있습니다.

다른 언어에서는 메소드 오버로딩 이라고 해서 클래스 내에 함수명이 같고 패러메터의 갯수나 타입이 다른것을 의미하는 것이 있습니다. 여기서 메소드를 부를 때 같은 함수 호출 명이 같더라도 패러메터 갯수나 타입을 다르게 해서 호출을 하면 특정 조건에 맞는 함수가 호출이 되는데 이 때 이것을 다형성이라고 할 수 있습니다.

**Encapsulation**

캡슐화라고 하며 객체의 속성(data fields)과 행위(메서드, methods)를 하나로 묶고, 실제 구현 내용 일부를 외부에 감추어 은닉하는 방법론 입니다.

**Inner function**

파이썬에서는 함수 내에 또 다른 함수를 선언하여 사용할 수 있습니다.

다음은 Inner function의 한 예 입니다.

먼저 맨 바깥 함수를 호출하면 print_msg 함수는 안에 있는 printer 함수를 호출합니다.  
이 때, 안에 있는 함수는 바깥에 있는 매개변수를 참조하여 사용할 수 있습니다.

```python
def print_msg(msg):
    def printer():
        print(msg)
    printer()

print_msg("Hello, Python")
```

**closures**

클로저는 위에서 봐던 inner function을 return값으로 반환하는 개념입니다.  
another는 inner function를 참조하게 되고, another() 하면 printer()함수가 실행됩니다.

```python
def print_msg(msg):
    def printer():
      print(msg)
    return printer
another = print_msg("Hello, Python")
another()
```

## Module and Project

모듈은 파이썬 정의와 문장들을 담고 있는 파일입니다. 파일의 이름은 모듈 이름에 확장자 .py 를 붙입니다.  
프로그램에서는 작은 프로그램 조각들을 모듈이라고 할 수 있고,이 모듈들을 모아서 하나의 큰 프로그램을 개발합니다.

예를 들어 )

파이썬에서는 Built-in Module 중 하나인 난수를 생성할 수 있는 Random 모듈이 있습니다.
코드에서 랜덤한 값이 필요할 때, 이러한 랜덤 모듈을 레고 블럭 처럼 가져다가 쓸 수 있습니다.

모듈을 가져가 쓸 때는 import 문을 사용해서 module을 호출할 수 있습니다.

```python
import random
print (random.randint (0,100)) # 0~100사이의 정수 난수를 생성
print (random.random()) # 일반적인 난수 생성
```

사용자가 정의한 모듈을 쓰는 예를 보겠습니다.

fah_converter.py 모듈입니다.

```python
def covert_c_to_f(celcius_value):
    return celcius_value \* 9.0 / 5 + 32
```

그 다음은 module_ex.py 모듈입니다.

```python
import fah_converter

print ("Enter a celsius value: "),
celsius = float(input())
fahrenheit = fah_converter.covert_c_to_f(celsius)
print ("That's ", fahrenheit, " degrees Fahrenheit")
```

이 프로그램은 사용자로 부터 온도 값을 입력받고 섭씨를 화씨로 변환하는 프로그램입니다.  
위에서 보듯이 두개의 .py 파일은 서로 다른 두개의 모듈이라고 볼 수 있습니다.  
module_ex.py에서는 섭씨를 화씨로 변환하는 함수를 쓰기 위해 먼저 `import fah_converter`라고 함으로써 fah_converter.py 모듈을 부릅니다. 그리고 `fah_converter.covert_c_to_f(celsius)` 모듈명 + . + 쓸 함수명 함으로써 그 기능을 이용하고 있습니다.

---

**패키지**

패키지는 하나의 대형 프로젝트를 만드는 코드의 묶음이라고 볼 수 있습니다.  
패키지는 모듈을 담을 수 있고, 또 다른 패키지를 담을 수 있습니다.

Package 내에서 다른 폴더의 모듈을 부를 때는 절대 호출과 상대호출 방법이 있습니다.

절대 참조는 루트 디렉터리 부터 타켓이 되는 모듈이나 패키지까지 경로를 적는 방법을 말합니다.  
상대 참조는 현재 디렉토리 기준으로 타켓이 되는 모듈이나 패키지까지 경로를 적는 방법을 말합니다.

- 절대 참조로 호출하는 방법(루트 디렉터리 ) : from game.graphic.render import render_test()
- 상대 참조로 호출하는 방법(현재 디렉터리는 graphic) : from .render import render_test()
- 상대 참조로 부모 디렉터리로 갔다가 형재 노드의 패키지로 가는 법 : from ..sound.echo import echo_test()

**가상환경**

프로젝트 진행 시 필요한 패키지만 설치하는 환경이라고 볼 수 있습니다.  
가상환경에는 기본적으로 필요한 인터프리터가 있고, 프로젝트 목적에 따라 각각 필요한 패키지를 설치하여 운용할 수 있습니다.  
가상환경은 다양한 패키지 관리 도구를 가지고 있고 사용하고 있습니다.

대표적인 도구 virtualenv와 conda가 있습니다.

- virtualenv + pip : 가장 대표적인 가상환경 관리 도구, 레퍼런스 + 패키지 개수
- conda : 상용 가상환경도구 miniconda 기본 도구, 설치의 용이성

conda 가상환경을 만들고 사용하는 방법은 다음과 같습니다.

터미널에서 `conda create -n my_project python=3.8` 를 입력하면 됩니다.  
그리고 `conda activate my_project`를 호출하면 가상환경을 쓸 수 있게 됩니다.

해제할 때는 `conda deactivate`를 해주면 됩니다.

필요한 패키지를 설치할 때는 `conda install <패키지명>`를 쓸 수 있습니다.

# 피어세션 정리

오늘은 조원과 만난 네 번째 날이었고, 서로 인사하며 각자 어제 자기가 공부한 내용이라든지 궁금했던 내용을 서로 발표하며 유익한 세션 시간을 가질 수 있었습니다.

삼일이 지나고 나니 서로 좀 더 친해지고 알아가게 되어서 그런지, 전날 보다 조원들 간의 사이가 좀 더 화목하게 되고, 한 마디에 한 번 웃었다면 이번엔 두 번 웃는 그런 사이가 되어 가는거 같아 좋았습니다.

# 과제 진행 상황 정리

오늘은 강의도 그렇게 길지 않았고, 둘째 날에 비교해 과제의 개수가 줄어 시간 상 정리 노트를 쓰기 전에 과제를 해결할 수 있었습니다.  
이번 과제도 유익한 시뮬레이션/구현 문제가 주어졌고 애매했던 스트링함수 개념을 한 번 더 연습해보고 문제에 접목해 볼 수 있는 좋은 기회였습니다.  
문제 조건에 특수문자와 공백 처리를 해야하는 약간의 까다로움이 있었지만, 이때까지 공부한 내용을 바탕으로 잘 해결해 풀 수 있었습니다.

## References

- 파이선 기본문법 3- 최성철 교수님
- [Python - wikipedia](https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%EC%8D%AC)
