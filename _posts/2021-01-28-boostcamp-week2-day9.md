---
title: "Pandas / 기초 확률론"
excerpt: "부스트캠프 2주차 Day9 강의를 보고 내용을 정리한 노트입니다."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
  - Development

tags:
  - AI
  - Python

last_modified_at: 2021-01-26T08:06:00-05:00

header:
  overlay_image: /assets/images/headerIMG.jpg
  overlay_filter: 0.2 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# 판다스 / 역전파 알고리즘

판다스는 구조화된 데이터의 처리를 지원하는 Python 라이브러리입니다.  
고성능 array 계산 라이브러리인 numpy와 통합하여, 강력한 “스프레드시트” 처리 기능을 제공하므로 Data science 분야에서 널리 쓰이는 판다스를 알아봅니다.

저번 포스팅에 이어, pandas 라이브러리 기능에 대해 알아봅니다.

---

기계학습 문제 대부분은 학습 단계에서 최적의 매개변수를 찾아야 합니다. 최적의 매개변수란 손실 함수가 최솟값이 될 때의 매개변수 값 입니다.

그런데 딥러닝에서는 여러 뉴런들이 여러 층을 형성하여 구성이 될 수 있고, 끝 출력층의 매개변수 뿐만 아니고 뒤의 각 층에 할당된 매개변수가 업데이트 되어야 올바른 학습이 될 수 있는데, 이 각각의 매개변수들을 학습시키는 것이 역전파법 이라고 할 수 있습니다.

## pandas - groupby

특정 조건에 맞는 데이터들을 묶을 수 있는 기능입니다.

- SQL groupby 명령어와 같음
- split -> apply -> combine 과정을 거쳐 연산함

![Alt text](/assets/images/pandas2&probability_basic-1.png){: width="600px" .align-center}

그룹바이 함수에는 **묶음의 기준이 되는 컬럼이 들어가고** 뒤에 적용하고자 하는 연산에 해당되는 컬럼을 입력합니다.

결과는 팀을 기준을 한 point들을 모두 합한 시리즈가 출력이 됩니다.

---

아래 그림 처럼 한 개 이상의 column을 묶을 수도 있습니다.

![Alt text](/assets/images/pandas2&probability_basic-2.png){: width="600px" .align-center}

### Hierarchical index

- Groupby 명령의 결과물은 dataframe 입니다.
- 두 개의 column으로 groupby를 할 경우, index가 두개 생성됩니다.
- 아래의 그림에서는 'Team'과 'Year'의 인덱스가 생성된 모습입니다.

![Alt text](/assets/images/pandas2&probability_basic-3.png){: width="600px" .align-center}

### Hierarchical index – unstack()

Group으로 묶여진 데이터를 matrix 형태로 전환해주는 기능입니다.

![Alt text](/assets/images/pandas2&probability_basic-4.png){: width="600px" .align-center}

### Hierarchical index – operations

Index level을 기준으로 주어진 기본 연산이 수행 됩니다.

밑의 그림에서 level 0은 Team이고, level2는 Year 입니다.

![Alt text](/assets/images/pandas2&probability_basic-5.png){: width="600px" .align-center}

### Groupby – gropued

Groupby에 의해 Split된 상태를 추출 가능합니다.

Tuple 형태로 그룹의 key 값 Value값이 추출됩니다.

![Alt text](/assets/images/pandas2&probability_basic-6.png){: width="600px" .align-center}

---

특정 key값을 가진 그룹의 정보만 추출도 가능합니다.

![Alt text](/assets/images/pandas2&probability_basic-7.png){: width="600px" .align-center}

### Groupby – aggregation

추출된 group 정보에 Aggregation이라는 요약된 통계정보를 추출해 줄 수 있는 기능을 적용할 수 있습니다.

![Alt text](/assets/images/pandas2&probability_basic-8.png){: width="600px" .align-center}

---

특정 컬럼에 여러개의 function을 Apply 할 수 도 있습니다.

![Alt text](/assets/images/pandas2&probability_basic-9.png){: width="600px" .align-center}

### Groupby – transformation

Transformation은 Aggregation과 달리 key값 별로 요약된 정보가 아니고 개별 데이터의 변환을 지원합니다.

![Alt text](/assets/images/pandas2&probability_basic-10.png){: width="600px" .align-center}

