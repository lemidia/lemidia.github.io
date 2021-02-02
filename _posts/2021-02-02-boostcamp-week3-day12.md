---
title: "Optimization in Deep Learning / Convolution in CNN"
excerpt: "최적화와 관련된 주요한 용어와 내용들 그리고 합성곱 신경망에서의 합성곱 연산에 대해 알아봅니다."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
  - Development

tags:
  - AI
  - Python

last_modified_at: 2021-02-01T08:06:00-05:00

header:
  overlay_image: /assets/images/headerIMG.jpg
  overlay_filter: 0.2 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# Optimization in Deep Learning

최적화와 관련된 주요한 용어와 내용(Generalization, Overfitting, Cross-validation) 그리고 기존 SGD(Stochastic gradient descent)를 넘어서 최적화(학습)가 더 잘될 수 있도록 하는 다양한 기법들에 대해 알아봅니다.

## Important Concepts in Optimization

- Generalization
- Under-fitting vs. over-fitting
- Cross validation
- Bias-variance tradeoff
- Bootstrapping
- Bagging and boosting

## Generalization

일반화는 학습 데이터로 학습이 되어진 모델이 얼마나 테스트 데이터에서 잘 동작하는지(문제에 따라 에러를 최소화)를 나타내는 개념입니다.

![Alt text](/assets/images/aitech_day12-1.png){: width="600px" .align-center}

위의 그림처럼 학습 데이터를 반복적으로 학습함에 따라 모델은 Training Error는 줄어들게 됩니다.  
그렇다고 Training Error가 최소값이 되었다고 해서 우리의 모델이 최적화 되었다고 할 수는 없습니다.

일반적으로 Training Error가 줄어들지만, 어느정도 반복 학습이 이루어지고 시간이 지나면 학습하지 않은(한번도 보지 않은) 테스트 데이터에 대해서는 Test Error가 올라가게 됩니다.

Generalization Gap은 Training Error와 Test Error 사이의 차이를 의미합니다.

그래서 Training Error와 Test Error의 차이 즉, Generalization Gap이 작을 때 우리는 Generalization Performance가 좋다고 말할 수 있고, Generalization Gap이 클 때 Generalization Performance가 좋지 않다고 말 할 수 있습니다.

주의할 점은 Test Error가 낮다고 해서 Generalization Performance 좋은 것이 아닙니다.  
Generalization Performance는 단지 두 Error의 차이에 따른 성능만을 의미하는 것이기 때문입니다.

## Underfitting vs. Overfitting

**Overfitting**은 학습데이터에 대해서는 잘 동작 하지만 테스트 데이터에 대해서는 잘 동작하지 않는 현상을 의미합니다. 이는 모델이 학습 데이터에 대해 너무 과적합하게 학습된 나머지, 한 번도 보지 못한 테스트 데이터에 대해서는 잘 동작하지 않는 것을 의미하게 됩니다.

**Underfitting**은 네트워크가 너무 간단하거나 학습을 너무 조금 시켜서 학습 데이터 마저도 잘 맞추지 못하는 현상을 의미하게 됩니다.

밑의 그림에서 볼 수 있듯이 학습데이터에 대해 너무 과적합하지 않으면서도 간단하거나 부족하지 않은 중간의 모델이 Balance하다고 할 수 있습니다.

하지만 문제에 따라서는 오른쪽 그림과 같이 파란 선들이 Target일 수도 있어서 이 개념들은 컨셉적인 이야기라고 보면 될 것 같습니다.

![Alt text](/assets/images/aitech_day12-2.png){: width="600px" .align-center}

## Cross-validation

전체 데이터를 크게 학습 데이터와 테스트 데이터로 나누는데, 학습 데이터에서 일정 부분을 검증을 위해 때어내서 만든 데이터를 **Validation Data** 라고 합니다.

Validation Data를 만들어 사용하는 이유는 학습 데이터로 학습을 시킨 모델이 **학습에 사용되지 않은** Validation Data 기준으로 얼마나 **잘 동작하는지** 알아보기 위함입니다.

![Alt text](/assets/images/aitech_day12-3.png){: width="600px" .align-center}

K-fold Validation이라고도 불리는 Cross validation은 학습 데이터를 k개의 fold로 나누고, 1개의 fold는 검증에 사용할 validation data로, 나머지 k-1개의 fold는 학습 데이터로 사용하는 것입니다.  
이를 fold 마다 한번 씩 번갈아 가며 k번 수행하면 총 5개의 서로 다른 validation 값이 나오게 되고, 이 값들을 평균낸 값을 사용하게 됩니다.

모델을 학습 시키는데에 있어서 중요한 하이퍼 패러미터(Learning Late, 손실함수, 네트워크의 크기 등)를 정하기 위해 먼저 교차 검증을 수행하고 하이퍼 패러미터가 교정이 되면, 검증 데이터를 학습 데이터에 포함시켜 전체 학습 데이터에 대해 모델을 학습합니다. 이 때, 테스트 데이터를 사용해서 교차검증을 한다거나 하이퍼 패러매터를 설정하는 것 등... 무슨 이유에서건 테스트 데이터를 학습에 사용되서는 안됩니다.

## Bias and Variance

- Low Variance는 비슷한 입력을 넣었을 때, 얼마나 일관된 출력을 내는지를 의미합니다.
  이는 주로 모델이 간단할 때 나타나는 현상입니다.
- High Variance는 비슷한 입력을 넣었을 때, 출력이 많이 달라지게 되는 것을 의미합니다.
  이렇게 되면 모델이 Overfitting 될 가능성이 커지게 됩니다.
- Low Bias는 전체적인 출력 값이 Target 또는 Mean과 가깝다는 것을 의미합니다.
- High Bias는 전체적인 출력 값이 Target 또는 Mean과 다소 떨어져 있다는 것을 의미합니다.

  ![Alt text](/assets/images/aitech_day12-4.png){: width="600px" .align-center}

### 현재 작업 중 입니다! :blush:

# 퀴즈 정리

정리 중...

## References

- Mathematics for Artificial Intelligence - Unist 임성철 교수님
- Deep Learning Basic - 최성준 교수님
