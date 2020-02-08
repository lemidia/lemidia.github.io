---
title:  "카운팅 소트(Counting sort)"
excerpt: "특정 조건 하에 시간복잡도 O(n)이 걸리는 정렬 알고리즘"
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

# 카운팅 소트(Counting sort)

계수 정렬이라고도 하며, **점근적 복잡도 O(n+k)**를 가지는 선형 정렬 알고리즘이다.

- **n: 정렬될 입력 배열의 원소 개수.**   
- **k: 정렬될 입력 배열의 가장 큰 키 값.**  

이 정렬 알고리즘은 **특정한 조건하에 매우 효율적**이며 같은 키값을 가진 원소에 대해 **안정적**이다. 버블소트와 머지소트와는 다르게, 이 알고리즘은 **비교기반 정렬**이 아니므로 원소 간에 비교를 하지 않고, **리스트의 O(1)의 삽입 및 조회 연산**을 사용해 동작한다.

카운팅 소트는 정수의 특정 범위 사이에서 동작하며, 특정 키 값의 개체의 수를 세아려 이 정보를 보조 배열에 기록한다. 이 정보와 산술계산을 사용하여 각 키 값을 정렬될 결과 리스트의 특정 위치에 배치시킨다.

이 정렬 알고리즘은 정렬될 수의 범위가 정렬될 원소의 개수보다 심하게 크지 않을 때 적합하다.  
그리고, 실행시간은 **$O$(가장 큰 키 값 - 가장 작은 키 값)**이 되므로 정렬될 수의 범위 또는 가장 큰 키 값(K)가 크지 않을 때 적합하다. 그렇지 않으면 보다 비효율적이다.

카운팅 소트는 **안정 정렬**에 속하고 **제자리 정렬**이 아니다. 이는 특정 원소의 키 값 개수를 추적할 추가적인 **$O(K)$공간**을 요구한게 된다. 

**안정 정렬과 제자리 정렬 이란?**

**안정 정렬:** 정렬되기 전에 같은 키 값을 가진 원소들의 **상대적인 위치나 순서**는 정렬이 끝나도 변하지 않고 **그대로 유지**되는 것을 의미.  
안정 정렬 알고리즘으로는 **삽입 정렬, 머지소트, 카운팅 소트** 등이 있다.
{: .notice--warning}
**제자리 정렬:** 원소들의 개수에 비해서 충분히 무시할 만한 저장 공간만을 더 사용하는 정렬 알고리즘들을 의미.  
예를 들어 **삽입 정렬**은 이미 주어진 원소들을 옮긴 뒤 적절한 위치에 원소를 삽입하는 연산을 반복하는데, 이 과정에서 원소들을 담는 공간 외에 추가로 사용될 수 있는 공간은 옮겨지는 **원소가 저장되는 공간과 루프 변수** 정도에 불과하다.
{: .notice--primary}

카운팅 소트에 제약사항으로는 **정수 같은 이산적인(Discrete)값들**만 정렬 할 수 있고, 입력된 배열을 정렬하기 전에 **가장 큰 값 K**(범위)를 **사전에 알고 있어야** 한다.

## 의사 코드

다음은 카운팅 소트의 의사 코드이다.

```c++

// params A: 입력 배열, k: 가장 큰 키 값, n: 입력 배열 원소의 개수
CountingSort(A, n, k,)
  // 특정 키 값의 원소 개수를 추적할 c[], 결과 배열 B[]를 준비한다.
  c[k+1], B[n+1]

  // C[]를 0으로 전부 초기화 한다.
  for i = 0 to k do 
    c[i] = 0

  //Complexity: O(n)
  for j = 0 to n do
    // 특정 키 값의 원소의 개수를 세아린다.
    c[A[j]] = c[A[j]] + 1

  ////Complexity: O(k)
  for i = 1 to k do
    // 결과 배열 B[]에 저장될 실제 인덱스 위치를 구한다.
    c[i] = c[i] + c[i-1]

  //Complexity: O(n)
  for j = n-1 down to 0 do
    //결과 배열을 구한다.
    B[c[A[j]]] = A[j]
    c[A[j]] = c[A[j]] - 1

end func
```

## 카운팅 소트 - 예제

**예제로 카운팅 소트 알고리즘을 이해해 본다.**

1. 먼저 정렬 될 입력 배열이다.
![Alt](/assets/images/Counting-Sort-1.png){: width="500px" height="50px" .align-center}
그리고, 특정 키 값의 원소 개수를 저장할 배열 Count[k+1], 정렬 결과를 저장할 배열 Result[n+1]를 준비한다.  
여기서 k는 입력 배열의 가장 큰 값인 11이고, n은 입력 배열의 원소 개수인 11이다.

2. 입력 배열을 처음부터 끝까지 순회하면서 Count[]에 원소의 특정 키 값을 인덱스로 하여 개수를 기록한다. 그러면, 다음 그림과 같이 Count[] 배열이 완성된다.
![Alt](/assets/images/Counting-Sort-2.png)
위 그림에서 Count[2]은 1인데 이 의미는 실제 입력 배열의 **2를 키 값으로 하는 원소가 1번 등장** 했다는 것을 의미한다. 마찬가지로 Count[1]은 2인데 이 의미는 실제 입력 배열의 **1을 키 값으로 하는 원소가 2번 등장** 했다는 것을 의미한다.
이렇게 입력 배열의 특정 키 값을 **Count[]의 인덱스**로 하여 등장횟수 만큼 +1씩 증가시키며 기록해 준다.

