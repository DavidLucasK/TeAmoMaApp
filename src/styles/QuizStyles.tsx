import { StyleSheet, Platform } from 'react-native';

const QuizStyles = StyleSheet.create({
container: {

},
quizContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
},
card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
},
question: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    marginBottom: 20,
},
button: {
    backgroundColor: '#e41d69',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    minWidth: 150,
},
disabledButton: {
    backgroundColor: '#00000047',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    minWidth: 150,
},
buttonText: {
    color: '#FFF',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
},
options: {
    marginBottom: 20,
},
option: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
voltar: {
    position: 'absolute', // Muda para 'absolute' para fixar o botão
    top: 50, // Distância do topo
    right: 20, // Distância do lado direito
    padding: 10,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff90',
    borderRadius: 5,
},
voltarText: {
    fontFamily: 'Poppins_600SemiBold',
},
correct: {
    backgroundColor: '#a4dbb1',
    borderBlockColor: '#00a727',
    padding: 10,
    borderRadius: 5,
    marginVertical: 13,
},
incorrect: {
    backgroundColor: '#ffb4ba',
    borderBlockColor: '#db0419',
    padding: 10,
    borderRadius: 5,
    marginVertical: 13,
},
loadingImage: {
    alignSelf: 'center',
    width: '70%',
    marginBottom: -50,
    marginTop: -50,
},
titleBack: {
    justifyContent: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    alignSelf: 'center',
},
btnBack: {
    backgroundColor: '#e41d69',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
},
textBack: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
}
});

export default QuizStyles;