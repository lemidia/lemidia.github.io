---
title: "Regularization"
excerpt: "학습 데이터에 대한 에러와 테스트 데이터에 대한 에러의 차이가 가능한 작게 되도록 하는 여러가지 기법을 알아봅니다."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
  - Development

tags:
  - AI
  - Python

last_modified_at: 2021-02-04T08:06:00-05:00

header:
  overlay_image: /assets/images/headerIMG.jpg
  overlay_filter: 0.2 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# Regularization

Regularization은 우리말로 규제라고 하며 쉽게 말해서 이전에 살펴본 최적화 방법에서 우리의 모델을 Generalization하게(학습 데이터에 대한 에러와 테스트 데이터에 대한 에러의 차이가 가능한 작게 되도록)하도록 하는 의미를 갖습니다.

엄밀히 말하면 우리의 모델이 데이터를 보고 학습을 하게 되는데, 학습에 방해가 되도록 규제를 하게 됩니다.  
학습에 방해가 되도록 규제를 해서 우리가 얻는 이점은 학습 데이터에서만 우리의 모델이 잘 동작하는 것만 아니라 한번도 보지 못한 테스트 데이터에서도 잘 동작하도록 하는 것입니다.

여러가지 규제 방법들이 있고 아래와 같은 순서로 하나씩 살펴보겠습니다.

- Early stopping
- Parameter norm penalty
- Data augmentation
- Noise robustness
- Label smoothing
- Dropout
- Batch normalization

## Early stopping

일반적으로 학습이 반복되면서 학습 에러는 낮아지지만 그에 반해 학습 데이터 셋에서 분리한 검증 데이터로 검증을 하게 될 때, 검증 에러는 증가하게 됩니다.

밑의 그림은 말 그대로 학습이 반복됨에 따라 Generalization performance가 낮아지기 전에 또는 Generalization Gap이 커지기 전에 우리의 모델 학습을 멈추는 것을 의미합니다. 하지만 너무 빨리 멈춰 버리면 충분한 학습이 덜 되는 등 문제가 생기게 되므로 상황에 맞게 잘 적용해야 할 것입니다.

규제를 적용하고자 할 때 테스트 데이터를 써서 Early stopping을 하게 되면 Cheating에 해당되게 되므로 검증 데이터를 따로 사용하고 테스트 데이터는 사용하지 않습니다.

![Alt text](/assets/images/aitech_day14-1.png){: width="600px" .align-center}

## Parameter Norm Penalty

Parameter Norm Penalty는 뉴럴 네트워크 파라미터가 너무 커지지 않게 하는 것을 말합니다.  
네트워크 파라미터 숫자를 다 제곱한 다음 더하면 어떤 값이 나오게 되는데 이 숫자를 같이 줄이는 것을 의미합니다.

이 것에 대해 물리적이거나 해석적인 의미는 뉴럴 네트워크가 만들어 내는 함수의 공간에 부드러움을 더하는 것입니다. 부드러운 함수일 수록 Generalization performance가 높을 것이다 라는 가정을 가지게 됩니다

![Alt text](/assets/images/aitech_day14-2.png){: width="600px" .align-center}

밑에서 알아보게 될 stride와 padding는 고려하지 않고 가장 기본적인 Convolution 연산을 해보면 오른쪽의 Output 필터가 도출되게 됩니다.

## Data Augmentation

뉴럴넷 혹은 딥러닝에서는 가장 중요한 하나를 꼽자면 역시 데이터 인데요, 데이터의 수가 작은 것 보다 데이터가 무한히 많으면 확실히 학습이 잘 이루어 지게 됩니다.

왼쪽의 그림 처럼 데이터의 수가 적을 때는 Random Forest, XGBoost 같은 방법론들이 데이터 대비 학습 성능이 더 잘 될 때가 많았습니다.

하지만 데이터 샘플의 개수가 어느정도 커지게 되면 딥러닝은 우리가 가지고 있는 방대한 데이터를 잘 표현을 하게 되고 이로 인해 성능이 올라가고, 기존에 머신러닝 방법론들은 이 많은 수의 데이터를 표현할 만한 표현력이 부족해지게 됩니다.

문제는 무엇이냐 하면, 현실에서의 데이터의 수는 한정적이고 해서 Data Augmentation를 통해서 데이터에 조작을 가해 기존에 있던 데이터와 비슷하지만 형태가 조금 다른 데이터를 추가하는 방식을 만들게 됩니다.

![Alt text](/assets/images/aitech_day14-3.png){: width="600px" .align-center}

