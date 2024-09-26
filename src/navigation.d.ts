import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    Store: undefined;
    EditStore: undefined;
    CreateItem: undefined;
<<<<<<< HEAD
    EditItem: { itemId: string, itemTitle: string, itemImageUrl: string, itemDesc: string, itemPoints: string };
=======
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
    Profile: undefined;
    AddPartner: undefined;
    EarnPoints: undefined;
    Quiz: undefined;
    EditQuiz: undefined;
<<<<<<< HEAD
    EditPerguntaQuiz: { perguntaId: number };
=======
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
    Posts: undefined;
    CreatePost: undefined;
    Login: undefined;
    IndividualPost: { postId: number };
};

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type StoreNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;
export type EditStoreNavigationProp = StackNavigationProp<RootStackParamList, 'EditStore'>;
export type CreateItemNavigationProp = StackNavigationProp<RootStackParamList, 'CreateItem'>;
<<<<<<< HEAD
export type EditItemNavigationProp = StackNavigationProp<RootStackParamList, 'EditItem'>;
export type EditItemRouteProp = StackNavigationProp<RootStackParamList, 'EditItem'>;
=======
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
export type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export type AddPartnerNavigationProp = StackNavigationProp<RootStackParamList, 'AddPartner'>;
export type EarnPointsNavigationProp = StackNavigationProp<RootStackParamList, 'EarnPoints'>;
export type QuizNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;
export type EditQuizNavigationProp = StackNavigationProp<RootStackParamList, 'EditQuiz'>;
<<<<<<< HEAD
export type EditPerguntaQuizNavigationProp = StackNavigationProp<RootStackParamList, 'EditPerguntaQuiz'>;
export type EditPerguntaQuizRouteProp = StackNavigationProp<RootStackParamList, 'EditPerguntaQuiz'>;
=======
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
export type PostsNavigationProp = StackNavigationProp<RootStackParamList, 'Posts'>;
export type CreatePostNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePost'>;
export type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type IndividualPostNavigationProp = StackNavigationProp<RootStackParamList, 'IndividualPost'>;
export type IndividualPostRouteProp = StackNavigationProp<RootStackParamList, 'IndividualPost'>;