전체 그룹에서 칼럼 별로 가장 큰 값을 뽑아서, 그 값으로 전체 각각의 그룹의 칼럼 별 데이터를 갱신합니다.

### Merge & Concat

Merge는 SQL에서 많이 사용하는 Merge와 같은 기능으로써, 두개의 데이터를 하나로 합치는 기능입니다.

같은 칼럼 네임을 갖고 있는 데이터 프레임이 두개가 있고, 'subject_id'의 같은 칼럼 값으로 merge를 하면 다음 그림과 같이 됩니다.

![Alt text](/assets/images/pandas2&probability_basic-11.png){: width="600px" .align-center}

합병의 기준이 되는 컬럼의 이름이 다를 땐 'left_on', 'right_on' 옵션을 각각 지정해주면 됩니다.

![Alt text](/assets/images/pandas2&probability_basic-12.png){: width="600px" .align-center}

---

SQL을 하신 분이라면 익숙한 그림입니다.  
Merge는 어느 방법을 쓰느냐에 따라, 다음과 같이 도식화 될 수 있습니다.

![Alt text](/assets/images/pandas2&probability_basic-13.png){: width="600px" .align-center}

#### Merge example

다음은 예제에 사용될 데이터 프레임들 입니다.

![Alt text](/assets/images/pandas2&probability_basic-14.png){: width="600px" .align-center}

#### left join

subject_id가 기준이 되면서, 왼쪽에 있는 모든 데이터도 머지 대상이 됩니다.  
오른쪽 데이터에서 왼쪽 데이터의 칼럼에 해당되지 않는 부분은 NaN값으로 채워집니다.

![Alt text](/assets/images/pandas2&probability_basic-15.png){: width="600px" .align-center}

#### right join

subject_id가 기준이 되면서, 오른쪽에 있는 모든 데이터도 머지 대상이 됩니다.  
왼쪽 데이터에서 오른쪽 데이터의 칼럼에 해당되지 않는 부분은 NaN값으로 채워집니다.

![Alt text](/assets/images/pandas2&probability_basic-16.png){: width="600px" .align-center}

#### full(outer) join

subject_id가 기준이 되면서, 양쪽에 있는 모든 데이터가 머지 대상이 됩니다.  
왼쪽 데이터에서 오른쪽 데이터의 칼럼에 해당되지 않는 부분 그리고 오른쪽 데이터에서 왼쪽 데이터의 칼럼에 해당되지 않는 부분은 NaN 값으로 채워집니다.

![Alt text](/assets/images/pandas2&probability_basic-17.png){: width="600px" .align-center}

### Concat

말그대로, 같은 형태의 데이터를 붙이는 연산작업 입니다.

![Alt text](/assets/images/pandas2&probability_basic-18.png){: width="600px" .align-center}

