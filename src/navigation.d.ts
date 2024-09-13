import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    Store: undefined;
    Profile: undefined;
    EarnPoints: undefined;
    Quiz: undefined;
    Posts: undefined;
    CreatePost: undefined;
    Login: undefined;
    IndividualPost: { postId: number };
};

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type StoreNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;
export type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export type EarnPointsNavigationProp = StackNavigationProp<RootStackParamList, 'EarnPoints'>;
export type QuizNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;
export type PostsNavigationProp = StackNavigationProp<RootStackParamList, 'Posts'>;
export type CreatePostNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePost'>;
export type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type IndividualPostNavigationProp = StackNavigationProp<RootStackParamList, 'IndividualPost'>;
export type IndividualPostRouteProp = StackNavigationProp<RootStackParamList, 'IndividualPost'>;
