import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, message, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <Button color={'#e41d69'} title="OK" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: 350,
        height: 260,
        padding: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
    },
    message: {
        marginVertical: 10,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins_700Bold',
    },
});

export default CustomAlert;