const QUESTIONS = [
    {
        Id: 1,
        Title: 'Remove Duplicates from Sorted Array',
        Question: {
            Desc: `
            <p>Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.
            </p>
            <p>Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
            </p>
            <p>Return k after placing the final result in the first k slots of nums.
            </p>
            <p>Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.</p>

            <h4>Custom Judge:</h4>
            <pre>
            int[] nums = [...]; // Input array
            int[] expectedNums = [...]; // The expected answer with correct length
            
            int k = removeDuplicates(nums); // Calls your implementation
            
            assert k == expectedNums.length;
            for (int i = 0; i < k; i++) {
                assert nums[i] == expectedNums[i];
            }
            </pre>
            <p>If all assertions pass, then your solution will be accepted.</p>
        `,

            Examples: [
                `Input: nums = [1,1,2]
          Output: 2, nums = [1,2,_]
          Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
          It does not matter what you leave beyond the returned k (hence they are underscores).`,
                `Input: nums = [0,0,1,1,1,2,2,3,3,4]
          Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
          Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
          It does not matter what you leave beyond the returned k (hence they are underscores).`,
            ],
            Editor: `/**
        * @param {number[]} nums
        * @return {number}
        */
       var removeDuplicates = function(nums) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Array',
    },
    {
        Id: 2,
        Title: 'Valid Parentheses',
        Question: {
            Desc: `<p>Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid</p>
  
                    <p>An input string is valid if:</p>
                    
                    <ul>
                        <li>Open brackets must be closed by the same type of brackets</li>
                        <li>Open brackets must be closed in the correct order.</li>
                        <li>Every close bracket has a corresponding open bracket of the same type.</li>
                    </ul>
        
        `,

            Examples: [
                `Input: s = "()"
          Output: true`,
                `Input: s = "()[]{}"
          Output: true`,
            ],
            Editor: `/**
        * @param {string} s
        * @return {boolean}
        */
       var isValid = function(s) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'String',
    },
    {
        Id: 3,
        Title: 'Linked List Cycle',
        Question: {
            Desc: `<p>Given head, the head of a linked list, determine if the linked list has a cycle in it.</p>
            <p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
            </p>
            <p>Return true if there is a cycle in the linked list. Otherwise, return false.</p>
        `,

            Examples: [
                `[image:https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png/]Input: head = [3,2,0,-4], pos = 1
          Output: true
          Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).`,
                `[image:https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png/]Input: head = [1,2], pos = 0
          Output: true
          Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.`,
                `[image:https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png/]Input: head = [1], pos = -1
          Output: false
          Explanation: There is no cycle in the linked list.`,
            ],
            Editor: `/**
        * Definition for singly-linked list.
        * function ListNode(val) {
        *     this.val = val;
        *     this.next = null;
        * }
        */
       
       /**
        * @param {ListNode} head
        * @return {boolean}
        */
       var hasCycle = function(head) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Hashtable',
    },
    {
        Id: 4,
        Title: 'Best Time to Buy and Sell Stock',
        Question: {
            Desc: `
            <p>You are given an array prices where prices[i] is the price of a given stock on the ith day.
            </p>
        <p>You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
        </p>
        <p>Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.</p>
        `,

            Examples: [
                `Input: prices = [7,1,5,3,6,4]
          Output: 5
          Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
          Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.`,
                `Input: prices = [7,6,4,3,1]
          Output: 0
          Explanation: In this case, no transactions are done and the max profit = 0.`,
            ],
            Editor: `/**
        * @param {number[]} prices
        * @return {number}
        */
       var maxProfit = function(prices) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Dianmic programing',
    },
    {
        Id: 5,
        Title: 'Excel Sheet Column Title',
        Question: {
            Desc: `<p>Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.</p>
  
        <p>For example:</p>
        <pre>A -> 1
        B -> 2
        C -> 3
        ...
        Z -> 26
        AA -> 27
        AB -> 28</pre>
        `,

            Examples: [
                `Input: columnNumber = 1
          Output: "A"`,
                `Input: columnNumber = 28
          Output: "AB"`,
                `Input: columnNumber = 701
          Output: "ZY"`,
            ],
            Editor: `/**
        * @param {number} columnNumber
        * @return {string}
        */
       var convertToTitle = function(columnNumber) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Math',
    },
    {
        Id: 6,
        Title: 'Intersection of Two Arrays',
        Question: {
            Desc: `Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.`,

            Examples: [
                `Input: nums1 = [1,2,2,1], nums2 = [2,2]
         Output: [2]`,
                `Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
         Output: [9,4]
         Explanation: [4,9] is also accepted.`,
            ],
            Editor: `/**
        * @param {number[]} nums1
        * @param {number[]} nums2
        * @return {number[]}
        */
       var intersection = function(nums1, nums2) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Sorting',
    },
    {
        Id: 7,
        Title: 'Longest Palindrome',
        Question: {
            Desc: `
            <p>Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
            </p>
            <p>Letters are case sensitive, for example, "Aa" is not considered a palindrome here.</p>
            `,

            Examples: [
                `Input: s = "abccccdd"
          Output: 7
          Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.`,
                `Input: s = "a"
          Output: 1
          Explanation: The longest palindrome that can be built is "a", whose length is 1.`,
            ],
            Editor: `/**
        * @param {string} s
        * @return {number}
        */
       var longestPalindrome = function(s) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Greedy',
    },
    {
        Id: 8,
        Title: 'Implement Queue using Stacks',
        Question: {
            Desc: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
        <h4>Implement the MyQueue class</h4>:
  
        <ul>
          <li>void push(int x) Pushes element x to the back of the queue.</li>
          <li>int pop() Removes the element from the front of the queue and returns it.</li>
          <li>int peek() Returns the element at the front of the queue.</li>
          <li>boolean empty() Returns true if the queue is empty, false otherwise.</li>
        </ul>
        <h4>Note</h4>
        <ul>
          <li>You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.</li>
          <li>Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.</li>
        </ul>
        `,

            Examples: [
                `Input
          ["MyQueue", "push", "push", "peek", "pop", "empty"]
          [[], [1], [2], [], [], []]
          Output
          [null, null, null, 1, 1, false]
          
          Explanation
          MyQueue myQueue = new MyQueue();
          myQueue.push(1); // queue is: [1]
          myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
          myQueue.peek(); // return 1
          myQueue.pop(); // return 1, queue is [2]
          myQueue.empty(); // return false`,
            ],
            Editor: `var MyQueue = function() {
      
        };
        
        /** 
         * @param {number} x
         * @return {void}
         */
        MyQueue.prototype.push = function(x) {
            
        };
        
        /**
         * @return {number}
         */
        MyQueue.prototype.pop = function() {
            
        };
        
        /**
         * @return {number}
         */
        MyQueue.prototype.peek = function() {
            
        };
        
        /**
         * @return {boolean}
         */
        MyQueue.prototype.empty = function() {
            
        };
        
        /** 
         * Your MyQueue object will be instantiated and called as such:
         * var obj = new MyQueue()
         * obj.push(x)
         * var param_2 = obj.pop()
         * var param_3 = obj.peek()
         * var param_4 = obj.empty()
         */`,
        },
        Level: 'easy',
        Topic: 'Depth-first-search',
    },
    {
        Id: 9,
        Title: 'Sum of Left Leaves',
        Question: {
            Desc: `
            <p>Given the root of a binary tree, return the sum of all left leaves.</p>
            <p>A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.</p>
            `,
            
            Examples: [
                `[image:https://assets.leetcode.com/uploads/2021/04/08/leftsum-tree.jpg/]Input: root = [3,9,20,null,null,15,7]
          Output: 24
          Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.`,
                `Input: root = [1]
          Output: 0`,
            ],
            Editor: `/**
        * Definition for a binary tree node.
        * function TreeNode(val, left, right) {
        *     this.val = (val===undefined ? 0 : val)
        *     this.left = (left===undefined ? null : left)
        *     this.right = (right===undefined ? null : right)
        * }
        */
       /**
        * @param {TreeNode} root
        * @return {number}
        */
       var sumOfLeftLeaves = function(root) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Breadth-first-search',
    },
    {
        Id: 10,
        Title: 'Balanced Binary Tree',
        Question: {
            Desc: `Given a binary tree, determine if it is 
        height-balanced
        .`,

            Examples: [
                `[image:https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg/]Input: root = [3,9,20,null,null,15,7]
          Output: true`,
                `[image:https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg/]Input: root = [1,2,2,3,3,null,null,4,4]
          Output: false`,
                `Input: root = []
          Output: true`,
            ],
            Editor: `/**
        * Definition for a binary tree node.
        * function TreeNode(val, left, right) {
        *     this.val = (val===undefined ? 0 : val)
        *     this.left = (left===undefined ? null : left)
        *     this.right = (right===undefined ? null : right)
        * }
        */
       /**
        * @param {TreeNode} root
        * @return {boolean}
        */
       var isBalanced = function(root) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Tree',
    },
    {
        Id: 11,
        Title: 'Intersection of Two Arrays II',
        Question: {
            Desc: `Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.`,

            Examples: [
                `Input: nums1 = [1,2,2,1], nums2 = [2,2]
          Output: [2,2]`,
                `Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
          Output: [4,9]
          Explanation: [9,4] is also accepted.`,
            ],
            Editor: `/**
        * @param {number[]} nums1
        * @param {number[]} nums2
        * @return {number[]}
        */
       var intersect = function(nums1, nums2) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Binary search',
    },
    {
        Id: 12,
        Title: 'Count Negative Numbers in a Sorted Matrix',
        Question: {
            Desc: `Given a m x n matrix grid which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in grid.`,

            Examples: [
                `Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
          Output: 8
          Explanation: There are 8 negatives number in the matrix.`,
                `Input: grid = [[3,2],[1,0]]
          Output: 0`,
            ],
            Editor: `/**
        * @param {number[][]} grid
        * @return {number}
        */
       var countNegatives = function(grid) {
           
       };`,
        },
        Level: 'easy',
        Topic: 'Matrix',
    },

    {
        Id: 13,
        Title: 'Binary Tree Level Order Traversal',
        Question: {
            Desc: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,

            Examples: [
                `[image:https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg/]Input: root = [3,9,20,null,null,15,7]
                Output: [[3],[9,20],[15,7]]`,
                `Input: root = [1]
                Output: [[1]]`,
                `Input: root = []
                Output: []`,
            ],
            Editor: `/**
            * Definition for a binary tree node.
            * function TreeNode(val, left, right) {
            *     this.val = (val===undefined ? 0 : val)
            *     this.left = (left===undefined ? null : left)
            *     this.right = (right===undefined ? null : right)
            * }
            */
           /**
            * @param {TreeNode} root
            * @return {number[][]}
            */
           var levelOrder = function(root) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Binary tree',
    },

    {
        Id: 14,
        Title: 'Find the Index of the First Occurrence in a String',
        Question: {
            Desc: `Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.`,

            Examples: [
                `Input: haystack = "sadbutsad", needle = "sad"
                Output: 0
                Explanation: "sad" occurs at index 0 and 6.
                The first occurrence is at index 0, so we return 0.`,
                `Input: haystack = "leetcode", needle = "leeto"
                Output: -1
                Explanation: "leeto" did not occur in "leetcode", so we return -1.`,
            ],
            Editor: `/**
            * @param {string} haystack
            * @param {string} needle
            * @return {number}
            */
           var strStr = function(haystack, needle) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Two pointer',
    },

    {
        Id: 15,
        Title: 'Reorder List',
        Question: {
            Desc: `You are given the head of a singly linked-list. The list can be represented as:
                <pre>L0 → L1 → … → Ln - 1 → Ln</pre>
                Reorder the list to be on the following form:
                <pre>L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …</pre>
                You may not modify the values in the list's nodes. Only nodes themselves may be changed.
            `,

            Examples: [
                `[image:https://assets.leetcode.com/uploads/2021/03/04/reorder1linked-list.jpg/]Input: head = [1,2,3,4]
                Output: [1,4,2,3]`,
                `[image:https://assets.leetcode.com/uploads/2021/03/09/reorder2-linked-list.jpg/]Input: head = [1,2,3,4,5]
                Output: [1,5,2,4,3]`,
            ],
            Editor: `/**
            * Definition for singly-linked list.
            * function ListNode(val, next) {
            *     this.val = (val===undefined ? 0 : val)
            *     this.next = (next===undefined ? null : next)
            * }
            */
           /**
            * @param {ListNode} head
            * @return {void} Do not return anything, modify head in-place instead.
            */
           var reorderList = function(head) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Stack',
    },

    {
        Id: 16,
        Title: 'Repeated DNA Sequences',
        Question: {
            Desc: `
            <p>The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.</p>
            <p>For example, "ACGAATTCCG" is a DNA sequence.
            </p>
            <p>When studying DNA, it is useful to identify repeated sequences within the DNA.
            </p>
            <p>Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.</p>
            `,

            Examples: [
                `Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
                Output: ["AAAAACCCCC","CCCCCAAAAA"]`,
                `Input: s = "AAAAAAAAAAAAA"
                Output: ["AAAAAAAAAA"]`,
            ],
            Editor: `/**
            * @param {string} s
            * @return {string[]}
            */
           var findRepeatedDnaSequences = function(s) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Bit manipulation',
    },

    {
        Id: 17,
        Title: 'Design Twitter',
        Question: {
            Desc: `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.
                <h4>Implement the Twitter class:</h4>
                <ul>
                    <li>Twitter() Initializes your twitter object.</li>
                    <li>void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.</li>
                    <li>List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.</li>
                    <li>void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.</li>
                    <li>void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.</li>
                </ul>
            `,

            Examples: [
                `Input
                ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
                [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
                Output
                [null, null, [5], null, null, [6, 5], null, [5]]
                
                Explanation
                Twitter twitter = new Twitter();
                twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
                twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
                twitter.follow(1, 2);    // User 1 follows user 2.
                twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
                twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
                twitter.unfollow(1, 2);  // User 1 unfollows user 2.
                twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.`,
            ],
            Editor: `var Twitter = function() {
    
            };
            
            /** 
             * @param {number} userId 
             * @param {number} tweetId
             * @return {void}
             */
            Twitter.prototype.postTweet = function(userId, tweetId) {
                
            };
            
            /** 
             * @param {number} userId
             * @return {number[]}
             */
            Twitter.prototype.getNewsFeed = function(userId) {
                
            };
            
            /** 
             * @param {number} followerId 
             * @param {number} followeeId
             * @return {void}
             */
            Twitter.prototype.follow = function(followerId, followeeId) {
                
            };
            
            /** 
             * @param {number} followerId 
             * @param {number} followeeId
             * @return {void}
             */
            Twitter.prototype.unfollow = function(followerId, followeeId) {
                
            };
            
            /** 
             * Your Twitter object will be instantiated and called as such:
             * var obj = new Twitter()
             * obj.postTweet(userId,tweetId)
             * var param_2 = obj.getNewsFeed(userId)
             * obj.follow(followerId,followeeId)
             * obj.unfollow(followerId,followeeId)
             */`,
        },
        Level: 'medium',
        Topic: 'Heap (Priority queue)',
    },
    {
        Id: 18,
        Title: 'Range Sum Query 2D - Immutable',
        Question: {
            Desc: `Given a 2D matrix matrix, handle multiple queries of the following type:
                <ul>
                    <li>Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).</li>
                </ul>
                <h4>Implement the NumMatrix class:</h4>
                <ul>
                    <li>NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.</li>
                    <li>int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).</li>
                </ul>
                You must design an algorithm where sumRegion works on O(1) time complexity.
            `,

            Examples: [
                `[image:https://assets.leetcode.com/uploads/2021/03/14/sum-grid.jpg/]Input
                ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
                [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
                Output
                [null, 8, 11, 12]
                
                Explanation
                NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
                numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
                numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
                numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)`,
            ],
            Editor: `/**
            * @param {number[][]} matrix
            */
           var NumMatrix = function(matrix) {
               
           };
           
           /** 
            * @param {number} row1 
            * @param {number} col1 
            * @param {number} row2 
            * @param {number} col2
            * @return {number}
            */
           NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
               
           };
           
           /** 
            * Your NumMatrix object will be instantiated and called as such:
            * var obj = new NumMatrix(matrix)
            * var param_1 = obj.sumRegion(row1,col1,row2,col2)
            */`,
        },
        Level: 'medium',
        Topic: 'Bit manipulation',
    },

    {
        Id: 19,
        Title: 'Network Delay Time',
        Question: {
            Desc: `
            <p>You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.
            </p> 
            <p>We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.
            </p>
            `,

            Examples: [
                `[image:https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png/]Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
                Output: 2`,
                `Input: times = [[1,2,1]], n = 2, k = 1
                Output: 1`,
                `Input: times = [[1,2,1]], n = 2, k = 2
                Output: -1`,
            ],
            Editor: `/**
            * @param {number[][]} times
            * @param {number} n
            * @param {number} k
            * @return {number}
            */
           var networkDelayTime = function(times, n, k) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Graph',
    },

    {
        Id: 20,
        Title: 'Largest Sum of Averages',
        Question: {
            Desc: `
            <p>You are given an integer array nums and an integer k. You can partition the array into at most k non-empty adjacent subarrays. The score of a partition is the sum of the averages of each subarray.
            </p>
            <p>Note that the partition must use every integer in nums, and that the score is not necessarily an integer.
            </p>
            <p>Return the maximum score you can achieve of all the possible partitions. Answers within 10-6 of the actual answer will be accepted.
            </p>
            `,

            Examples: [
                `Input: nums = [9,1,2,3,9], k = 3
                Output: 20.00000
                Explanation: 
                The best choice is to partition nums into [9], [1, 2, 3], [9]. The answer is 9 + (1 + 2 + 3) / 3 + 9 = 20.
                We could have also partitioned nums into [9, 1], [2], [3, 9], for example.
                That partition would lead to a score of 5 + 2 + 6 = 13, which is worse.`,
                `Input: nums = [1,2,3,4,5,6,7], k = 4
                Output: 20.50000`,
            ],
            Editor: `/**
            * @param {number[]} nums
            * @param {number} k
            * @return {number}
            */
           var largestSumOfAverages = function(nums, k) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Prefix Sum',
    },
    {
        Id: 21,
        Title: 'Fraction Addition and Subtraction',
        Question: {
            Desc: `
            <p>Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.
            </p>
            <p>The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.</p>
            `,
            
            Examples: [
                `Input: expression = "-1/2+1/2"
                Output: "0/1"`,
                `Input: expression = "-1/2+1/2+1/3"
                Output: "1/3"`,
                `Input: expression = "1/3-1/2"
                Output: "-1/6"`,
            ],
            Editor: `/**
            * @param {string} expression
            * @return {string}
            */
           var fractionAddition = function(expression) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Simulation',
    },

    {
        Id: 22,
        Title: 'Gray Code',
        Question: {
            Desc: `An n-bit gray code sequence is a sequence of 2n integers where:
                <ul>
                    <li>Every integer is in the inclusive range [0, 2n - 1],</li>
                    <li>The first integer is 0,</li>
                    <li>An integer appears no more than once in the sequence,</li>
                    <li>The binary representation of every pair of adjacent integers differs by exactly one bit, and</li>
                    <li>The binary representation of the first and last integers differs by exactly one bit.</li>

                </ul>
                Given an integer n, return any valid n-bit gray code sequence.
            `,

            Examples: [
                `Input: n = 2
                Output: [0,1,3,2]
                Explanation:
                The binary representation of [0,1,3,2] is [00,01,11,10].
                - 00 and 01 differ by one bit
                - 01 and 11 differ by one bit
                - 11 and 10 differ by one bit
                - 10 and 00 differ by one bit
                [0,2,3,1] is also a valid gray code sequence, whose binary representation is [00,10,11,01].
                - 00 and 10 differ by one bit
                - 10 and 11 differ by one bit
                - 11 and 01 differ by one bit
                - 01 and 00 differ by one bit`,
                `Input: n = 1
                Output: [0,1]`,
            ],
            Editor: `/**
            * @param {number} n
            * @return {number[]}
            */
           var grayCode = function(n) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Backtracking',
    },

    {
        Id: 23,
        Title: '3Sum With Multiplicity',
        Question: {
            Desc: `
                <p>Given an integer array arr, and an integer target, return the number of tuples i, j, k such that i < j < k and arr[i] + arr[j] + arr[k] == target.</p>
                <p>As the answer can be very large, return it modulo 109 + 7.</p>
            `,

            Examples: [
                `Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
                Output: 20
                Explanation: 
                Enumerating by the values (arr[i], arr[j], arr[k]):
                (1, 2, 5) occurs 8 times;
                (1, 3, 4) occurs 8 times;
                (2, 2, 4) occurs 2 times;
                (2, 3, 3) occurs 2 times.`,
                `Input: arr = [1,1,2,2,2,2], target = 5
                Output: 12
                Explanation: 
                arr[i] = 1, arr[j] = arr[k] = 2 occurs 12 times:
                We choose one 1 from [1,1] in 2 ways,
                and two 2s from [2,2,2,2] in 6 ways.`,
                `Input: arr = [2,1,3], target = 6
                Output: 1
                Explanation: (1, 2, 3) occured one time in the array so we return 1.`,
            ],
            Editor: `/**
            * @param {number[]} arr
            * @param {number} target
            * @return {number}
            */
           var threeSumMulti = function(arr, target) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Counting',
    },

    {
        Id: 24,
        Title: 'Subarray Product Less Than K',
        Question: {
            Desc: `Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.
            `,

            Examples: [
                `Input: nums = [10,5,2,6], k = 100
                Output: 8
                Explanation: The 8 subarrays that have product less than 100 are:
                [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
                Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.`,
                `Input: nums = [1,2,3], k = 0
                Output: 0`,
            ],
            Editor: `/**
            * @param {number[]} nums
            * @param {number} k
            * @return {number}
            */
           var numSubarrayProductLessThanK = function(nums, k) {
               
           };`,
        },
        Level: 'medium',
        Topic: 'Sliding window',
    },
];

export default QUESTIONS;
