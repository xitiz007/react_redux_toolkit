import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
const initialState = postsAdapter.getInitialState({
  status: "idle", //"idle" "loading" "succeeded" "failed"
  error: null,
  count: 0,
});
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addPost",
  async (postData) => {
    try {
      const response = await axios.post(BASE_URL, postData);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData) => {
    try {
      const response = await axios.put(BASE_URL + `/${postData.id}`, postData);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postData) => {
    try {
      const response = await axios.delete(BASE_URL + `/${postData.id}`);
      if (response?.status === 200) return postData;
      return null;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.entities[postId];
      if (!post) return;
      post.reactions[reaction] += 1;
    },
    incrementCount: (state, action) => {
      state.count += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let minute = 1;
        const posts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: minute++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        postsAdapter.upsertMany(state, posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload?.id;
        if (!id) return;
        postsAdapter.removeOne(state, id);
      });
  },
});

export const {
  selectAll: getAllPosts,
  selectById: getPost,
  selectIds: getPostIds,
} = postsAdapter.getSelectors((state) => state.posts);
export const { incrementCount, addReaction } = postsSlice.actions;
export const getCount = (state) => state.posts.count;
// export const getAllPosts = (state) => state.posts.posts;
export const getUserPosts = createSelector(
  [getAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
// export const getPost = (state, postId) =>
  // state.posts.posts.find((post) => post.id === postId);
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export default postsSlice.reducer;
