import React from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import CommentInputStyles from '../styles/CommentInputStyles';

interface CommentInputProps {
  commentText: string;
  onChangeText: (text: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ commentText, onChangeText }) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => null}>
        <View style={CommentInputStyles.container}>
          <TextInput
            style= {CommentInputStyles.commentInput}
            value={commentText}
            onChangeText={onChangeText}
            placeholder="Adicione um comentário..."
            multiline
            numberOfLines={3}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CommentInput;
