import { gql } from "@apollo/client";
export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;
export const SEEPROFILE_QUERY = gql`
  query SeeProfile($username: String!) {
    seeProfile(username: $username) {
      avatar
      bio
      createdAt
      email
      firstName
      follower {
        username
        avatar
      }
      following {
        username
        avatar
      }
      id
      photos {
        ...PhotoFragment
      }
      totalFollower
      totalFollowing
      username
      isFollowing
      isMe
    }
  }
  ${PHOTO_FRAGMENT}
`;

export const ME_QUERY = gql`
  query {
    me {
      id
      username
      isMe
    }
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    username
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption
    createAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;
