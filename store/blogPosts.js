export const state = () => ({
    posts: []
});

export const mutations = {
    addPost (state, posts) {
        state.posts.push(...posts);
    }
};