`pd.concat([df1, df2])`과 `df1.append(df2) 방식이 있습니다.

![Alt text](/assets/images/pandas2&probability_basic-19.png){: width="600px" .align-center}

## 딥러닝 확률론

딥러닝에서 확률론이 왜 필요한가요?

딥러닝은 확률론 기반의 기계학습 이론에 바탕을 두고 있습니다. 기계학습에서 사용되는 손실함수(loss function)들의 작동 원리는 데이터 공간을 통계적으로 해석해서 유도하게 됩니다. (예측이 틀릴 위험(risk)을 최소화하도록 데이터를 학습하는 원리는 통계적 기계학습의 기본 원리)

회귀 분석에서 손실함수로 사용되는 L2-노름은 예측오차의 분산을 가장 최소화하는 방향으로 학습하도록 유도합니다.

분류 문제에서 사용되는 교차엔트로피(cross-entropy)는 모델 예측의 불확실성을 최소화하는 방향으로 학습하도록 유도합니다.

분산 및 불확실성을 최소화하기 위해서는 측정하는 방법을 알아야하는데, 두 대상을 측정하는 방법을 통계학에서 제공하기 때문에 기계학습을 이해하려면 확률론의 기본 개념을 알아야 합니다.

### 이산확률변수 vs 연속확률변수

확률변수는 확률분포 𝒟 에 따라 이산형(discrete)과 연속형(continuous) 확률변수로 구분하게 됩니다.

이산형 확률변수는 확률변수가 가질 수 있는 경우의 수를 모두 고려하여 확률을 더해서 모델링합니다.

$P(X \in A) = \Sigma\_{x \in A} P(X = x)$

연속형 확률변수는 데이터 공간에 정의된 확률변수의 밀도(density) 위에서의 적분을 통해 모델링합니다.

$P(X \in A) = \int_A P(x)dx

### 조건부확률과 기계학습

조건부확률 $P(y|x)$는 입력변수 x 에 대해 정답이 y 일 확률을 의미합니다.

로지스틱 회귀에서 사용했던 선형모델과 소프트맥스 함수의 결합은 데이터에서 추출된 패턴을 기반으로 확률을 해석하는데 사용됩니다.

분류 문제에서 softmax$(W\phi + b)$은 데이터 $x$ 로부터 추출된 특징패턴 $\phi(x)$ 과 가중치행렬 $W$ 을 통해 조건부확률 $P(y|x)$을 계산합니다.

회귀 문제의 경우 조건부기대값 $𝔼[y|x]$ 을 추정합니다.

딥러닝은 다층신경망을 사용하여 데이터로부터 특징패턴 $\phi$을 추출합니다

### 기대값이 뭔가요?

확률분포가 주어지면 데이터를 분석하는 데 사용 가능한 여러 종류의 통계 적 범함수(statistical functional)를 계산할 수 있습니다.

기대값(expectation)은 데이터를 대표하는 통계량이면서 동시에 확률분포를 통해 다른 통계적Z 범함수를 계산하는데 사용됩니다.

$E\_{x~P(x)}[f(x)] = \int_X f(x)P(x)dx, $E\_{x~P(X)}[f(x)] = \sum\_{x \in X} f(x)P(x)

# 피어세션 정리

두 번째 주차 셋째날 모임이었습니다.

오늘의 further question은 분류 문제에서 softmax 함수가 사용되는 이유가 뭘까요? 와 softmax 함수의 결과값을 분류 모델의 학습에 어떤식으로 사용할 수 있을까요? 이었고, 이에 대해 열심히 서로 토의를 해보았습니다.

그리고 오늘 공부하였던 내용 중에 약간 이해가 안되는 부분(소프트맥스를 구현하는 넘파이 코드에 있어서 왜 최대값을 전체 백터에 대해 빼주고, 이것이 어떻게 동작하는지? 와 역전파가 어떻게 계산이 되는지)이 있는 분이 계서서 질문을 듣고, 다 같이 여러 방향으로 자기가 생각해 본 것을 공유해보는 시간을 가졌었습니다.

그리고 내일 있을 10개 조씩 묶어서 3분씩 조를 소개하는 시간에 사용될 프레젠테이션을 만들기 위해 서로 협동하여 논의하는 시간을 가졌었습니다.

# 퀴즈 정리

1. $ReLU(x) = max(0,x)$ 일 때, $ReLU(-3.14)$ 의 값을 구하시오

   $x$가 $0$보다 작다면 $0$을, $x$가$0$보다 크다면 $x$를 반환하게 되는 함수였습니다.

2. $\partial tanh(x) = \frac{\partial tanh(x)}{\partial x}$ 일 때, $\partial tanh(0)$의 값을 구하시오.

   $tanh(x)$를 미분하여 $x$에 $x$을 대입한 값을 구해주면 되는 문제였습니다.

3. 다음 보기 중 역전파 (backpropagation) 알고리즘의 기반이 되는 것을 고르시오.

   역전파 알고리즘의 핵심은 바로 합성함수의 연쇄법칙에 있습니다.

4. 다음 보기 중 신경망에서 활성함수가 필요한 가장 적절한 이유를 고르시오.

   선형모델의 출력을 비선형 적으로 근사하기 위하여 필요합니다.

5. $z$ 와 $k$ 가 다음과 같이 주어질 때, $\frac{\partial z}{\partial x}$값으로 올바른 것을 고르시오.

   $z = (k + 3)^{2}$
   $k = (x + y)^{2}$

   $\frac{\partial z}{\partial x} = \frac{\partial z}{\partial k} \frac{\partial k}{\partial x}$ 가 됩니다.

   $\frac{\partial z}{\partial k}$은 $3(k+3)^{2}$  
   $\frac{\partial k}{\partial x}$은 $2(x+y)$

   즉, $6((x+y)^{2}+3)^{2}(x+y)$가 됩니다.

## References

- pandas - 최성철 교수님
- Mathematics for Artificial Intelligence - Unist 임성철 교수님
