---
title: "파이썬 기초 문법 2"
excerpt: "부스트캠프 1주차 Day3 강의를 보고 내용을 정리한 노트입니다."
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
  overlay_filter: 0.2 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# 파이썬에서의 자료구조와 Pythonic Code

자료를 보다 효율적으로 구성하고 사용을 용이하게 해주는 파이썬에서의 자료구조와 파이썬의 문법적 특징을 잘 살린 pythonic code에 대해서 알아봅니다.

## 파이썬에서의 자료구조

자료구조는 어떤 데이터를 저장할 때, 그 데이터에 특징에 따라 컴퓨터에 효율적으로 정리하기 위한 데이터의 저장 및 표현 방식을 이야기합니다. 어떤 데이터는 순서가 있다거나, 그 데이터의 나타내는 ID 값과 쌍을 이룬다던가 하는 등의 특징이 나타나게 됩니다. 일반적으로 사용되는 정수, 문자열등의 변수 타입보다는 이러한 특징들에 잘 맞는 형태로 데이터를 저장하게 된다면 훨씬 효율적으로 컴퓨터의 메모리를 사용하고, 프로그래머가 코드를 작성하기에도 용이하게 해줍니다

### 스택과 큐

#### 스택

- 나중에 넣은 데이터를 먼저 반환하도록 설계된 메모리 구조
- Last In First Out (LIFO)
- Data의 입력을 Push, 출력을 Pop이라고 함
- 리스트를 사용하여 스택 구조를 구현 가능
- push를 append(), pop을 pop()를 사용

```python
>>> a = [1,2,3,4,5]
>>> a.append(10)
>>> a.append(20)
>>> a.pop()
20
>>> a.pop()
10
>>>
```

---

#### 큐

- 먼저 넣은 데이터를 먼저 반환하도록 설계된 메모리 구조
- First In First Out (FIFO)
- Stack과 반대되는 개념
- 파이썬은 리스트를 사용하여 큐 구조를 활용
- put를 append(), get을 pop(0)를 사용

```python
>>> a = [1,2,3,4,5]
>>> a.append(10)
>>> a.append(20)
>>> a.pop(0) # 1 출력
1
>>> a.pop(0) # 2 출력
2
>>>
```

---

### 튜플

- 값의 변경이 불가능한 리스트
- 선언시“[]”가 아닌 “() ”를사용
- 리스트의 연산, 인덱싱, 슬라이싱 등을 동일하게 사용

```python
>>> t = (1,2,3)
>>> print (t + t , t * 2) # (1, 2, 3, 1, 2, 3) (1, 2, 3, 1, 2, 3)
(1, 2, 3, 1, 2, 3) (1, 2, 3, 1, 2, 3)
>>> len(t) # 3
3
>>> t[1] = 5 # Error 발생
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>>
```

---

```python
>>> t = (1) # 일반 정수로 인식
1
>>>t = (1, ) #값이 하나인 Tuple은 반드시 ","를붙여야함
(1,)
```

**왜 쓸까요 ?**

- 프로그램을 작동하는 동안 변경되지 않은 데이터의 저장 Ex) 학번, 이름, 우편번호 등등
- 함수의 반환 값등 사용자의 실수에 의한 에러를 사전에 방지

### set

- 값을 순서없이 저장, 중복 불허 하는 자료형
- set 객체 선언을 이용하여 객체 생성

```python
# set 함수를 사용 1,2,3을 집합 객체 생성 , a = {1,2,3,4,5} 도 가능
>>> s = set([1,2,3,1,2,3]) >>> s
{1, 2, 3}
>>> s.add(1)
>>> s
# 한 원소 1만 추가, 추가, 중복불허로 추가 되지 않음
{1, 2, 3}
# 1 삭제
>>> s.remove(1)
>>> s
{2, 3}
# [1,4,5,6,7] 추가
>>> s.update([1,4,5,6,7]) >>> s
{1, 2, 3, 4, 5, 6, 7}
# 3 삭제
>>> s.discard(3)
>>> s
{1, 2, 4, 5, 6, 7}
# 모든 원소 삭제
>>> s.clear()
```

- 수학에서 활용하는 다양한 집합연산 가능

```python
>>> s1 = set([1,2,3,4,5])
>>> s2 = set([3,4,5,6,7])
>>> s1.union(s2)
>>> s1 | s2
{1, 2, 3, 4, 5, 6, 7}
>>> s1.intersection(s2)
{3, 4, 5}
>>> s1 & s2
{3, 4, 5}
>>> s1.difference(s2)
{1, 2}
>>> s1 - s2
{1, 2}
```

