---
title:  "트리의 순회(Tree Traversal)"
excerpt: "대표적인 트리 순회 방법을 알아보자"
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
 - Algorithm

tags:
  - programming
  - Traversal
  - DFS
  - Tree
  
last_modified_at: 2019-04-11T08:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo2.jpg
  overlay_filter: 0.3 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"

use_math: true
---

# 트리의 순회(Tree Traversal)

트리를 순회하는데 여러가지 방법이 있지만 이번 포스트에서는 그 중 깊이우선탐색(DFS)의 성질을 가진 3가지 순회 방법을 알아본다.

다음은 트리를 순회하는 대표적인 3가지 방법이다. (깊이우선탐색(DFS))

1. Inorder - 중위 순회
2. Preorder - 전위 순회
3. Postorder - 후위 순회

3가지 순회들은 다음의 공통된 패턴을 가지고 있다.

(L) 현재 노드의 왼쪽 서브트리를 재귀적으로 순회한다.  
(R) 현재 노드의 오른쪽 서브트리를 재귀적으로 순회한다.  
(N) 현재 노드를 방문한다.  

모든 노드에 대해서, 이 패턴들이 실행되는 순서에 따라 3가지 순회 방법이 결정되게 된다.

여기서 **'재귀적으로'**라는 말은 작업이 다른 **서브루틴으로 분기**된다는 뜻이다.  
서브루틴에서의 작업이 끝나게 되면 다시 현재의 작업으로 **백트랙**하게 된다.
{: .notice--info}

## Inorder - 중위 순회

트리의 중위 순회를 위해서 루트 노드 부터 모든 노드에 대해 다음의 작업을 수행한다.

```
중위 순회(LNR)

현재 노드가 null인지 확인한다.  
아니라면 다음의 순서대로 순회를 한다.  

(L) 현재 노드의 왼쪽 서브트리를 재귀적으로 순회한다.  
(N) 현재 노드를 방문한다.  
(R) 현재 노드의 오른쪽 서브트리를 재귀적으로 순회한다.  
```
다음의 그림은 Inorder의 예를 보여준다.

![Alt text](/assets/images/treeTraversal1.png){: width="350px" height="350px" .align-center}

위의 그림에서 볼 수 있듯이, 어떤 노드가 처리되기 전에 왼쪽 서브트리가 먼저 처리되고(L) 그 다음 해당 노드가 처리되고(N) 그 다음 오른쪽 서브트리 처리된다(R).  

모든 노드에 대해서 (L), (R) 연산들은 재귀적으로 수행이 된다.
{: .notice--warning}

다음은 위를 구현한 자바 코드이다.

```java
// Recursive function to perform in-order traversal of the tree
public static void inorder(TreeNode root)
{
	// 현재 노드가 null이면 리턴
	if (root == null) {
		return;
	}

	// 재귀적으로 왼쪽 서브트리를 탐색한다.
	inorder(root.left);

	// 현재 노드의 데이터를 출력한다. (방문)
	System.out.print(root.data + " ");

	// 재귀적으로 오른쪽 서브트리를 탐색한다.
	inorder(root.right);
}
```

## Preorder - 전위 순회

트리의 전위 순회를 위해서 루트 노드 부터 모든 노드에 대해 다음의 작업을 수행한다.

```
전위 순회(NLR)

현재 노드가 null인지 확인한다.  
아니라면 다음의 순서대로 순회를 한다.  

(N) 현재 노드를 방문한다.  
(L) 현재 노드의 왼쪽 서브트리를 재귀적으로 순회한다.  
(R) 현재 노드의 오른쪽 서브트리를 재귀적으로 순회한다.  
```
다음의 그림은 Preorder의 예를 보여준다.

![Alt text](/assets/images/preorder.png){: width="350px" height="350px" .align-center}

위의 그림에서 볼 수 있듯이, 해당 노드가 처리되고(N) 그 다음 왼쪽 서브트리가 처리되고(L) 마지막으로 오른쪽 서브트리가 처리된다(R).

모든 노드에 대해서 (L), (R) 연산들은 재귀적으로 수행이 된다.
{: .notice--warning}

다음은 위를 구현한 자바 코드이다.

```java
// Recursive function to perform pre-order traversal of the tree
public static void preorder(TreeNode root)
{
	// return if the current node is empty
	if (root == null) {
		return;
	}
	// 현재 노드의 데이터를 출력한다. (방문)
	System.out.print(root.data + " ");

	// 재귀적으로 왼쪽 서브트리를 탐색한다.
	preorder(root.left);

	// 재귀적으로 오른쪽 서브트리를 탐색한다.
	preorder(root.right);
}
```

## Postorder - 후위 순회

트리의 후위 순회를 위해서 루트 노드 부터 모든 노드에 대해 다음의 작업을 수행한다.

```
후위 순회(LRN)

현재 노드가 null인지 확인한다.  
아니라면 다음의 순서대로 순회를 한다.  

(L) 현재 노드의 왼쪽 서브트리를 재귀적으로 순회한다.  
(R) 현재 노드의 오른쪽 서브트리를 재귀적으로 순회한다.  
(N) 현재 노드를 방문한다.  
```
다음의 그림은 Postorder의 예를 보여준다.

![Alt text](/assets/images/treeTraversal2.png){: width="350px" height="350px" .align-center}

위의 그림에서 볼 수 있듯이, 해당 노드가 처리되기 전에 왼쪽 서브트리가 먼저 처리되고(L) 그 다음 오른쪽 서브트리 처리되고(R) 마지막으로 해당 노드가 처리된다(N).

모든 노드에 대해서 (L), (R) 연산들은 재귀적으로 수행이 된다.
{: .notice--warning}

다음은 위를 구현한 자바 코드이다.

```java
// Recursive function to perform post-order traversal of the tree
public static void postorder(TreeNode root)
{
	// return if the current node is empty
	if (root == null) {
		return;
	}

	// 재귀적으로 왼쪽 서브트리를 탐색한다.
	postorder(root.left);

	// 재귀적으로 오른쪽 서브트리를 탐색한다.
	postorder(root.right);

  // 현재 노드의 데이터를 출력한다. (방문)
	System.out.print(root.data + " ");
}
```


## References
[GeeksforGeeks](https://www.geeksforgeeks.org/)  
