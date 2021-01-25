---
title: "Numpy / 벡터 / 행렬"
excerpt: "부스트캠프 2주차 Day6 강의를 보고 내용을 정리한 노트입니다."
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

# Numpy / 벡터 / 행렬

넘파이는 과학계산에서 많이 사용하는 선형대수의 계산식을 파이썬으로 구현할 수 있도록 도와주는 라이브러리입니다.  
모든 데이터 분석과 인공지능 학습에 있어 가장 필수적으로 사용되고 이용되므로 간단한 예제들과 함계 알아봅니다.

벡터는, 딥러닝에서 매우 중요한 선형대수학의 기본 단위가 되고, numpy에서도 굉장히 많이 사용되는 연산이기 때문에 확실하게 알 필요가 있습니다.

행렬은 딥러닝에서 가장 핵심적인 연산이라고 볼 수 있을만큼 중요하고, 자주 사용됩니다.  
행렬이 가지는 기하학적 의미와 머신러닝에서 어떻게 사용되는지 알아봅니다.

## Numpy

넘파이는 과학계산에서 많이 사용하는 선형대수의 계산식을 파이썬으로 구현할 수 있도록 도와주는 라이브러리입니다.

- Numerical Python
- 파이선의 고성능 과학 계산용 패키지
- Matrix와 Vector 와 같은 Array 연산의 사실상의 표준

**특징**

- 일반 리스트에 비해 빠르고 효율적
- 반복문 없이 데이터 배열에 대한 처리 지원
- 선형대수와 관련된 다양한 기능을 제공

### import

넘파이의 호출 방법입니다.  
일반적으로 np라는 별칭을 이용해서 호출합니다. (세계적인 약속 같은 것)

```python
import numpy as np
```

### array creation

```python
test_array = np.array([1, 4, 5, 8], float)
print(test_array)
# array([1., 4., 5., 8.])

넘파이는 np.array라는 함수를 활용해서 배열을 생성합니다.
넘파이에는 하나의 데이터 타입만 배열에 넣을 수 있습니다.
```

### array shape

- shape : array의 크기, 형태 등에 대한 정보

다른 프로그래밍 언어와 같이 다음과 같이 선언하고 특정 값으로 초기화 할 수 있습니다.

```python
arr_shape = np.array([[1,2,3,4],[1,2,3,4]]).shape
print(arr_shape)
# (2,4)
```

- ndim - number of dimension
- size - number of data(element)

### array type

- array의 single element가 가지는 데이터 타입
- 각 element가 차지는 메모리의 크기가 결정됨
- int8, int16, float32, float64, str 등이 있습니다.

### array reshape

- reshape : Array의 shape의 크기를 변경할 수 있습니다. size는 동일.

다음은 2x4의 매트릭스를 1차원의 원소 8개를 가지는 벡터로 변환하는 코드입니다.

```python
arr = np.array([[1,2,3,4],[1,2,3,4]])
np.array(arr).shape
# (2, 4)
np.array(arr).reshape(8,)
# array([1, 2, 3, 4, 1, 2, 3, 4])
np.array(arr).reshape(8,).shape
# (8,)
```

### indexing for numpy array

리스트와 달리 2차원 배열에서 [0, 0]표기법을 제공합니다.  
매트릭스일 경우는 앞은 row, 뒤는 column을 의미합니다.

```python
a = np.array([[1, 2, 3], [4.5, 5, 6]], int)
print(a)
print(a[0,0]) # Two dimensional array representation #1
print(a[0][0]) # Two dimensional array representation #2
a[0,0] = 12 # Matrix 0,0 에 12 할당 print(a)
a[0][0] = 5 # Matrix 0,0 에 12 할당 print(a)
```

리스트와 달리 행과 열 부분을 나워서 슬라이싱이 가능합니다.  
이는 매트릭스의 부분집합을 추출할 때 유용합니다.

```python
a = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], int)
a[:,2:] # 전체 Row의 2열 이상
# array([[3, 4, 5], [8, 9, 10]])
a[1,1:3] # 1 Row의 1열 ~ 2열
# array([7, 8, 9])
a[1:3] # 1 Row ~ 2Row의 전체
# array([6, 7, 8, 9, 10])
```

### arange

array의 범위를 지정하여, 값의 list,fmf 생성하는 명령어 입니다.

```python
np.arange(5) # array([0, 1, 2, 3, 4])
np.arange(1, 5) # array([1, 2, 3, 4])

np.arange(1,5).reshape(2, 2)
# array([[1, 2], [3, 4]])
```

### zeros, ones

0또는, 1로 채워진 ndarray를 생성하는 함수

```python
#zeros :
np.zeros(shape=(5,))
# array([0, 0, 0, 0, 0])
np.zeros(shape=(2,2))
# array([[0, 0],
#        [0, 0]])

#ones :
np.ones(shape=(3,))
# array([1,1,1])
```

### sum / mean / std

ndarray의 element들 간의 합을 구하거나 평균 또는 표준편차를 구하는 기능의 함수입니다.

```python
arr = np.arange(1,5).sum(dtype=np.int)
# 10

test_array np.arange(1, 13).reshape(3, 4)
test_array
# array([[1,2,3,4],
#         5,6,7,8],
#         9,10,11,12)

test_array.mean()
# 6.5

test_array.std()
# 3.4520525295346629
```