### dict

- Key 값을 활용하여, 데이터 값(Value)를 관리함
- key와 value를 매칭하여 key로 value를 검색
- 다른 언어에서는 Hash Table 이라는 용어를 사용
- {Key1:Value1, Key2:Value2, Key3:Value3 ...} 형태

**사전 (dictionary) 다루기**

```python
>>> country_code = {} # Dict 생성, country_code = dict() 도 가능
>>> country_code = {"America": 1, "Korea": 82, "China": 86, "Japan": 81}
>>> country_code
{'America': 1, 'China': 86, 'Korea': 82, 'Japan': 81}
>>> country_code.items() # Dict 데이터 출력
Dict_items([('America', 1), ('China', 86), ('Korea', 82), ('Japan', 81)])
>>> country_code.keys() # Dict 키 값만 출력
Dict_keys(["America", "China", "Korea", "Japan"])
>>> country_code["German"]= 49 # Dict 추가
>>> country_code
{'America': 1, 'German': 49, 'China': 86, 'Korea': 82, 'Japan': 81}
>>> country_code.values() # Dict Value만 출력
dict_values([1, 49, 86, 82, 81])

# - - - - - - - - - - - - - - -

>>> for k,v in country_code.items():
... print ("Key : ", k)
... print ("Value : ", v) ...
Key : America
Value : 1
Key : Gernman
Value : 49
Key : China
Value : 86
Key : Korea
Value : 82
Key : Japan
Value : 81
>>> "Korea" in country_code.keys() # Key값에 "Korea"가 있는지 확인 True
>>> 82 in country_code.values() # Value값에 82가 있는지 확인 True
```

### collections

- List, Tuple, Dict에 대한 Python Built-in 확장 자료 구조(모듈)
- 편의성, 실행 효율 등을 사용자에게 제공함

아래의 모듈이 존재합니다.

```python
   from collections import deque
   from collections import Counter
   from collections import OrderedDict
   from collections import defaultdict
   from collections import namedtuple
```

#### deque

- Stack과 Queue 를 지원하는 모듈
- List에 비해 효율적인=빠른 자료 저장 방식을 지원함
- rotate, reverse등 Linked List의 특성을 지원함
- 기존 list 형태의 함수를 모두 지원함

```python
from collections import deque
deque_list = deque()
for i in range(5):
    deque_list.append(i)
print(deque_list)
deque_list.appendleft(10)
print(deque_list)
```

- rotate, reverse등 Linked List의 특성을 지원함
- 기존 list 형태의 함수를 모두 지원함

```python
deque_list.rotate(2)
print(deque_list)
deque_list.rotate(2)
print(deque_list)
print(deque(reversed(deque_list)))
deque_list.extend([5, 6, 7])
print(deque_list)
deque_list.extendleft([5, 6, 7])
print(deque_list)
```

- deque는 기존 list보다 효율적인 자료구조를 제공
- 효율적 메모리 구조로 처리 속도 향상

#### OrderedDict

- Dict와 달리, 데이터를 입력한 순서대로 dict를 반환함
- 그러나 dict도 python 3.6 부터 입력한 순서를 보장하여 출력함

```python
from collections import OrderedDict
d = OrderedDict()
d['x'] = 100
d['y'] = 200
d['z'] = 300
d['l'] = 500

# x - y - z- l 의 입력한 대로 순서를 보장
```

- Dict type의 값을, value 또는 key 값으로 정렬할 때 사용 가능

```python
for k, v in OrderedDict(sorted(d.items(), key=lambda t: t[0])).items():   print(k, v)
for k, v in OrderedDict(sorted(d.items(), key=lambda t: t[1])).items():   print(k, v)
```

#### defaultdict

```python
from collections import defaultdict
d = defaultdict(object) # Default dictionary를 생성
d = defaultdict(lambda: 0) # Default 값을 0으로 설정합 print(d["first"])
```

## 파이썬 스타일 코드 - Pythonic Code

- 파이썬 스타일의 코딩 기법
- 파이썬 특유의 문법을 활용하여 효율적으로 코드를 표현함
- 그러나 더 이상 파이썬 특유는 아님, 많은 언어들이 서로의 장점을 채용
- 고급 코드를 작성 할 수록 더 많이 필요해짐

