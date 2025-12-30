const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Topic = require("./models/Topic");
const Problem = require("./models/Problem");

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URL);

  await Topic.deleteMany();
  await Problem.deleteMany();

  const topics = await Topic.insertMany([
    { name: "Arrays", description: "Fundamental array problems" },
    { name: "Strings", description: "String pattern and manipulation" },
    { name: "Hashing / Maps", description: "Lookups and frequency problems" },
    { name: "Two Pointers", description: "Pointer movement tricks" },
    { name: "Sliding Window", description: "Window based optimizations" },
    { name: "Stack", description: "LIFO based questions" },
    { name: "Queue", description: "FIFO problems and BFS base" },
    { name: "Linked List", description: "Node manipulation problems" },
    {
      name: "Recursion & Backtracking",
      description: "DFS and search problems",
    },
    { name: "Binary Search", description: "Search in sorted structures" },
    { name: "Binary Trees", description: "Classic tree traversal problems" },
    { name: "BST", description: "Problems around BST properties" },
    {
      name: "Heaps / Priority Queue",
      description: "K-based and ordering problems",
    },
    { name: "Graphs", description: "Traversal, paths and cycles" },
    {
      name: "Dynamic Programming",
      description: "Optimal substructure patterns",
    },
  ]);

  const problems = [
    // Arrays
    { topic: "Arrays", title: "Two Sum", difficulty: "Easy" },
    { topic: "Arrays", title: "Maximum Subarray", difficulty: "Medium" },
    { topic: "Arrays", title: "Merge Intervals", difficulty: "Medium" },

    // Strings
    { topic: "Strings", title: "Valid Anagram", difficulty: "Easy" },
    {
      topic: "Strings",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
    },
    { topic: "Strings", title: "Minimum Window Substring", difficulty: "Hard" },

    // Hashing
    { topic: "Hashing / Maps", title: "Two Sum (HashMap)", difficulty: "Easy" },
    { topic: "Hashing / Maps", title: "Group Anagrams", difficulty: "Medium" },

    // Two Pointers
    {
      topic: "Two Pointers",
      title: "Container With Most Water",
      difficulty: "Medium",
    },
    { topic: "Two Pointers", title: "3 Sum", difficulty: "Medium" },

    // Sliding Window
    {
      topic: "Sliding Window",
      title: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
    },
    {
      topic: "Sliding Window",
      title: "Longest Repeating Character Replacement",
      difficulty: "Medium",
    },

    // Stack
    { topic: "Stack", title: "Valid Parentheses", difficulty: "Easy" },
    {
      topic: "Stack",
      title: "Largest Rectangle in Histogram",
      difficulty: "Hard",
    },

    // Queue
    {
      topic: "Queue",
      title: "Implement Queue using Stacks",
      difficulty: "Easy",
    },

    // Linked List
    { topic: "Linked List", title: "Reverse Linked List", difficulty: "Easy" },
    {
      topic: "Linked List",
      title: "Detect Cycle in Linked List",
      difficulty: "Medium",
    },

    // Recursion
    {
      topic: "Recursion & Backtracking",
      title: "Subsets",
      difficulty: "Medium",
    },
    {
      topic: "Recursion & Backtracking",
      title: "Permutations",
      difficulty: "Medium",
    },

    // Binary Search
    { topic: "Binary Search", title: "Binary Search", difficulty: "Easy" },
    {
      topic: "Binary Search",
      title: "Search in Rotated Sorted Array",
      difficulty: "Medium",
    },

    // Trees
    {
      topic: "Binary Trees",
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
    },

    // BST
    {
      topic: "BST",
      title: "Validate Binary Search Tree",
      difficulty: "Medium",
    },

    // Heap
    {
      topic: "Heaps / Priority Queue",
      title: "Kth Largest Element",
      difficulty: "Medium",
    },

    // Graphs
    { topic: "Graphs", title: "Number of Islands", difficulty: "Medium" },

    // DP
    {
      topic: "Dynamic Programming",
      title: "Climbing Stairs",
      difficulty: "Easy",
    },
    {
      topic: "Dynamic Programming",
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
    },
  ];

  const lookup = Object.fromEntries(topics.map((t) => [t.name, t._id]));

  await Problem.insertMany(
    problems.map((p) => ({
      topicId: lookup[p.topic],
      title: p.title,
      difficulty: p.difficulty,
      youtubeLink: "https://www.youtube.com",
      leetcodeLink: "https://leetcode.com",
      articleLink: "https://neetcode.io",
    }))
  );

  console.log("Seed complete 🌱");
  process.exit();
}

seed();
