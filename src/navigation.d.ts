import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    Store: undefined;
    EditStore: undefined;
    CreateItem: undefined;
    EditItem: { itemId: string, itemTitle: string, itemImageUrl: string, itemDesc: string, itemPoints: string };
    Profile: undefined;
    AddPartner: undefined;
    EarnPoints: undefined;
    Quiz: undefined;
    EditQuiz: undefined;
    EditPerguntaQuiz: { perguntaId: number };
    Posts: undefined;
    CreatePost: undefined;
    Login: undefined;
    IndividualPost: { postId: number };
};

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type StoreNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;
export type EditStoreNavigationProp = StackNavigationProp<RootStackParamList, 'EditStore'>;
export type CreateItemNavigationProp = StackNavigationProp<RootStackParamList, 'CreateItem'>;
export type EditItemNavigationProp = StackNavigationProp<RootStackParamList, 'EditItem'>;
export type EditItemRouteProp = StackNavigationProp<RootStackParamList, 'EditItem'>;
export type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export type AddPartnerNavigationProp = StackNavigationProp<RootStackParamList, 'AddPartner'>;
export type EarnPointsNavigationProp = StackNavigationProp<RootStackParamList, 'EarnPoints'>;
export type QuizNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;
export type EditQuizNavigationProp = StackNavigationProp<RootStackParamList, 'EditQuiz'>;
export type EditPerguntaQuizNavigationProp = StackNavigationProp<RootStackParamList, 'EditPerguntaQuiz'>;
export type EditPerguntaQuizRouteProp = StackNavigationProp<RootStackParamList, 'EditPerguntaQuiz'>;
export type PostsNavigationProp = StackNavigationProp<RootStackParamList, 'Posts'>;
export type CreatePostNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePost'>;
export type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type IndividualPostNavigationProp = StackNavigationProp<RootStackParamList, 'IndividualPost'>;
export type IndividualPostRouteProp = StackNavigationProp<RootStackParamList, 'IndividualPost'>;
