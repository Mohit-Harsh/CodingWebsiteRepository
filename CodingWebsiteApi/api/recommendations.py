import pandas as pd
from .models import ApiProblems
from .serializers import ProblemSerializer
from sklearn.neighbors import NearestNeighbors
import joblib
import numpy as np
from psycopg2.extensions import register_adapter, AsIs
from rest_framework.response import Response
register_adapter(np.int64, AsIs)

def recommend_by_topic(topics):

    row = {'Array': 0, 'Backtracking': 0, 'Binary Indexed Tree': 0,
           'Binary Search': 0, 'Binary Search Tree': 0, 'Bit Manipulation': 0,
           'Brainteaser': 0, 'Breadth-first Search': 0, 'Depth-first Search': 0,
           'Dequeue': 0, "Design": 0, 'Divide and Conquer': 0, 'Dynamic Programming': 0,
           'Geometry': 0, 'Graph': 0, 'Greedy': 0, 'Hash Table': 0, 'Heap': 0, 'Line Sweep': 0,
           'Linked List': 0, 'Math': 0, 'Meet in the Middle': 0, 'Memoization': 0, 'Minimax': 0,
           'OOP': 0, 'Ordered Map': 0, 'Queue': 0, 'Random': 0, 'Recursion': 0, 'Rejection Sampling': 0,
           'Reservoir Sampling': 0, 'Rolling Hash': 0, 'Segment Tree': 0, 'Sliding Window': 0,
           'Sort': 0, 'Stack': 0, 'String': 0, 'Suffix Array': 0, 'Topological Sort': 0, 'Tree': 0,
           'Trie': 0, 'Two Pointers': 0, 'Union Find': 0}

    nn = joblib.load('problem_recommender.pkl')

    for t in topics:
        row[t] = [1]

    X = pd.DataFrame(row)

    result = nn.kneighbors(X)

    index = [x+1 for x in result[1][0]]

    recommendations = ApiProblems.objects.filter(id__in=index)

    print(recommendations)

    return recommendations