3. Result[]에 저장될 **특정 키 값의 실제 위치**를 표현하기 위해 **Count[]의 Prefix sum**을 구한다.
![Alt](/assets/images/Counting-Sort-3.png)  
위 그림의 Modified Count[]의 값은 ```Count[i] = Count[i] + Count[i-1]```를 한 값이다.  
이 값은 Result[] 배열에 저장될 원소들의 위치 인덱스 값을 계산하는 것이다.

4. 입력 배열을 순회하면서 결과 배열을 계산한다.  
앞에서 계산해둔 Count[]의 정보를 이용해서 결과 배열을 계산해보자.  
인덱스 i는 0부터 시작하여, 입력 배열의 맨 처음 원소는 2이다. ```input[0] = 2```  
```Count[input[i]] = Count[2]``` 이 값은 Result[]에 저장될 input[i]의 위치를 말해준다.  
Count[]을 보자. 여기서 ```Count[input[i]]``` 값은 3이다. 즉, ```Result[Count[input[i]]] = input[i]``` -> Result 배열 3번 인덱스 위치에는 2가 저장이 된다.  
그 다음, 입력 배열에 같은 키 값을 가진 원소들이 2개 이상 있을 수 있는데(예제 입력 배열에서는 1이 2개) 결과 배열의 같은 인덱스에 저장되어 알고리즘의 오류를 피하기 위해 ```Count[input[j]] = Count[input[j]] - 1```를 해야 한다. 이것은 같은 키 값을 가지는 원소들을 결과 배열에 저장할 때 한 칸씩 서로 다른 위치에 저장이 되게 한다. 앞에서 prefix sum을 계산한 이유가 이것이다.  
이렇게 입력 배열 끝까지 순회하며 계산해주면 밑의 그림과 같이 Result배열이 완성된다.
![Alt](/assets/images/Counting-Sort-4.png)  

실제 정렬된 배열은 Result[]의 [1번 인덱스 ... n번 인덱스]이다.
위 그림에서 보이듯이 0번 인덱스가 거슬린다면 Result[]의 크기를 Result[n]로 초기화 하고 ```Result[Count[input[i]]] = input[i]```에서 왼쪽 항에 -1을 넣어주자. => ```Result[Count[input[i]] -1]``` 이는 한칸 씩 앞으로 당겨 저장함을 의미한다.


## 자바 코드

다음은 카운팅 소트의 자바 코드이다.
```java

import java.util.Arrays;

public class CountingSort {

	public int[] sort(int[] A) {
		int[] Result = new int[A.length + 1];
		int[] Count = new int[A.length + 1];

		for (int i = 0; i < Count.length; i++) {
			Count[i] = 0; // put count for every element as 0
		}
		// Count[] will store the counts of each integer in the given array
		for (int i = 0; i < A.length; i++) {
			int x = Count[A[i]];
			x++;
			Count[A[i]] = x;
		}
		// • Update the Count[] so that each index will store the sum till
		// previous step. (Count[i]=Count[i] + Count[i-1]).
		// Now updated Count[] array will reflect the actual position of each
		// integer in Result[].
		for (int i = 1; i < Count.length; i++) {
			Count[i] = Count[i] + Count[i - 1];
		}
		// • Now navigate the input array taking one element at a time,
		// Count[input[i]] will tell you the index position of input[i] in
		// Result[]. When you do that, decrease the count in Count[input[i]] by
		// 1.
		for (int i = A.length - 1; i >= 0; i--) {
			int x = Count[A[i]];
			Result[x] = A[i];
			x--;
			Count[A[i]] = x;
		}
		return Result;

	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int input[] = { 2, 1, 4, 5, 7, 1, 1, 8, 9, 10, 11, 14, 15, 3, 2, 4 };
		System.out.println("Orginal Array " + Arrays.toString(input));
		CountingSort c = new CountingSort();
		int[] B = c.sort(input);
		System.out.println("Sorted Array : " + Arrays.toString(B));
	}
}

```

```
Output:
Orginal Array [2, 1, 4, 5, 7, 1, 1, 8, 9, 10, 11, 14, 15, 3, 2, 4]
Sorted Array : [0, 1, 1, 1, 2, 2, 3, 4, 4, 5, 7, 8, 9, 10, 11, 14, 15]
```

## 시간복잡도 & 공간 복잡도

이 정렬 알고리즘은 재귀나 서브루틴(함수)콜을 사용하지 않고 1차원의 다소 심플한 for loop만 되어 있으므로 복잡도 분석이 꽤 간단한 편이다. Count[]의 prefix sum 계산이 최대 k+1번 수행되므로 O(k), Count[]의 계산과 Result[]의 계산은 n번 계산되므로 O(n)이다.  

 따라서 이 알고리즘의 전체 시간복잡도는 이 두개의 합인 O(n+k)가 된다.

```
**Counting sort**

Class	            정렬 알고리즘

Data structure	    배열

Worst-case          О(n+k) 
performance      

Worst-case          О(n+k) 
space complexity	

* n은 원소의 개수, k는 음수가 아닌 키 값의 범위
```

## 참고하면 좋은 자료

카운팅 소트를 시각화한 애니메이션으로 참고하면 좋다.

[Counting Sort visualization](https://www.cs.usfca.edu/~galles/visualization/CountingSort.html)

## Reference

[Counting sort - wikipedia](https://en.wikipedia.org/wiki/Counting_sort)  
[Counting sort - codingeek](https://www.codingeek.com/algorithms/counting-sort-explanation-pseudocode-and-implementation/)  
[Counting sort - algorithms.tutorialhorizon](https://algorithms.tutorialhorizon.com/counting-sort/)