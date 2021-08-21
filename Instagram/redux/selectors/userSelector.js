export const currentUserSelector = state => state.user.currentUser;
export const currentUserPostsSelector = state => state.user.posts;
export const currentUserFollowingPostsSelector = state =>
  state.user.followingPosts;
