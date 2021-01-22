---
title: "파이썬 기초문법 4"
excerpt: "부스트캠프 1주차 Day5 강의를 보고 내용을 정리한 노트입니다."
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
  overlay_filter: 0.3 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# Exception/File/Log Handling

파이썬에서의 예외처리, 파일 읽고 쓰는 법 그리고 로그 핸들링에 대해서 알아봅니다.

## Exception

프로그램 실행되고 런타임 상황에서 여러가지 예상치 못한 예외 상황이 생길 수 있습니다.  
예를 들어 배열의 인덱스 범위를 초과해서 접근한다던지, 무한루프에 빠진다던지, 숫자를 0으로 나눈다던지 하는 상황이 있을 수 있습니다.

예외는 크게 두가지로 분류합니다.

1. 예상가능한예외
2. 예상이 불가능한 예외

예상 가능한 예외는 발생여부를 사전에 인지할 수 있는 예외로서 개발자가 명시적으로 정의 할 수 있습니다.  
예상 불가능한 예외는 인터프리터 과정에서 발생하는 예외나 리스트의 범위를 넘어가는 값 호출,정수 0 으로 나눔을 들 수 있습니다.

이러한 예외가 발생할 경우 후속 조치 등 대처가 필요합니다.

이것을 Exception Handling이라 합니다.

**파이썬의 예외 처리**

```python
try:
    예외 발생 가능 코드
except <Exception Type>:
    예외 발생시 대응하는 코드
```

**0으로 숫자를 나눌 때 예외 처리하기**

```python
for i in range(10):
    try:
        print(10 / i)
    except ZeroDivisionError:
        print("Not divided by 0")
```

**try ~ except ~ else**

```python
for i in range(10):
   try:
     result = 10 / i
   except ZeroDivisionError:
     print("Not divided by 0")
   else:
     print(10 / i)
```

**raise 구문 : 필요에 따라 강제로 Exception을 발생**

- `raise <Exception Type>(예외정보)`

```python
while True:
    value = input("변환할 정수 값을 입력해주세요")
    for digit in value:
      if digit not in "0123456789":
        raise ValueError("숫자값을 입력하지 않으셨습니다")
    print("정수값으로 변환된 숫자 -", int(value))
```

## File Handling

파이썬에서는 파일을 불러오기, 쓰기, 읽기, 수정하기 등이 가능합니다.

**파일의 종류**

- 기본적인 파일 종류로 text 파일과 binary 파일로 나눔
- 컴퓨터는 text 파일을 처리하기 위해 binary 파일로 변환시킴 (예: pyc 파일)
- 모든 text 파일도 실제는 binary 파일,

**Binary 파일**

컴퓨터만 이해할 수 있는 형태인 이진(법)형식으로 저장된 파일 (엑셀파일, 워드 파일 등등)

**Text 파일**

인간도 이해할 수 있는 형태인 문자열 형식으로 저장된 파일 (메모장에 저장된 파일, HTML 파일)

### Python File I/O

파이썬은 파일 처리를 위해 “open” 키워드를 사용합니다.

```python
f = open("<파일이름>", "접근 모드")
f.close()
```

- r - 읽기모드 - 파일을 읽기만 할 때 사용
- w - 쓰기모드 - 파일에 내용을 쓸 때 사용
- a - 추가모드 - 파일의 마지막에 새로운 내용을 추가 시킬 때 사용

**파이썬의 File Read**

read() txt 파일 안에 있는 내용을 문자열로 반환

```python
f = open("i_have_a_dream.txt", "r" )
contents = f.read()
print(contents)
f.close()

# or

with open("i_have_a_dream.txt", "r") as my_file:
    contents = my_file.read()
    print (type(contents), contents)
```

**파이썬의 File Write**

mode는 “w”, encoding=“utf8”

```python
f = open("count_log.txt", 'w', encoding="utf8")
for i in range(1, 11):
    data = "%d번째 줄입니다.\n" % i
    f.write(data)
    f.close()
```

