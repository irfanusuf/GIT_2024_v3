export const users = [
  {
    _id: "u1",
    username: "irfan_dev",
    email: "irfan@example.com",
    profilePic: "/avatars/irfan.png",
    bio: "Full-stack dev 🚀 | Building a social platform",
    posts: [{ postId: "p1" }],
    followers: [{ userId: "u2" }, { userId: "u3" }],
    following: [{ userId: "u2" }],
  },
  {
    _id: "u2",
    username: "john_doe",
    email: "john@example.com",
    profilePic: "/avatars/john.png",
    bio: "Traveller | Photographer 📸",
    posts: [{ postId: "p3" }],
    followers: [{ userId: "u1" }],
    following: [{ userId: "u1" }, { userId: "u3" }],
  },
  {
    _id: "u3",
    username: "ayesha_k",
    email: "ayesha@example.com",
    profilePic: "/avatars/ayesha.png",
    bio: "Designer 🎨 | Coffee lover ☕",
    posts: [{ postId: "p2" }],
    followers: [],
    following: [{ userId: "u1" }],
  },
]



export const posts = [
  {
    _id: "p1",
    postPicUrl: "/posts/post1.jpg",
    postCaption: "Late night coding 🌙💻",
    userId: {
      _id: "u1",
      username: "irfan_dev",
      profilePic: "/avatars/irfan.png",
    },
    likes: [{ userId: "u2" }, { userId: "u3" }],
    comments: [
      {
        _id: "c1",
        userId: {
          _id: "u2",
          username: "john_doe",
        },
        text: "Looks awesome bro 🔥",
        isReported: false,
        isEdited: false,
        replies: [],
      },
    ],
    shareCount: 1,
  },
  {
    _id: "p2",
    postPicUrl: "/posts/post2.jpg",
    postCaption: "Morning coffee vibes ☕",
    userId: {
      _id: "u3",
      username: "ayesha_k",
      profilePic: "/avatars/ayesha.png",
    },
    likes: [{ userId: "u1" }],
    comments: [],
    shareCount: 0,
  },
  {
    _id: "p3",
    postPicUrl: "/posts/post3.jpg",
    postCaption: "Exploring the mountains 🏔️",
    userId: {
      _id: "u2",
      username: "john_doe",
      profilePic: "/avatars/john.png",
    },
    likes: [{ userId: "u1" }, { userId: "u3" }],
    comments: [
      {
        _id: "c2",
        userId: {
          _id: "u1",
          username: "irfan_dev",
        },
        text: "This looks insane 😍",
        isReported: false,
        isEdited: false,
        replies: [
          {
            _id: "r1",
            userId: {
              _id: "u2",
              username: "john_doe",
            },
            text: "It really was!",
            isReported: false,
            isEdited: false,
          },
        ],
      },
    ],
    shareCount: 3,
  },
]
