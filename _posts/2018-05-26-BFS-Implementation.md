---
title:  "너비우선탐색(Breadth First Search, BFS) - 구현"
excerpt: "너비우선탐색을 이해하고 자바로 이를 구현 해본다."
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
 - Algorithm

tags:
  - Search Algorithm
  - BFS
  - Queue
  - Iterative
  - Graph
  - Tree
  
last_modified_at: 2019-05-10T08:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo1.jpg
  overlay_filter: 0.2 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

**너비우선탐색 글 참고하기**

- [Breadth First Search]({{site.url}}{{base.url}}/algorithm/BFS/)  

**그래프의 구현 글 참고하기**

- [Graph]({{site.url}}{{base.url}}/data%20structure/graph/)  


***

이번 글에서는 **Queue**를 사용한 BFS를 이해하고 구현해 봅니다.
{: .notice--warning}

# 너비우선탐색(Breadth First Search)

너비우선탐색(BFS)은 트리나 그래프 혹은 다른 구조 상에서 탐색을 위한 알고리즘이다. 이 알고리즘은 루트 노드를 시작으로(그래프의 경우에는 임의의 노드를 루트 노드로 정하게 된다.) 다음 레벨로 가기전에 현재 레벨에서 인접한 모든 이웃노드들을 탐색한다.

더 이상 탐색할 노드가 없어 백트랙 하기 전까지 가지를 따라 가능한 한 깊이 탐색하는 깊이우선탐색과는 다르게 너비우선탐색은 해당 정점에서 인접한 정점들을 모두 방문하는 레벨 탐색 즉, 깊이보다는 넓게 탐색하는 전략을 쓴다. 이를 위해 너비우선탐색은 큐(Queue) 자료구조를 이용하여 탐색 방법을 구성하게 된다.

시간 및 공간 복잡도 분석은 많은 응용분야에 따라 다른데, 이론적인 컴퓨터 과학 분야에서 BFS는 전체 그래프를 탐색하는데 사용되기 때문에 수행 시간은 선형인 $O(\|V\|+\|E\| )$가 된다. 공간 복잡도면을 보면 BFS는 어떤 해당 정점에서 인접 정점들의 정보를 모두 Queue에 저장하기 때문에, 최악의 설정으로 하나의 정점이 다른 모든 정점과 직접 연결되어 있다면  최악 $O(\|V\|)$의 공간을 요구한다. ($\|V\|$는 정점의 수, $\|E\|$는 간선의 수이다.)

너비우선탐색(BFS)의 시간 및 공간 상한은 깊이우선탐색(BFS)과 같기 때문에, 탐색 알고리즘의 사용면에서 두 알고리즘이 만드는 정점 방문 순서의 다름과 그 복잡성을 생각해 어느 알고리즘을 사용해야 할지 생각해야한다.

## 알고리즘

BFS 알고리즘은 다음과 같은 순서로 실행된다.

1. 그래프의 정점 중 하나를 Queue에 추가한다. (시작 정점)

2. Queue에서 제일 앞에 있는 아이템 v를 pop하고 방문 완료 배열에 넣는다.

3. 현재 정점 v에 인접한 모든 정점 중에서 방문 완료 되지 않았고, Queue에 추가되지 않은 인접 정점을 Queue에 추가한다.

4. Queue가 빈 공간이 될 때 까지 2, 3번을 반복한다.

## 예제

**예를 들어 BFS 알고리즘을 이해 해보자.**

**인접 정점 추가 우선순위:** 현재 정점과 인접한 정점이 **여러개면** 번호가 **작은 순서대로** Queue에 추가한다.
{: .notice--warning}

먼저 1번 정점을 루트로 하여 BFS 탐색을 시작한다.  

![Alt text](/assets/images/breadth-first-search14.png){: width="400px" height="300px" .align-center}

- 1번 정점을 Queue에 넣는다.  
```Queue: [1]```

