import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthModal({ visible, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const animation = new Animated.Value(0);
  const backgroundOpacity = new Animated.Value(0);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(animation, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start(),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(),
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(),
      ]);
    }
  }, [visible]);

  const handleClear = () => {
    setNomeUsuario('');
    setEmail('');
    setSenha('');
    setConfirmSenha('');
  };

  const handleModalClose = () => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(),
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => onClose()),
    ]);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    handleClear();
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.modalContainer, { opacity: backgroundOpacity }]}>
        <Animated.View style={[styles.modalContent, { transform: [{ scale }], opacity }]}>
          <View style={styles.header}>
            <Text style={styles.headerTitleLeft}>
              {isLoginMode ? 'Login' : 'Criar Conta'}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.headerTitleRight}>
                {isLoginMode ? 'Criar conta' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          {isLoginMode ? (
            <>
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
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="**********"
                    secureTextEntry={!showSenha}
                    value={senha}
                    onChangeText={text => setSenha(text)}
                  />
                  <TouchableOpacity onPress={() => setShowSenha(!showSenha)} style={styles.eyeIcon}>
                    <Ionicons name={showSenha ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.cadastrarButton]}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.limparButton]} onPress={handleClear}>
                  <Text style={styles.buttonText}>Limpar</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
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
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="**********"
                    secureTextEntry={!showSenha}
                    value={senha}
                    onChangeText={text => setSenha(text)}
                  />
                  <TouchableOpacity onPress={() => setShowSenha(!showSenha)} style={styles.eyeIcon}>
                    <Ionicons name={showSenha ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirme a Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="**********"
                    secureTextEntry={!showConfirmSenha}
                    value={confirmSenha}
                    onChangeText={text => setConfirmSenha(text)}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmSenha(!showConfirmSenha)} style={styles.eyeIcon}>
                    <Ionicons name={showConfirmSenha ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.cadastrarButton]}>
                  <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.limparButton]} onPress={handleClear}>
                  <Text style={styles.buttonText}>Limpar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Animated.View>

        <Animated.View style={[styles.closeButtonContainer, { opacity }]}>
          <TouchableOpacity onPress={handleModalClose}>
            <View style={styles.closeButtonIconContainer}>
              <Ionicons name="close" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
    color: '#FF8C00',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '95%',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cadastrarButton: {
    backgroundColor: '#041F21',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  limparButton: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#041F21',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  closeButtonContainer: {
    position: 'relative',
    top: 20,
  },
  closeButtonIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },
});
