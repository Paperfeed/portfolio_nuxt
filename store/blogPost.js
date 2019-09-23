import { createClient } from '~/plugins/contentful';
const client = createClient();

export const state = () => ({
    post: [],
    isLoading: true,
    error: false,
});

export const mutations = {
    setPost(state, post) {
        state.post = post;
    },

    setIsLoading(state, payload) {
        state.isLoading = payload
    },

    setError(state, payload) {
        state.error = payload;
    }
};

export const actions = {
    async getPost({ commit, rootGetters }, slug) {
        let post = rootGetters['blogPosts/getPostBySlug'](slug);
        commit('setIsLoading', true);

        if (post) {
            commit('setPost', post);
        } else {
            try {
                post = await client.getEntries({
                    content_type: process.env.CTF_BLOG_POST_TYPE_ID,
                    'fields.slug': slug
                });
            } catch (e) {
                commit('setIsLoading', false);
                commit('setError', 'A network error has occurred. Maybe the servers aren\'t working or your internet is down.');
                return;
            }

            commit('setPost', post.items[0]);
        }

        commit('setIsLoading', false);
    }
};

