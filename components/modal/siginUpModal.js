import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpModal({ visible, onClose }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleClear = () => {
    setNomeUsuario('');
    setEmail('');
    setSenha('');
    setConfirmSenha('');
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitleLeft}>Criar Conta</Text>
            <Text style={styles.headerTitleRight}>Login</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome/Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              value={nomeUsuario}
              onChangeText={text => setNomeUsuario(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="usuario@gmail.com"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="**********"
              secureTextEntry
              value={senha}
              onChangeText={text => setSenha(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirme a Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="**********"
              secureTextEntry
              value={confirmSenha}
              onChangeText={text => setConfirmSenha(text)}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.cadastrarButton]}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.limparButton]} onPress={handleClear}>
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButtonContainer} onPress={handleModalClose}>
          <View style={styles.closeButtonIconContainer}>
            <Ionicons name="close" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#041F21',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerTitleLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerTitleRight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '#ccc',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    width: '70%',
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  cadastrarButton: {
    backgroundColor: '#041F21',
  },
  limparButton: {
    backgroundColor: '#041F21',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButtonContainer: {
    position: 'relative',
    bottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
