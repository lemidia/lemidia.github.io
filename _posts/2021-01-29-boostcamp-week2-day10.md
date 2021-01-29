---
title: " matplotlib"
excerpt: "부스트캠프 2주차 Day10 강의를 보고 내용을 정리한 노트입니다."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
  - Development

tags:
  - AI
  - Python

last_modified_at: 2021-01-29T08:06:00-05:00

header:
  overlay_image: /assets/images/headerIMG.jpg
  overlay_filter: 0.2 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# matplotlib

데이터 분석을 위해서 가장 기초적인 단계로 해당 데이터를 시각화하여 보여줄 수 있는 능력이 필요합니다. 시각화 라이브러리는 파이썬에서만 10개가 넘는등 다양한 라이브러리가 존재합니다. 그 중에서 가장 대중적으로 많이 쓰이는 matplotlib, seaborn 모듈에 대해 알아보겠습니다.

## matplotlib

가장 대중적으로 많이 쓰였고 많은 파이썬 라이브러리의 근간이 되는 matplotlib 입니다. matplotlib는 다른 라이브러리들의 부모 라이브러리로서의 역할을 하고 있다고 표현할정도로 다른 라이브러리들에 많은 영향을 주었습니다. 다소 복잡한 라이브러리 구성으로 인해 최근에는 그 사용 빈도와 대중성이 떨어지고 있으나 여전히 많은 입문자들이 처음 사용해보게 되는 좋은 시각화 라이브러리입니다.

### matplotlib overview

그래프는 pyplot 객체를 사용하여 데이터를 표시합니다.  
그 다음 pyplot 객체에 그래프들을 쌓은 다음 flush하게 됩니다.

![Alt text](/assets/images/matplotlib&probability_basic-1.png){: width="600px" .align-center}

plot 메소드는 argument를 kwargs인 키워드로 받기 때문에 고정된 argument가 없어서 alt+tab으로 사전에 어떤 parameter로 구성되어 받는지 확인이 어렵습니다.

![Alt text](/assets/images/matplotlib&probability_basic-2.png){: width="600px" .align-center}

그래프는 원래 figure 객체에 생성되는데, pyplot 객체 사용시, 기본 figure에 그래프가 그려집니다.

![Alt text](/assets/images/matplotlib&probability_basic-3.png){: width="600px" .align-center}

### Figure & Axes

Matplotlib은 Figure 안에 Axes로 구성이 됩니다.  
Figure 위에 여러 개의 Axes를 생성

![Alt text](/assets/images/matplotlib&probability_basic-4.png){: width="600px" .align-center}

![Alt text](/assets/images/matplotlib&probability_basic-5.png){: width="600px" .align-center}

Subplot의 순서는 그리드로 작성됩니다.

![Alt text](/assets/images/matplotlib&probability_basic-6.png){: width="600px" .align-center}

### set color

color 속성을 사용
float: 흑백, rgb color, predefined color 사용 가능

![Alt text](/assets/images/matplotlib&probability_basic-7.png){: width="600px" .align-center}

### set line style

라인 스타일은 ls 또는 linestyles 속성을 사용함으로써 적용가능 합니다.

![Alt text](/assets/images/matplotlib&probability_basic-8.png){: width="600px" .align-center}

### set title

pyplot에 title 함수 사용, figure의 subplot별 입력 가능

![Alt text](/assets/images/matplotlib&probability_basic-9.png){: width="600px" .align-center}

### set legend

legend 함수로 범례를 표시함, loc 위치 등 속성 지정가능

![Alt text](/assets/images/matplotlib&probability_basic-10.png){: width="600px" .align-center}

### scatter

scatter 함수를 사용해 그래프를 그릴 수 있습니다.

scatter 함수는 argument로 data_1, data_2같은 시퀀스 자료형을 받고 있습니다.  
c는 컬러, marker는 모양을 지정하는 속성입니다.

![Alt text](/assets/images/matplotlib&probability_basic-11.png){: width="600px" .align-center}

- s : 데이터의 크기를 지정, 데이터의 크기 비교 가능

![Alt text](/assets/images/matplotlib&probability_basic-12.png){: width="600px" .align-center}

### bar chart

bar 함수로 bar chart를 그릴 수 있습니다.

![Alt text](/assets/images/matplotlib&probability_basic-13.png){: width="600px" .align-center}

### histogram

![Alt text](/assets/images/matplotlib&probability_basic-14.png){: width="600px" .align-center}

### seaborn

시각화를 위한 다양한 기능을 손쉽게 사용할 수 있도록 지원합니다. 모든 기능은 matplotlib을 기반으로 제공되어 matplotlib과 상호 호환됩니다. matplotlib의 모든 기능을 사용하면서 손쉽게 사용하고 싶다면 seaborn이 가장 적절한 대안입니다.

- 기존 matplotlib에 기본 설정을 추가
- 복잡한그래프를 간단하게 만들 수 있는 wrapper
- 간단한 코드 + 예쁜 결과

![Alt text](/assets/images/matplotlib&probability_basic-15.png){: width="600px" .align-center}

- matplotlib과 같은 기본적인 plot
- 손쉬운 설정으로 데이터 산출
- lineplot, scatterplot, countplot 등

![Alt text](/assets/images/matplotlib&probability_basic-16.png){: width="600px" .align-center}

![Alt text](/assets/images/matplotlib&probability_basic-17.png){: width="600px" .align-center}

![Alt text](/assets/images/matplotlib&probability_basic-18.png){: width="600px" .align-center}

# 퀴즈 정리

1. 다음과 같은 표본 $X$ 가 있을 때, $X$ 의 평균을 구하시오 (정수값으로 입력).

   표본을 모두 더한 다음 갯수로 나눠주면 되는 문제였습니다.

2. 다음과 같은 표본 $X$ 가 있을 때, $X$ 의 표본분산을 구하시오 (소수점 첫째자리까지 입력)

   표본들을 표본평균으로 뺀 값들을 제곱한 다음 전부 더해 [표본 개수 - 1] 로 나눠주면 되는 문제였습니다.

3. 다음과 같은 표본 $X$ 가 있을 때, $X$x 의 표본표준편차를 구하시오 (정수로 입력).

   위의 표본에서 표본분산을 구해서 제곱근을 취해주면 되는 문제였습니다.

4. 정답 레이블을 one-hot 벡터로 표현한다면 하나의 정답 레이블 벡터의 크기는 1이다?

   범주의 개수가 하나의 정답 레이블 벡터의 크기가 됩니다.

5. KL(P∥Q)는 KL(Q∥P) 와 같다?

   쿨백-라이블러 발산의 이산확률변수에서의 경우와 연속확률변수에서의 경우는 다릅니다.

## References

- pandas - 최성철 교수님
- Mathematics for Artificial Intelligence - Unist 임성철 교수님
