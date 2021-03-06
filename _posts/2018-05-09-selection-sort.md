---
title:  "선택 정렬(Selection Sort)"
excerpt: "비교기반 제자리 정렬 알고리즘"
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
 - Algorithm

tags:
  - Sort
  - Array
  
last_modified_at: 2019-05-10T08:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo2.jpg
  overlay_filter: 0.3 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# 선택 정렬

선택 정렬은 **비교기반 제자리 정렬** 알고리즘이다.  
복잡도는 $O(n^2)$이므로 큰 리스트에는 비효율적이며, 유사한 삽입 정렬보다 성능이 더 떨어지는 것이 일반적이다. 선택 정렬은 단순함이 특징이며 특정한 상황(메모리가 제한적인 경우)에서는 더 복잡한 알고리즘보다 성능상 우위가 있다.

**비교기반과 제자리 정렬 이란?**

**비교기반:** 원소들을 정렬할 때 **원소들의 순서**에만 의존하는 것을 의미.  
비교하는 원소들이 숫자거나, 문자열이거나, 심지어는 복잡한 객체에 대해서도 **순서**가 결정되어 있다면 적용할 수 있다.
{: .notice--warning}
**제자리 정렬:** 원소들의 개수에 비해서 충분히 무시할 만한 저장 공간만을 더 사용하는 정렬 알고리즘들을 의미.  
예를 들어 **삽입 정렬**은 이미 주어진 원소들을 옮긴 뒤 적절한 위치에 원소를 삽입하는 연산을 반복하는데, 이 과정에서 원소들을 담는 공간 외에 추가로 사용될 수 있는 공간은 옮겨지는 **원소가 저장되는 공간과 루프 변수** 정도에 불과하다.
{: .notice--primary}


## 알고리즘

다음은 선택 정렬의 알고리즘이다. (오름차순)

1. 먼저, 정렬될 리스트에서 가장 **최소값**을 찾는다.  
2. 1번에서 찾은 값을 정렬될 리스트의 **맨 처음** 위치한 값과 바꾼다. **(1 pass)**
3. 맨 처음 위치를 제외한 나머지 리스트의 원소들에 대해서 이를 반복한다.

**1 pass:** 정렬이 되지않은 리스트에서 최소값을 선택해, 리스트의 적절한 위치에 넣는다.
{: .notice--info}

이처럼, n개의 원소를 가진 리스트는 선택 정렬로 n-1번의 패스를 거쳐 정렬이 된다. 

비교하는 것이 상수 시간에 이루어진다는 가정 아래, n개의 주어진 리스트를 위와 같은 방법으로 정렬하는 데에는 $O(n^2)$ 만큼의 시간이 걸린다.

***

다음은 선택 정렬의 **애니메이션**이다.

![alt](/assets/images/Selection-Sort-Animation.gif){: width="500px" height="300px" .align-center}
## 예제

다음 예제를 보고 알고리즘을 이해해 보자.

```
다음과 같은 리스트가 있다고 하자.  

List = [64 25 12 22 11] - index: 0...4

List = [정렬 완료 | 미정렬]

1 pass: List[0...4]를 순회하여 최소값인 11을 찾고  
        이를 0번째 인덱스 위치의 64와 스왑한다.

List = [11 | 25 12 22 64]

2 pass: List[1...4]를 순회하여 최소값인 12을 찾고
        이를 1번째 인덱스 위치의 25와 스왑한다.

List = [11 12 | 25 22 64]

3 pass: List[2...4]를 순회하여 최소값인 22을 찾고  
        이를 2번째 인덱스 위치의 25와 스왑한다.

List = [11 12 22 | 25 64]

4 pass: List[3...4]를 순회하여 최소값인 25을 찾고  
이를 3번째 인덱스 위치의 25와 스왑한다.

List = [11 12 22 25 | 64]

n-1번의 pass로 리스트의 정렬이 완료되었다.
```


## 구현

다음은 선택 정렬을 C로 구현한 코드이다.

```c++
/* a[0] to a[aLength-1] is the array to sort */
int i,j;
int aLength; // initialise to a's length

/* advance the position through the entire array */
/*   (could do i < aLength-1 because single element is also min element) */
for (i = 0; i < aLength-1; i++)
{
    /* find the min element in the unsorted a[i .. aLength-1] */

    /* assume the min is the first element */
    int jMin = i;
    /* test against elements after i to find the smallest */
    for (j = i+1; j < aLength; j++)
    {
        /* if this element is less, then it is the new minimum */
        if (a[j] < a[jMin])
        {
            /* found new minimum; remember its index */
            jMin = j;
        }
    }

    if (jMin != i) 
    {
        swap(a[i], a[jMin]);
    }
}
```
***
다음은 선택 정렬을 자바로 구현한 코드이다.

```java
void selectionSort(int[] list) {
    int indexMin, temp;

    for (int i = 0; i < list.length - 1; i++) {
        // Lowest position
        indexMin = i;
        for (int j = i + 1; j < list.length; j++) {
            if (list[j] < list[indexMin]) {
                indexMin = j;
            }
        }
        // Swap
        temp = list[indexMin];
        list[indexMin] = list[i];
        list[i] = temp;
    }
}
```

## 시간복잡도 & 공간복잡도

**시간복잡도 분석**

$n$ $(n-1...1)$개의 원소를 매 패스마다 스캔하여 적절한 위치와 스왑한다.  
n개의 원소가 있다면 $n-1$의 패스를 가진다.

$$(n - 1) + (n - 2) +...+ 1 = \sum_{i=1}^{n-1} i$$

등차수열에 의해,

$$\sum _{i=1}^{n-1}i={\frac {(n-1)+1}{2}}(n-1)={\frac {1}{2}}n(n-1)={\frac {1}{2}}(n^{2}-n)$$

비교의 측면에서 볼 때, 복잡도는 $O(n^2)$이다.  

교환은 매 패스마다 한 번씩 일어난다. 즉, $n-1$번 복잡도는 $O(n)$  
(마지막 원소는 이미 정렬되어 있다.)
```
**Selection sort**

Class	            정렬 알고리즘

Data structure	    배열

Worst-case          О(n^2) 비교
performance         О(n) 교환

Best-case           О(n^2) 비교
performance         О(n) 교환

Average             О(n^2) 비교
performance         О(n) 교환

Worst-case          O(1) 추가 공간
space complexity	
```

## References

[Selection sort](https://en.wikipedia.org/wiki/Selection_sort)  
[Selection sort - GIF](https://medium.com/@notestomyself)