---
title:  "버블소트(Bubble Sort)"
excerpt: "비교기반 정렬 알고리즘"
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
 - Algorithm

tags:
  - Sort
  - Mathematics
  
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

# Bubble(버블 정렬)

비교 기반 정렬 알고리즘이다.

다른 O(nlongn)의 성능을 내는 정렬 알고리즘에 비해 성능이 좋지 않으므로 실무에서는 교육용 목적으로 사용 되어진다.

더 효율적인 정렬 알고리즘인 팀소트(Timsort)가 머지소트(Merge sort)는 인기있는 프로그래밍 언어(java, python)의 내장 정렬 라이브러리로 사용되고 있다.
{: .notice--info}
***

## Algorithm

밑의 애니메이션을 먼저 보시고 알고리즘을 읽으시면 이해가 빠를 수 있습니다.

1. 처음 원소를 시작으로 n번째 원소까지 차례대로 옆 원소와 오른쪽으로 비교하며 스왑을 진행한다.
2. n번째 원소와 비교가 끝이나면 n번째 원소는 정렬이 완료된 것이다.
3. 처음 원소부터 n-1번째 원소까지 1번과 같이 수행한다.
4. n-1번째 원소와 비교가 끝이나면 n-1번째 원소는 정렬이 완료된 것이다.
5. 이를 반복하여 n-2..n-3..2번째 원소까지 정렬이 완료되면 정렬이 완료된 것이다.

![Alt text](/assets/images/bubblesort1.gif){: width="400px", height="500px"}

## Analysis

버블소트는 최악과 평균 시간복잡도가 $O(n^2)$인 정렬 알고리즘이다.  

최악과 평균 시간복잡도가 $O(nlog_{2}n)$인 실용적인 정렬 알고리즘 보다 성능이 좋지않고  
시간복잡도가 $O(n^2)$인 삽입정렬도 버블소트보다는 빠르게 동작하기 때문에 버블소트는 다소 실용적인 정렬 알고리즘이 아니다.

다른 정렬들과 비교해(삽입정렬을 제외한) 버블소트의 최대 장점은 배열이 정렬되어 있는 것을 탐지해낼 수 있는 능력이다.  
리스트가 정렬이 완료되어 있을 때의 버블정렬은 O(n)이다.

## Step-by-step example
Take an array of numbers " 5 1 4 2 8", and sort the array from lowest number to greatest number using bubble sort. In each step, elements written in bold are being compared. Three passes will be required;

```
First Pass
( 5 1 4 2 8 ) → ( 1 5 4 2 8 )
Here, algorithm compares the first two elements, and swaps since 5 > 1.
( 1 5 4 2 8 ) → ( 1 4 5 2 8 )
Swap since 5 > 4
( 1 4 5 2 8 ) → ( 1 4 2 5 8 )
Swap since 5 > 2
( 1 4 2 5 8 ) → ( 1 4 2 5 8 )
Now, since these elements are already in order (8 > 5)
algorithm does not swap them.

Second Pass
( 1 4 2 5 8 ) → ( 1 4 2 5 8 )
( 1 4 2 5 8 ) → ( 1 2 4 5 8 )
Swap since 4 > 2
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )

Now, the array is already sorted, 
but the algorithm does not know if it is completed. 
The algorithm needs one whole pass without 
any swap to know it is sorted.

Third Pass
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )
( 1 2 4 5 8 ) → ( 1 2 4 5 8 )

```

## Implementation

Pseudocode implementation

In pseudocode the algorithm can be expressed as (0-based array):

```
procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped = false
        for i := 1 to n - 1 inclusive do
            /* if this pair is out of order */
            if A[i - 1] > A[i] then
                /* swap them and remember something changed */
                swap(A[i - 1], A[i])
                swapped := true
            end if
        end for
    until not swapped
end procedure
```

Optimizing bubble sort

The bubble sort algorithm can be easily optimized by observing that the n-th pass finds the n-th largest element and puts it into its final place. So, the inner loop can avoid looking at the last n − 1 items when running for the n-th time:

```
procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n - 1 inclusive do
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                swapped = true
            end if
        end for
        n := n - 1
    until not swapped
end procedure
```

## Java로 구현 - 재귀적(Top-down, Recursive)
**설명**: 재귀적으로 서브배열의 크기가 1이 될 때까지 계속 분할을 진행합니다.  
분할된 배열들을 정렬하고 합병합니다.
{: .notice--warning}
```java
// @author lemidia
public class MergeSort {
    static void divide(int data[], int p, int r){
        if(p < r){
            int q = (p+r)/2; // Middle
            divide(data, p, q); // Left
            divide(data, q+1, r); // Right
            merge(data, p, q, r); // Merge
        }
    }

    static void merge(int data[], int p, int q, int r){
        int i = p; int j = q+1; int k = p;
        int temp[] = new int[data.length];

        for (int l = p; l < r+1 ; l++) {
            if (i <= q && (j > r || data[i] < data[j])){
                temp[k++] = data[i++];
            }else
                temp[k++] = data[j++];
        }
        for(int l = p; l <= r; l++){
            data[l] = temp[l];
        }

        /*
        while (i<=q && j<=r){
            if(data[i] <= data[j]){
                temp[k++] = data[i++];
            }else{
                temp[k++] = data[j++];
            }
        }
        while (i<=q)
            temp[k++] = data[i++];
        while (j<=r)
            temp[k++] = data[j++];
        for(int l = p; l<=r; l++){
            data[l] = temp[l];
        }
        */

    }

    public static void main(String[] args) {
        int limit = 10;
        int arr[] = new int[limit];

        for(int i = limit-1; i >= 0; --i){
            arr[i] = limit-i;
        }
        divide(arr, 0, limit-1);
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}
```

```java
1 2 3 4 5 6 7 8 9 10 
```

## 시간복잡도
```markdown 
최악 시간복잡도	O(n log n)
최선 시간복잡도	O(n log n)
평균 시간복잡도	일반적으로, O(n log n)
```
**쉬운 설명**: 배열의 원소가 n개일 때 깊이는 log(n)만큼 진행 됩니다. (매번 2개씩 분할 되므로)  
각 깊이마다 n개의 원소들이 제자리를 찾아 스왑됩니다.  
그래서 시간복잡도는 깊이 * n개의 원소 즉, **nlog(n)**이 됩니다.
{: .notice--warning}

## References

[Merge Sort - wikipedia](https://en.wikipedia.org/wiki/Merge_sort)