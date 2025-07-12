import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Store: undefined;
  EditStore: undefined;
  EditItemStore: {
    id: string;
    title: string;
    description: string;
    points: number;
    imageUrl: string;
  };
  CreateItem: undefined;
  CreateQuestion: undefined;
  EditQuestion: { questionId: string };
  Profile: undefined;
  AddPartner: undefined;
  EarnPoints: undefined;
  Quiz: undefined;
  EditQuiz: undefined;
  Posts: undefined;
  CreatePost: undefined;
  Login: undefined;
  IndividualPost: { postId: number };
};

export type HomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
export type StoreNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Store"
>;
export type EditStoreNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditStore"
>;
export type EditItemStoreNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditItemStore"
>;
export type CreateItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateItem"
>;
export type CreateQuestionNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateQuestion"
>;
export type EditQuestionNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditQuestion"
>;
export type ProfileNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;
export type AddPartnerNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddPartner"
>;
export type EarnPointsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EarnPoints"
>;
export type QuizNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Quiz"
>;
export type EditQuizNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditQuiz"
>;
export type PostsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Posts"
>;
export type CreatePostNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreatePost"
>;
export type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type IndividualPostNavigationProp = StackNavigationProp<
  RootStackParamList,
  "IndividualPost"
>;
