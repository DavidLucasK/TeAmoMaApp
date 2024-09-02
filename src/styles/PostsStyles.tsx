import { StyleSheet, Platform } from 'react-native';

const PostsStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        width: '100%',
        height: '100%',
        paddingTop: 20, // 7.5rem em pixels
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    postsContainer: {
        width: '100%',
        paddingHorizontal: '5%',
        borderRadius: 30,
        backgroundColor: '#FFF',
    },
    post: {

    },
    imagePost: {
        width: '100%', // 25rem em pixels
        objectFit: 'contain',
    },
    textBottom: {
        
    }
});

export default PostsStyles;