이 외에도 다양한 수학 연산자 함수를 제공합니다.

ex) exp, log, log10, power, sqrt, sin cos, tan, cosh...

# Dot product

매트릭스의 dot product 계산에 쓰이는 함수입니다.

```python
test_a = np.arange(1, 7).reshape(2, 3)
test_b = np.arange(7, 13).reshape(3, 2)

test_a.dot(test_b)
# array([[58, 64], [139, 154]])
```

# broadcasting

shape이 다른 배열 간 연산을 지원하는 기능입니다.

```python
test_matrix = np.array([[1,2,3],[4,5,6]])
scalar = 3
#덧셈
test_matrix + scalar
# array([[4, 5, 6],
#        [7, 8, 9]])

# 곱셈
test_matrix * scalar
# array([[3, 6, 9],
#        [12, 15, 18]])
```

# All & Any

```python
a = np.arange(10)
a # array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
np.any(a>5), np.any(a<0)
# (True, False)
np.all(a>5), np.any(a<10)
# (False, True)
```

## 벡터

벡터는 숫자를 원소로 가지는 리스트 또는 배열이라고 볼 수 있습니다.

![Alt text](/assets/images/vector-1.png){: width="200px" height="100px" .align-center}

벡터는 공간에서 한점을 나타냅니다.

![Alt text](/assets/images/vector-2.png){: width="200px" height="100px" .align-center}

벡터는 숫자르 원소로 가지는 리스트로서 백터끼리 같은 모양을 가지면 덧셈, 뺄셈, 성분곱이 가능합니다.

![Alt text](/assets/images/vector-3.png){: width="200px" height="100px" .align-center}

### 벡터의 뺄셈

두 벡터의 뺄셈은 다른 벡터로 부터 상대적 위치이동을 표현합니다.  
벡터의 뺄셈은 방향을 뒤집은 덧셈입니다.  
대수적으로 보면 : x = [1 ,2], y = [5, 3] 이란 두개의 벡터가 있을 때 y - x 뺄셈을 하면 -> [4, 1]이 됩니다.

![Alt text](/assets/images/vector-4.png){: width="200px" height="100px" .align-center}

### 백터의 노름

벡터의 노름은 원점에서부터의 거리를 말합니다.

L1 노름과 L2노름이 있습니다.

- L1-노름은 각 성분의 변화량의 절대값을 모두 더합니다.
- L2-노름은 피타고라스 정리를 이용해 유클리드 거리를 계산합니다.

![Alt text](/assets/images/vector-5.png){: width="300px" height="100px" .align-center}

### 두 벡터 사이의 각도 구하기

두 벡터 사이의 거리는 제2 코사인 법칙에 의해 두 벡터 사이의 각도를 계산 가능  
그리고 분자는 더욱 간단히 내적으로 구할 수 있다.

![Alt text](/assets/images/vector-6.png){: width="300px" height="100px" .align-center}

### 내적 해석하기

내적은 정사영된 벡터의 길이와 관련 있다.  
proj(x)의 길이는 코사인 법칙에 의해 x의 노름 x cos(theta)가 된다.  
내적은 정사영의 길이를 벡터 y의 길이 만큼 조정한 값이 된다.

![Alt text](/assets/images/vector-7.png){: width="400px" height="100px" .align-center}

## 행렬

- 행렬(matrix)은 벡터를 원소로 가지는 2차원 배열입니다.
- 행렬은 행(row)과 열(column)이라는 인덱스(index)를 가집니다.
- 행렬의 특정 행(열)을 고정하면 행(열)벡터라 부릅니다.

![Alt text](/assets/images/vector-8.png){: width="400px" height="100px" .align-center}

- 벡터가 공간에서 한 점을 의미한다면 행렬은 여러 점들을 나타냅니다.
- 행렬의 행벡터 xi 는 i 번째 데이터를 의미합니다.
- 행렬의 xij 는 i 번째 데이터의 j 번째 변수의 값을 말합니다.

![Alt text](/assets/images/vector-9.png){: width="400px" height="100px" .align-center}

### 행렬에서의 스칼라곱

- 성분곱은 벡터와 똑같습니다. 스칼라곱도 벡터와 차이가 없습니다.

![Alt text](/assets/images/vector-10.png){: width="400px" height="100px" .align-center}

### 행렬에서의 곱셈

행렬 곱셈은 i번째 행벡터와 j번째 열벡터 사이의 내적을 성분으로 가지는 행렬을 계산합니다.

![Alt text](/assets/images/vector-11.png){: width="400px" height="100px" .align-center}

### 역행렬 이해하기

- 어떤 행렬 A 의 연산을 거꾸로 되돌리는 행렬을 역행렬(inverse matrix)이 라 부르고 A−1 라 표기한다.  
  역행렬은 행과 열 숫자가 같고 행렬식(determinant)이 0이 아닌 경우에만 계산할 수 있다. (ad-bc != 0)

![Alt text](/assets/images/vector-12.png){: width="400px" height="100px" .align-center}

- 만일 역행렬을 계산할 수 없다면 유사역행렬(pseudo-inverse) 또는 무어-펜로즈(Moore-Penrose) 역행렬 A+ 을 이용한다.

![Alt text](/assets/images/vector-12.png){: width="400px" height="100px" .align-center}

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