위에서 보이는 사진처럼 기존의 이미지에 대한 레이블 값이 바뀌게 하지 않는 선(유지)에서 이미지를 회전시키고, 확대 시키거나 축소 또는 뒤집기(플립), 자르기 등의 행위를 Data Augmentation 이라고 합니다.

하지만 MNIST 데이터에서 6과 같은 숫자는 상하로 뒤집게 되면 아예 이 데이터에 대한 레이블 값이 바뀌는 것이기에 이런 경우에는 뒤집기 같은 것을 사용할 수 없게 됩니다.

## Noise Robustness

Noise Robustness는 노이즈를 추가한 데이터에 대해서도 잘 동작 하도록 모델을 강건하게 만든다는 것에 의미가 있습니다.

Data Augmentation과 차이점이라면 입력 데이터에 대해서만 노이즈를 추가하는 것이 아닌, 모델의 weight에 대해서도 노이즈를 추가해 줄 수 있습니다. 이렇게 되면 모델이 학습할 때 조금 더 성능이 더 잘 나온다는 실험적 결과가 있다고 합니다.

![Alt text](/assets/images/aitech_day14-4.png){: width="600px" .align-center}

## Label Smoothing

Label Smoothing도 Data Augmentation과 비슷한 의미를 갖는데, 차이점은 분류 문제라면 학습 데이터에서 랜덤하게 두 개의 이미지를 가져와 섞어주는 것입니다.

이것이 어떤 효과가 있냐 하면, 분류 문제에서의 이미지 공간 속에서 여러 개의 클래스들을 잘 구분할 수 있는 Decision Boundary를 찾고 싶을 것인데, 이 Decision Boundary를 부드럽게 만들어주는 효과를 가지고 있다고 합니다.
![Alt text](/assets/images/aitech_day14-5.png){: width="600px" .align-center}

Mix up 같은 경우는 밑에서 보이는 것 처럼 이미지를 서로 50:50으로 섞습니다. 그리고 레이블 값도 각각 0.5씩 주게 됩니다.

Cut out은 이미지에서 일정 영역을 빼버리게 됩니다.

Cut mix는 이미지를 섞는데, 블렌딩하게 섞는 것이 아닌 일정 영역을 잘라 다른 이미지로 대체해버리는 방법을 말합니다. 그림에서 보이듯이 레이블 값은 0.6, 0.4씩 주어지게 됩니다.

![Alt text](/assets/images/aitech_day14-6.png){: width="600px" .align-center}

## Dropout

드롭아웃은 사진에서 보이는 것 처럼 뉴럴 넷에서의 특정 웨이트를 0으로 만듦으로써 뉴런을 비활성화 시키는 것을 말합니다. 드롭아웃 p = 0.5라는 말은 50%의 뉴런을 비활성화 시킨다라고 말할 수 있습니다.

이것을 해서 얻는 이점은 각각의 뉴런들이 좀 더 Robust한 feature를 잡을 수 있다라고 해석을 한다고 합니다. 그래서 모델의 Generalization performance가 올라간다고 실험적으로 잘 알려져 있습니다.

![Alt text](/assets/images/aitech_day14-7.png){: width="600px" .align-center}

## Batch Normalization

Batch Normalization는 이 기법을 적용하고자 하는 레이어의 값들을 통계적으로 정규화 시킨다라고 말할 수 있습니다.

예를 들어 1000개의 파라미터 값이 있는 히든 레이어가 있다고 하면, 1000개의 파라미터 각각의 값들에 대해 zero mean and unit variance하게 만들어 주는 것입니다.

unit variance은 데이터들에 대해 분산이 1이고 평균이 0인 값들의 분포로 만들어 주는 것을 말합니다.

신경망에서 해당층에는 파라미터의 여러 값들이 있는데, 그 수치의 크기가 달라서 큰 수의 값에 신경망이 지나치게 영향을 받는 것을 방지하기 위해서 이 기법을 적용한다고 생각해 볼 수 있습니다.

방법은 전체 데이터에 대해 평균과 분산을 구하고, 각각의 데이터에 대해서 평균을 뺀 값을 표준편차로 나눠주게 되면 Standarization이 되게 됩니다.

그렇다면, 전체 데이터에서 평균에 가까운 값이나 평균의 값을 가진 파라미터는 0또는 0 근처의 값이 되고, 다른 값들은 평균을 빼준 값에서 표준편차로 나누어준 거리 만큼 평균에서 떨어진 값으로 있게 됩니다.

![Alt text](/assets/images/aitech_day14-8.png){: width="600px" .align-center}

## References

- Optimization - Convolution - 최성준 교수님
