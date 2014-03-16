Tree Service
============

## The challenge 

We will be creating a RESTful service that allows a user to create and maintain binary trees for layout by the client.  The server will decide the positions of the tree nodes and the client will use those positions to layout a tree.

### The binary tree

A binary tree is either empty or it is composed of a root element and two successors, which are binary trees themselves.  Your job will be to create or use a binary tree (extra credit for creating one yourself).

The following are example Scala classes to represent binary trees (I used Scala to communicate the type information).  An End is equivalent to an empty tree. A Branch has a value, and two descendant trees.

```scala
sealed abstract class Tree[+T]
case class Node[+T](value: T, left: Tree[T], right: Tree[T]) extends Tree[T]

case object End extends Tree[??????]

object Node {
  def apply[T](value: T): Node[T] = Node(value, End, End)
}
```

An example tree:

```scala
Node('a',
     Node('b', Node('d'), Node('e')),
     Node('c', End, Node('f', Node('g'), End)))
```

A tree with only a root node would be Node('a') and an empty tree would be End.

### The REST api

Clients will use this api to create and maintain multiple trees on the server.

```
POST /tree
['n','k','m','c','a','h','g','e','u','p','s','q']
```

Will create a new tree and return that tree as a JSON object

```
PUT /tree/<id>
['n','k','m','c','a','h','g','e','u','p','s','q']
```

Will replace the tree with <id> and return that tree as a JSON object

```
GET /tree/
```

Will return the tree with <id> as a JSON object

```
DELETE /tree/<id>
```

Will delete the tree with <id>

```
GET /tree
```

Will return a list of all the tree ids as a JSON object

All the nodes of the tree should be naturally comparable.  If they are not you should return an error as a JSON object.  For example the following should cause an error:

```
['n',9,'m','c','a','h','g','e','u','p','s','q']
```

### The layout

The server will tell the clients how to draw the trees and so a layout algorithm is required to determine the position of each node in a rectangular grid.  While several layout methods could be used we will implement one as described below:

The position of a node v is obtained by the following two rules:

- x(v) is equal to the position of the node v in the inorder sequence
- y(v) is equal to the depth of the node v in the tree

In order to store the position of the nodes, we add a new class with the additional information.

```scala
case class PositionedNode[+T](override val value: T, override val left: Tree[T], override val right: Tree[T], x: Int, y: Int) extends Node[T](value, left, right)
```

Write a method layoutBinaryTree that turns a tree of normal Nodes into a tree of PositionedNodes.

```scala
scala> Node('a', Node('b', End, Node('c')), Node('d')).layoutBinaryTree
res0: PositionedNode[Char] = T[3,1](a T[1,2](b . T[2,3](c . .)) T[4,2](d . .))
```

![Tree](./binary_tree_layout.gif)

The tree in the above picture may be constructed as:

```scala
Tree.fromList(List('n','k','m','c','a','h','g','e','u','p','s','q')). 
```

Use it to check your code.