```python
>>> colors = ['red', 'blue', 'green', 'yellow']
>>> result = ''
>>> for s in colors:
      result += s

# - - - - - - - - -
>>> colors = ['red', 'blue', 'green', 'yellow']
>>> result = ''.join(colors)
>>> result
# 'redbluegreenyellow'
```

**Why Pythonic Code?**

- 다른 코드에 대한 이해도가 올라간다.
- 많은 개발자들이 python 스타일로 코딩한다
- 단순 for loop append보다 list가 조금 더 빠르다 익숙해지면 코드도 짧아진다.

### split & join

**split**

- string type의 값을 “기준값”으로 나눠서 List 형태로 변환

```python
>>> items = 'zero one two three'.split() # 빈칸을 기준으로 문자열 나누기
>>> print (items)
['zero', 'one', 'two', 'three']
>>> example = 'python,java,javascript' # ","을 기준으로 문자열 나누기
>>> example.split(",")
['python', ‘java', 'javascript']
>>> a, b, c = example.split(",")
# 리스트에 있는 각 값을 a,b,c 변수로 unpacking
>>> example = ‘teamlab.technology.io'
>>> subdomain, domain, tld = example.split('.')
# "."을 기준으로 문자열 나누기 → Unpacking
```

---

**join**

- String으로 구성된 list를 합쳐 하나의 string으로 반환

```python
>>> colors = ['red', 'blue', 'green', 'yellow']
>>> result = ''.join(colors)
>>> result
'redbluegreenyellow'
>>> result = ' '.join(colors) # 연결 시 빈칸 1칸으로 연결
>>> result
'red blue green yellow'
>>> result = ', '.join(colors) # 연결 시 ", "으로 연결
>>> result
'red, blue, green, yellow'
>>> result = '-'.join(colors) # 연결 시 "-"으로 연결
>>> result
'red-blue-green-yellow'
```

### list comprehension

- 기존 List 사용하여 간단히 다른 List를 만드는 기법
- 포괄적인 List, 포함되는 리스트라는 의미로 사용됨
- 파이썬에서 가장 많이 사용되는 기법 중 하나
- 일반적으로 for + append 보다 속도가 빠름

```python
# ex1)
>>> result = [i for i in range(10)]
>>> result
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> result = [i for i in range(10) if i % 2 == 0]
>>> result
[0, 2, 4, 6, 8]

# ---
# ex2)
>>> word_1 = "Hello"
>>> word_2 = "World"
>>> result = [i+j for i in word_1 for j in word_2]
    # Nested For loop
>>> result
['HW', 'Ho', 'Hr', 'Hl', 'Hd', 'eW', 'eo', 'er',
'el', 'ed', 'lW', 'lo', 'lr', 'll', 'ld', 'lW',
'lo', 'lr', 'll', 'ld', 'oW', 'oo', 'or', 'ol', 'od']

# ex3)
>>> case_1 = ["A","B","C"]
>>> case_2 = ["D","E","A"]
>>> result = [i+j for i in case_1 for j in case_2]
>>> result
['AD', 'AE', 'AA', 'BD', 'BE', 'BA', 'CD', 'CE', 'CA']
>>> result = [i+j for i in case_1 for j in case_2 if not(i==j)]
# Filter: i랑 j과 같다면 List에 추가하지 않음
# [i+j if not(i==j) else i for i in case_1 for j in case_2]
>>> result
['AD', 'AE', 'BD', 'BE', 'BA', 'CD', 'CE', 'CA']
>>> result.sort()
>>> result
['AD', 'AE', 'BA', 'BD', 'BE', 'CA', 'CD', 'CE']

# ex4)
>>> words = 'The quick brown fox jumps over the lazy dog'.split()
# 문장을 빈칸 기준으로 나눠 list로 변환
>>> print (words)
['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']
>>>
>>> stuff = [[w.upper(), w.lower(), len(w)] for w in words]
# list의 각 elemente들을 대문자, 소문자, 길이로 변 환하여 two dimensional list로 변환

>>> for i in stuff:
    print (i)

# 출력 값들
['THE', 'the', 3] ['QUICK', 'quick', 5] ['BROWN', 'brown', 5] ['FOX', 'fox', 3] ['JUMPS', 'jumps', 5] ['OVER', 'over', 4] ['THE', 'the', 3] ['LAZY', 'lazy', 4] ['DOG', 'dog', 3]
```

### enumerate & zip

- enumerate : list의 element를 추출할 때 번호를 붙여서 추출