![Alt text](/assets/images/breadth-first-search1.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 1번을 pop하고, 1번 정점을 방문한다.  
1번 정점과 인접한 정점 중에서 방문하지 않은 2, 3, 4번을 순서대로 Queue에 넣는다.  
```Queue: [2, 3, 4]```

![Alt text](/assets/images/breadth-first-search2.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 2번을 pop하고, 2번 정점을 방문한다.  
2번 정점과 인접한 정점 중에서 방문하지 않은 5, 6번을 순서대로 Queue에 넣는다.  
```Queue: [3, 4, 5, 6]```

![Alt text](/assets/images/breadth-first-search3.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 3번을 pop하고, 3번 정점을 방문한다.  
3번 정점과 인접한 정점 중에서 방문하지 않은 정점이 없으므로 다음 스탭으로 간다.  
```Queue: [4, 5, 6]```

![Alt text](/assets/images/breadth-first-search4.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 4번을 pop하고, 4번 정점을 방문한다.  
4번 정점과 인접한 정점 중에서 방문하지 않은 7, 8번을 순서대로 Queue에 넣는다.  
```Queue: [5, 6, 7, 8]```

![Alt text](/assets/images/breadth-first-search5.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 5번을 pop하고, 5번 정점을 방문한다.  
5번 정점과 인접한 정점 중에서 방문하지 않은 9, 10번을 순서대로 Queue에 넣는다.  
```Queue: [6, 7, 8, 9, 10]```

![Alt text](/assets/images/breadth-first-search6.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 6번을 pop하고, 6번 정점을 방문한다.  
6번 정점과 인접한 정점 중에서 방문하지 않은 정점이 없으므로 다음 스탭으로 간다.  
```Queue: [7, 8, 9, 10]```

![Alt text](/assets/images/breadth-first-search7.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 7번을 pop하고, 7번 정점을 방문한다.  
7번 정점과 인접한 정점 중에서 방문하지 않은 11, 12번을 순서대로 Queue에 넣는다.  
```Queue: [8, 9, 10, 11, 12]```

![Alt text](/assets/images/breadth-first-search8.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 8번을 pop하고, 8번 정점을 방문한다.  
8번 정점과 인접한 정점 중에서 방문하지 않은 정점이 없으므로 다음 스탭으로 간다.  
```Queue: [9, 10, 11, 12]```

![Alt text](/assets/images/breadth-first-search9.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 9번을 pop하고, 9번 정점을 방문한다.  
9번 정점과 인접한 정점 중에서 방문하지 않은 정점이 없으므로 다음 스탭으로 간다.  
```Queue: [10, 11, 12]```

![Alt text](/assets/images/breadth-first-search10.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 10번을 pop하고, 10번 정점을 방문한다.  
10번 정점과 인접한 정점 중에서 방문하지 않은 정점이 없으므로 다음 스탭으로 간다.  
```Queue: [11, 12]```

![Alt text](/assets/images/breadth-first-search11.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 11번을 pop하고, 11번 정점을 방문한다.  
11번 정점과 인접한 정점 중에서 방문하지 않은 정점이 없으므로 다음 스탭으로 간다.  
```Queue: [12]```

![Alt text](/assets/images/breadth-first-search12.png){: width="400px" height="300px" .align-center}

- Queue에서 제일 앞에 있는 12번을 pop하고, 12번 정점을 방문한다.  
12번 정점과 인접한 정점 중에서 방문하지 않은 정점이 없으므로 다음 스탭으로 간다.  
```Queue: [ ]```

![Alt text](/assets/images/breadth-first-search13.png){: width="400px" height="300px" .align-center}

- Queue가 비었으므로 너비우선탐색(BFS)가 완료되었다.

## 구현

**의사코드**

Input: 그래프 G, 그래프 G의 시작 루트 정점 v  

다음은 Queue를 이용한 BFS의 의사코드이다.

```c++
1 procedure BFS(G, start_v) is
2      let Q be a queue
3      label start_v as discovered
4      Q.enqueue(start_v)
5      while Q is not empty do
6          v := Q.dequeue()
7          for all edges from v to w in G.adjacentEdges(v) do
8             if w is not labeled as discovered then
9                 label w as discovered
10                Q.enqueue(w)
```

한 구문씩 보자.

- ```let Q be a queue```: Queue를 생성한다.

- ```label start_v as discovered```: 시작 루트 정점을 방문표시 한다.

- ```Q.enqueue(start_v)```: 시작 루트 정점을 Queue에 넣는다.

- ```while Q is not empty do```: Queue가 빈 공간이 아닐 때 까지 아래를 반복한다.

- ```v := Q.dequeue()```: 현재 방문할 정점 v를 Queue에서 꺼낸다.

- ```for all edges from v to w in G.adjacentEdges(v) do```: v와 인접한 모든 정점 w에 대하여

- ```if w is not labeled as discovered then```: w가 방문표시 되지 않았으면

  - ```label w as discovered```: w를 방문표시 하고

  - ```Q.enqueue(w)```: w를 Queue에 넣는다.

위 의사코드에서는 Queue에 인접 정점의 중복 저장이 되는 것을 방지하기 위해 w를 Queue에 넣음과 동시에 방문표시를 해주고 있다.
{: .notice--warning}

***

### BFS 알고리즘 - Java

위 의사코드를 바탕으로 한 **BFS 알고리즘** 코드는 다음과 같다. 

```java
public void BFS(int start){
    Queue<Integer> queue = new LinkedList<Integer>();
    boolean visited[] = new boolean[V];
    queue.offer(start);
    visited[start] = true;
    while (!queue.isEmpty()){
        int V = queue.poll();
        for (int i : adj[V]) {
            if (!visited[i]){
                queue.offer(i);
                visited[i] = true;
            }
        }
    }
}
```

**위의 코드 설명**

```java
Queue<Integer> queue = new LinkedList<Integer>();
boolean visited[] = new boolean[V];
}
```

정점 방문 순서를 위한 Queue와 정점 방문 표시를 할 visited[] 배열을 선언한다.


```java
queue.offer(start);
visited[start] = true;
```
시작 정점을 Queue 추가하고 방문 표시를 한다.

```java
for (int i = 0; i <adjList[start].size() ; i++) {}
```
현재 탐색 중인 인접 정점들에 대하여

```java
while (!queue.isEmpty()){}
```
Queue가 빌 때 까지 다음 연산을 실행한다.

```java
int V = queue.poll();
for (int i : adj[V]) {
    if (!visited[i]){
        queue.offer(i);
        visited[i] = true;
    }
}
```

Queue에서 제일 앞에 있는 정점을 꺼내 V로 하고, V에 인접한 모든 정점에 대하여 방문하지 정점은 Queue에 추가하고 방문 표시를 함께 한다.

***

**위의 예제 그래프를 사용한 전체 코드는 다음과 같다.**

- BFS 메소드에 print문을 추가하여 정점 방문 순서를 출력하게 하였다.

### BreadthFirstSearch.java
```java
import java.util.*;
import java.util.LinkedList;

public class BreadthFirstSearch{
    static class Graph{
        public int V;
        public LinkedList <Integer> adj[];


        Graph(int v){
            V = v+1;
            adj = new LinkedList[V];
            for(int i = 0; i<V; i++){
                adj[i] = new LinkedList();
            }

        }

        public void addEdge(int a, int b){
            adj[a].add(b);
            adj[b].add(a);
        }


        public void BFS(int start){
            Queue<Integer> queue = new LinkedList<Integer>();
            boolean visited[] = new boolean[V];
            queue.offer(start);
            visited[start] = true;
            while (!queue.isEmpty()){
                int V = queue.poll();
                System.out.print(V + " ");
                for (int i : adj[V]) {
                    if (!visited[i]){
                        queue.offer(i);
                        visited[i] = true;
                    }
                }
            }
        }
    }

    public static void main(String[] args){

        Graph g = new Graph(12);
        g.addEdge(1, 2);
        g.addEdge(1, 3);
        g.addEdge(1, 4);
        g.addEdge(2, 1);
        g.addEdge(2, 5);
        g.addEdge(2, 6);
        g.addEdge(3, 1);
        g.addEdge(4, 1);
        g.addEdge(4, 7);
        g.addEdge(4, 8);
        g.addEdge(5, 2);
        g.addEdge(5, 9);
        g.addEdge(5, 10);
        g.addEdge(6, 2);
        g.addEdge(7, 4);
        g.addEdge(7, 11);
        g.addEdge(7, 12);
        g.addEdge(8, 4);
        g.addEdge(9, 5);
        g.addEdge(10, 5);
        g.addEdge(11, 7);
        g.addEdge(12, 7);
        System.out.print("Breath First Search : ");
        g.BFS(1);
    }
}
```

```
Output:

Breath First Search : 1 2 3 4 5 6 7 8 9 10 11 12 
```

## References 

- [Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search#Properties)  
- [JavaTpoint](https://www.javatpoint.com/depth-first-search-algorithm)  