## Logging

로그를 남기는 것으로 프로그램이 실행되는 동안 일어나는 정보를 기록하는 것입니다.  
특정 유저의 접근이나, 프로그램의 Exception이 발생할 때 또는 특정 함수의 사용을 로그로 남길 수 있습니다.  
방법은 Console 화면에 출력, 파일에 남기기, DB에 남기기 등등이 있습니다.

기록을 print로 남기는 것도 가능은 하나 Console 창에만 남기는 기록은 분석시 사용이 불가하다는 단점이 있습니다.
따라서 모듈별로 별도의 logging을 남겨 따로 파일에 저장해 기록을 유지할 필요가 있습니다.

이러한 기능을 체계적으로 지원하는 모듈이 Logging 모듈입니다.

**Logging 모듈**은 Python의 기본 Log 관리 모듈입니다.

```python
import logging
logging.debug("틀렸잖아!")
logging.info("확인해")
logging.warning("조심해!")
logging.error("에러났어!!!")
logging.critical ("망했다...")
```

**logging level**

Log관리 시 가장 기본이 되는 설정 정보로서, 프로그램 진행 상황에 따라 다른 Level의 Log를 출력할 수 있게 합니다.
DEBUG > INFO > WARNING > ERROR > Critical

- debug : 개발시 처리 기록을 남겨야하는 로그 정보를 남김
- info : 처리가 진행되는 동안의 정보를 알림
- warning : 사용자가 잘못 입력한 정보나 처리는 가능하나 원래 개 발시 의도치 않는 정보가 들어왔을 때 알림
- error : 잘못된 처리로 인해 에러가 났으나, 프로그램은 동작할 수 있음을 알림
- critical : 잘못된 처리로 데이터 손실이나 더이상 프로그램이 동 작할 수 없음을 알림

# Python data handling

데이터는 여러 형태로 저장이 될 수 있습니다.  
csv, html, xml json 등..  
오늘은 여기서 csv와 json 데이터 형식을 다루는 방법을 알아봅니다.

## Comma Separate Value

CSV, 필드를 쉼표(,)로 구분한 텍스트 파일입니다.  
엑셀 양식의 데이터를 프로그램에 상관없이 쓰기 위한 데이터 형식이라고 생각하면 쉽습니다.  
탭(TSV), 빈칸(SSV) 등으로 구분해서 만들기도 합니다.

CSV 파일 예시 )

```python
학번,이름,성별,나이,사는곳
01,권아름,여자,23,서울
23,서아인,여자,21,부산
35,박희원,남자,23,인천
```

**다음은 CSV 파일 읽기 예제입니다**

```python
line_counter = 0 #파일의 총 줄수를 세는 변수
data_header = [] #data의 필드값을 저장하는
customer_list = [] #cutomer 개별 List를 저장하는 List

with open ("customers.csv") as customer_data: #customer.csv 파일을 customer_data 객체에 저장

while True:
    data = customer_data.readline() #customer.csv에 한줄씩 data 변수에 저장
    if not data: break #데이터가 없을 때, Loop 종료
    if line_counter==0: #첫번째 데이터는 데이터의 필드
        data_header = data.split(",") #데이터의 필드는 data_header List에 저장, 데이터 저장시 “,”로 분리
    else:
        customer_list.append(data.split(",")) #일반 데이터는 customer_list 객체에 저장, 데이터 저장시 “,”로 분리
    line_counter += 1

print("Header :\t", data_header) #데이터 필드 값 출력
for i in range(0,10): #데이터 출력 (샘플 10개만)
  print ("Data",i,":\t\t",customer_list[i])
print (len(customer_list)) #전체 데이터 크기 출력
```

**CSV 객체로 CSV 처리**

위에서 보았듯이, Text 파일 형태로 데이터 처리 시 문장 내에 들어가 있는 “,” 등에 대해 전처리 과정이 필요한데요, 파이썬에서는 간단히 CSV파일을 처리하기 위해 csv 객체를 제공합니다.