```python
>>> for i, v in enumerate(['tic', 'tac', 'toe']):
# list의 있는 index와 값을 unpacking
... print (i, v)
...
0 tic
1 tac
2 toe
>>> mylist = ['a', 'b', 'c', 'd']
>>> list(enumerate(mylist)) # list의 있는 index와 값을 unpacking하여 list로 저장
[(0, 'a'), (1, 'b'), (2, 'c'), (3, 'd')]
>>> {i:j for i,j in enumerate('Artificial intelligence (AI), is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals.'.split())}
# 문장을 list로 만들고 list의 index와 값을 unpacking하여 dict로 저장
{0: 'Artificial', 1: 'intelligence', 2: '(AI),', 3: 'is', 4: 'intelligence', 5: 'demonstrated', 6: 'by', 7: 'machines,', 8: 'unlike', 9: 'the', 10: 'natural', 11: 'intelligence', 12: 'displayed', 13: 'by', 14: 'humans', 15: 'and', 16: 'animals.'}
```

---

- zip : 두 개의 list의 값을 병렬적으로 추출함

```python
>>> alist = ['a1', 'a2', 'a3']
>>> blist = ['b1', 'b2', 'b3']
>>> for a, b in zip(alist, blist): # 병렬적으로 값을 추출
... print (a,b) ...
a1 b1
a2 b2
a3 b3
>>> a,b,c =zip((1,2,3),(10,20,30),(100,200,300)) #각 tuple의 같은 index 끼리 묶음 (1, 10, 100) (2, 20, 200) (3, 30, 300)
>>> [sum(x) for x in zip((1,2,3), (10,20,30), (100,200,300))] # 각 Tuple 같은 index를 묶어 합을 list로 변환
[111, 222, 333]
```

---

- enumerate & zip 동시 사용 용례

```python
>>> alist = ['a1', 'a2', 'a3']
>>> blist = ['b1', 'b2', 'b3'] >>>
>>> for i, (a, b) in enumerate(zip(alist, blist)):
...
...
0 a1 b1
1 a2 b2
2 a3 b3
print (i, a, b) # index alist[index] blist[index] 표시
```

### iterable object

- Sequence형 자료형에서 데이터를 순서대로 추출하는 object

```python
for city in ["Seoul", "Busan", "Pohang"]:
  print(city, end="\t")
for language in ("Python", "C", "Java"):
  print(language, end="\t")
for char in "Python is easy":
  print(char, end = " ")
```

---

**Characteristics**

- 내부적 구현으로 **iter** 와 **next** 가 사용됨
- iter() 와 next() 함수로 iterable 객체를 iterator object로 사용

```python
cities = ["Seoul", "Busan", "Jeju"]
iter_obj = iter(cities)
print(next(iter_obj))
print(next(iter_obj))
print(next(iter_obj))
next(iter_obj)
```

### generator

- iterable object를 특수한 형태로 사용해주는 함수
- element가 사용되는 시점에 값을 메모리에 반환
  : yield를 사용해 한번에 하나의 element만 반환함

```python
def geneartor_list(value):
  result = []
  for i in range(value):
    yield i
```

---

**generator comprehension**

- list comprehension과 유사한 형태로 generator 형태의 list 생성
- generator expression 이라는 이름으로도 부름
- [] 대신 () 를 사용하여 표현

```python
gen_ex = (n*n for n in range(500))
  print(type(g))
```

- list 타입의 데이터를 반환해주는 함수는 generator로 만들어라!
  : 읽기 쉬운 장점, 중간 과정에서 loop 이 중단될 수 있을 때!
- 큰 데이터를 처리할 때는 generator expression을 고려하라!
  : 데이터가 커도 처리의 어려움이 없음
- 파일 데이터를 처리할 때도 generator를 쓰자

# 피어세션 정리

오늘은 조원과 만난 세 번째 날이었고, 처음으로 김종하 조교님이 피어세션에 자리해 주셔서 너무 좋았습니다.

처음에 조교님께서 먼저 자기소개를 하시고, 뒤이어 피어님들도 한분씩 자기 소개 하는 시간을 가졌습니다.
그리고 바로 조교님께 피어님들이 궁금했던거나 앞으로의 방향에 대해서 여러가지를 질문하셧고, 조교님은 열심히 하나하나 답변해주셧습니다.

남은 시간 30분은 서로 어제 공부한 것을 공유하고, 오늘의 공부 계획을 공유하는 시간을 가질 수 있었습니다.

## References

- 파이선 기본문법 - 최성철 교수님
- [Python - wikipedia](https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%EC%8D%AC)
