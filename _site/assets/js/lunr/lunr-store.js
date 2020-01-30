var store = [{
        "title": "연결 리스트(Linked List)",
        "excerpt":"Linked List 배열과 같이 선형 자료구조 이다. 원소들이 메모리 공간상에 연속적으로 저장 되어있지 않고, 그림과 같이 각 원소들이 포인터로 링크되어 있는 자료 구조이다. 하나의 원소를 노드라고 표현하고, 데이터를 저장하는 Data 필드와 그 다음 노드를 가리키는 Next필드로 구성되어 있다. 추가적으로 연결 리스트의 맨 처음 노드를 가리키는 헤드라는 포인터를 두고 있다. 그림을...","categories": ["Data Structure"],
        "tags": ["programming","Data Structure","Linked List"],
        "url": "http://localhost:4000/data%20structure/LinkedList/",
        "teaser":null},{
        "title": "스택(Stack)",
        "excerpt":"스택(Stack) 스택은 원소의 특정한 순서를 유지하고 특정 연산을 가지고 있는 선형 자료구조이다. 스택은 후입선출의 선형 자료 구조로서, 한쪽 끝에서만 삽입 및 삭제가 수행된다. 나중에 들어간 원소가 먼저 들어온 원소보다 먼저 나간다 하여 후입선출이라 불리게 된다. 스택은 또한 Top이라 불리는 포인터를 가지고 있는데 이는, 스택의 맨 위의 원소를 가리킨다.(그림상) 스택의 기본...","categories": ["Data Structure"],
        "tags": ["programming","Data Structure","Linked List","Array","Stack"],
        "url": "http://localhost:4000/data%20structure/Stack/",
        "teaser":null},{
        "title": "선형구조와 탐색",
        "excerpt":"선형구조의 탐색 선형구조란 자료의 순서를 유일하게 결정할 수 있는 형태의 구조를 말한다. $i$번째 자료 를 탐색한 다음, $i+1$번째로 탐색해야할 자료가 유일한 형태를 의미한다. 2차원, 3차원 구조라도 순서가 일정하게 정해져 있으면 이는 선형이라고 할 수 있다. 선형구조는 주로 배열과 리스트의 형태로 저장된다. 일반적으로 1차원 배열에 자료를 저장하는 1차원 선형구조와 2차원 이상의...","categories": ["Algorithm"],
        "tags": ["이분탐색","순차탐색","Data structure","programming"],
        "url": "http://localhost:4000/algorithm/%EC%84%A0%ED%98%95%EA%B5%AC%EC%A1%B0%EC%9D%98-%ED%83%90%EC%83%89/",
        "teaser":null},{
        "title": "Graph - 그래프",
        "excerpt":"Graph 정점들과 간선들로 이루어진 집합이다. Definition V: Vertex, E: Edge, G: Graph 그래프 G는 G(V, E)의 집합으로 정의 될 수 있다 =&gt; G = (V, E) V(G)는 정점의 집합 그리고 E(G)는 두 정점들의 연결을 나타내는 간선의 집합이다. Info: 그래프는 트리를 포함하는 개념이고, 트리는 사이클을 포함하지 않는 그래프라고 볼 수 있다....","categories": ["Data Structure"],
        "tags": ["programming","Data Structure"],
        "url": "http://localhost:4000/data%20structure/graph/",
        "teaser":null},{
        "title": "Restful API Authentication App",
        "excerpt":"Restful API Authentication App Used Packages, Libraris, Dependencies and Database in the project. Node.js Express.js: Node.js package nodemon: To restart server Mongoose: DB package MongoDB: To save user data bcryptjs: Encrypt the user’s password so that 3rd party don’t see dotenv: Configuration private setting data @hapi/joi: To validate user input...","categories": ["Development"],
        "tags": ["Development","JavaScript","Node.js","API"],
        "url": "http://localhost:4000/development/restfulauth/",
        "teaser":null},{
        "title": "Queue",
        "excerpt":"Queue 큐(queue)는 컴퓨터의 기본적인 자료 구조의 한가지로, 먼저 집어 넣은 데이터가 먼저 나오는 FIFO (First In First Out)구조로 저장하는 형식을 말한다. 영어 단어 queue는 표를 사러 일렬로 늘어선 사람들로 이루어진 줄을 말하기도 하며, 먼저 줄을 선 사람이 먼저 나갈 수 있는 상황을 연상하면 된다. Representation Array: 기본적으로 배열을 사용해서 큐를...","categories": ["Data Structure"],
        "tags": ["programming","Data Structure"],
        "url": "http://localhost:4000/data%20structure/queue/",
        "teaser":null},{
        "title": "자바스크립트를 이용한 날씨 웹 앱",
        "excerpt":"앱 개요 웹 화면 상으로 사용자의 지역 날씨 상태를 보여주는 웹 어플리케이션. Look 설명 사용자가 웹 앱에 접속하면 사용자로부터 위치정보 엑세스에 대한 허용 여부를 묻는다. 허용이 되면 자바스크립트의 navigator.geolocation으로 부터 사용자의 위도와 경도 값을 읽어낸다. DarkSky API로 부터 받은 사용자 키 값에 위도와 경도값을 넣어준다. API로 부터 읽어낸 JSON 데이터를...","categories": ["Development"],
        "tags": ["JavaScript","Web","API"],
        "url": "http://localhost:4000/development/weather-app/",
        "teaser":null},{
        "title": "Eratosthenes's Sieve",
        "excerpt":"에라토스테네스의 체 수학에서 에라토스테네스의 체는 보다 빠르게 소수를 찾는 방법입니다. 고대 그리스 수학자 에라토스테네스가 발견하였습니다. 선행지식: 수학에서 소수란? 소수: 1을 제외한 수 중에서 1과 자기 자신을 제외하고 약수를 가지지 않는 수를 말합니다. 예) 예1) 2는 1과 자기 자신(2)을 제외하고는 약수를 가지지 않습니다. 소수입니다. 예2) 5는 1과 자기 자신(5)을 제외하고는 약수를...","categories": ["Algorithm"],
        "tags": ["Data Structure","Mathematics"],
        "url": "http://localhost:4000/algorithm/eratosthenes-sieve/",
        "teaser":null},{
        "title": "Merge Sort",
        "excerpt":"Merge Sort(합병 정렬) 합병 정렬 또는 병합 정렬(merge sort)은 O(n log n) 비교 기반 정렬 알고리즘입니다. 일반적인 방법으로 구현했을 때 이 정렬은 안정 정렬에 속하며, 분할 정복 알고리즘의 하나입니다. 존 폰 노이만이 1945년에 개발했습니다. Algorithm 밑의 애니메이션을 먼저 보시고 알고리즘을 읽으시면 이해가 빠를 수 있습니다. 리스트의 길이가 1 이하이면 이미...","categories": ["Algorithm"],
        "tags": ["Sort","Mathematics"],
        "url": "http://localhost:4000/algorithm/merge-sort/",
        "teaser":null},{
        "title": "비선형 구조와 탐색",
        "excerpt":"비선형 구조와 탐색 비선형 구조란 i번째 원소를 탐색한 다음 그 원소와 연결된 다른 원소를 탐색하려고 할 때, 여러 개의 원소가 존재하는 탐색구조를 말한다. 일반적으로 자료가 트리나 그래프로 구성되어 있을 경우를 비선형 구조라 하고 이러한 트리나 그래프의 모든 정점을 탐색하는 것을 비선형 탐색이라고 이해하면 된다. 비선형 구조는 선형과 달리 자료가 순차적으로...","categories": ["Algorithm"],
        "tags": ["DFS","BFS","Data structure","programming"],
        "url": "http://localhost:4000/algorithm/%EB%B9%84%EC%84%A0%ED%98%95%EA%B5%AC%EC%A1%B0%EC%9D%98-%ED%83%90%EC%83%89/",
        "teaser":null},{
        "title": "전체탐색법",
        "excerpt":"전체탐색법 전체탐색법은 모든 문제해결의 기초가 되는 가장 중요한 설계법 중 하나라고 할 수 있다. 주어진 문제에서 해가 될 수 있는 모든 가능성을 검사하여 해를 구하기 때문에 항상 정 확한 해를 구할 수 있다는 점이 장점이다. 하지만 탐색해야할 내용이 너무 많으면 문제에서 제시한 시간 이내에 해결할 수 없다는 점을 유의해야 한다....","categories": ["Algorithm"],
        "tags": ["DFS","BFS","Data structure","programming","Brute force"],
        "url": "http://localhost:4000/algorithm/%EC%A0%84%EC%B2%B4%ED%83%90%EC%83%89%EB%B2%95/",
        "teaser":null},{
        "title": "탐색공간의 배제",
        "excerpt":"Notice: 이 글은 [전체탐색법]의 후행 내용으로서, 먼저 제 블로그의 전체탐색법을 보시고 이 포스트를 보시는 것을 추천드립니다! 탐색공간의 배제 전체탐색법은 대부분의 경우 해를 구할 수 있는 알고리즘이다. 하지만 실행시간이 너무 길어 제한 시간 내에 문제를 해결할 수 없는 경우가 많다. 탐색공간의 배제는 전체탐색 알고리즘을 구현하는 데 있어서 더 이상 탐색하지 않더라도...","categories": ["Algorithm"],
        "tags": ["Backtracking","Greedy","Data structure","Programming","Brute force"],
        "url": "http://localhost:4000/algorithm/%ED%83%90%EC%83%89%EA%B3%B5%EA%B0%84%EC%9D%98-%EB%B0%B0%EC%A0%9C/",
        "teaser":null},{
        "title": "Union Find",
        "excerpt":"Union-Find 컴퓨터 과학에서 서로소 찾기 집합 혹은 병합 찾기 집합이라 불리며 중복되지 않은 부분집합들의 원소 정보를 조작하고 저장하는 자료구조입니다. 부분집합(Subset)에서 특정 원소 하나를 A, 또 다른 원소 하나를 B라 하겠습니다. 이 A나 B가 어느 부분집합에 속하는지, 또 A와 B가 각각 속한 부분집합 다르다면 이 두 부분집합을 하나의 집합으로 합쳐, 원소들이...","categories": ["Data Structure"],
        "tags": ["programming","Data Structure"],
        "url": "http://localhost:4000/data%20structure/unionfind/",
        "teaser":null}]