**CSV 객체 활용**

- delimiter: 글자를 나누는 기준
- quotechar: 문자열을 둘러싸는 신호 문자
- quoting: 데이터 나누는 기준이 quotechar에 의해 둘러싸인 레벨

```python
import csv
reader = csv.reader(f,
          delimiter=',', quotechar='"',
          quoting=csv.QUOTE_ALL)
```

## JSON

JavaScript Object Notation이라고 하며, 웹의 동적성을 표현하는데 쓰이는 언어인 Java Script의 데이터 객체 표현 방식입니다.  
주로 서버와 클라이언트 사이에서 http 통신을 하며 데이터를 주고 받는 데, 그 때 들어가는 패싱 데이터로 많이 쓰입니다.  
간결성으로 기계/인간이 모두 이해하기 편합니다.

JSON은 key:value 쌍으로 표현이 됩니다.

```java script
{"employees":[
    {"firstName":"John",
    "lastName":"Doe"
    },
    {"firstName":"Anna",
    "lastName":"Smith"
    },
    {"firstName":"Peter",
    "lastName":"Jones"
    }
]}
```

**JSON Read**

파이썬에서는 JSON을 불러와 읽고, 처리할 수 있습니다.  
JSON 파일의 구조를 확인 후 읽고, Dict Type 처럼 처리하면 됩니다.

1. json을 처리할 수 있는 모듈을 임포트 합니다.
2. with open으로 파일을 엽니다.
3. 파일을 읽어 이를 contens에 넣습니다.
4. 모듈을 이용해 json파일을 파이선에서 쓸 수 있도록 dict type으로 로드합니다.
5. 이제 json_data를 dict처럼 쓸 수 있습니다.

```python
# json_example.json

{"employees":[
    {"firstName":"John",
    "lastName":"Doe"
    },
    {"firstName":"Anna",
    "lastName":"Smith"
    },
    {"firstName":"Peter",
    "lastName":"Jones"
    }
]}

#######

import json

with open("json_example.json", "r", encoding="utf8") as f:
    contents = f.read()
    json_data = json.loads(contents)
    print(json_data["employees"])
```

**JSON Write**

위와 비슷하게 사전에 dict를 정의하고, 이를 json으로 변환하여 처리할 수 있습니다.
Dict Type으로 데이터 저장 후 josn 모듈로 Write

1. json을 처리할 수 있는 모듈을 임포트 합니다.
2. Dict Type으로 데이터를 정의합니다.
3. data.json 파일을 쓰기 모드로 엽니다.
4. json.dump를 이용해 쓰기를 실행합니다.

```python
import json
dict_data = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
with open("data.json", "w") as f:
    json.dump(dict_data, f)
```

# 피어세션 정리

드디어 부스트 캠프 1주차가 마무리 되었습니다.

오늘도 각자 조원이 돌아가며 어제 자신이 했던 공부와 오늘 할 공부 계획을 발표하고, 서로 좋았던 내용이나 참고할 만한 내용이 있다면 그것을 공유하는 시간을 가질 수 있었습니다.

어떤분은 자신이 정리한 노트를 사용해 발표를 하셧고, 어떤분은 공부에 도움이 될만한 좋은 리소스 자료를 공유해 주셧습니다.

저는 일주일 동안 배운 내용 중 약간 애매하거나 혼동이 오는 개념들을 다시 한번 쭉 보면서 이것을 모아 그림판에 스크린샷으로 정리해서 조원들에게 설명을 하는 시간을 가졌었습니다.

확실히, 전날 보다 조금 더 친해진 모습으로 다같이 협동하여 세션을 진행할 수 있음에 기분이 좋았습니다.

그리고 저희 조는 1주일 간격으로 모더레이터를 맡게 되는데, 그래서 다음주를 담당할 모더레이터를 정하는 시간을 가졌었습니다.

## References

- 파이선 - 최성철 교수님
- [Python - wikipedia](https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%EC%8D%AC)
