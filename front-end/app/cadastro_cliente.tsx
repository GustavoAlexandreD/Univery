import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import Api from '../config/Api'; // ajuste o caminho se necessário

// Tipagem do formulário
type ClienteFormValues = {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

// Validação com Yup - IGUAL AO BACKEND
const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome obrigatório'),
  telefone: Yup.string()
    .required('Telefone obrigatório')
    .test('telefone', 'Telefone deve ter entre 10 e 15 dígitos', (value) => {
      if (!value) return false;
      const telefoneLimpo = value.replace(/\D/g, '');
      return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 15;
    }),
  email: Yup.string()
    .required('Email obrigatório')
    .test('email-uece', 'Email deve terminar com @aluno.uece.br', (value) => {
      if (!value) return false;
      const regexEmailUECE = /^[^\s@]+@aluno\.uece\.br$/;
      return regexEmailUECE.test(value);
    }),
  senha: Yup.string()
    .required('Senha obrigatória')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[a-z]/, 'Deve conter pelo menos 1 letra minúscula')
    .matches(/[A-Z]/, 'Deve conter pelo menos 1 letra maiúscula')
    .matches(/[0-9]/, 'Deve conter pelo menos 1 número')
    .matches(/[\W_]/, 'Deve conter pelo menos 1 símbolo'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'Senhas não coincidem')
    .required('Confirmação obrigatória'),
});

export default function CadastroCliente() {
  const router = useRouter();

  async function cadastrarCliente(
    values: ClienteFormValues,
    { resetForm }: FormikHelpers<ClienteFormValues>
  ) {
    try {
      await Api.post('/clientes', values);
      alert("Cliente cadastrado com sucesso!");
      resetForm();
      router.push('/');
    } catch (error) {
      alert("Erro ao cadastrar cliente.");
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={{ fontSize: 22, color: '#2CA94F' }}>{'←'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Cadastro do{'\n'}Cliente</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>Informe os dados a seguir para efetuar o cadastro</Text>

        <Formik<ClienteFormValues>
          initialValues={{ nome: '', telefone: '', email: '', senha: '', confirmarSenha: '' }}
          validationSchema={validationSchema}
          onSubmit={cadastrarCliente}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              {/* Campo Nome */}
              <Text style={styles.label}>NOME</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Gustavo Alexandre"
                placeholderTextColor="#888"
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
              />
              {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

              {/* Campo Telefone */}
              <Text style={styles.label}>TELEFONE</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 85 993453445"
                placeholderTextColor="#888"
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                keyboardType="phone-pad"
              />
              {touched.telefone && errors.telefone && <Text style={styles.error}>{errors.telefone}</Text>}
              <Text style={styles.helpText}>Digite apenas números (10-15 dígitos)</Text>

              {/* Campo Email */}
              <Text style={styles.label}>E-MAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: gustavo@aluno.uece.br"
                placeholderTextColor="#888"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <Text style={styles.helpText}>Use seu email institucional @aluno.uece.br</Text>

              {/* Campo Senha */}
              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#888"
                value={values.senha}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                secureTextEntry
              />
              {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
              <Text style={styles.helpText}>
                Mínimo 8 caracteres: 1 maiúscula, 1 minúscula, 1 número e 1 símbolo
              </Text>

              {/* Campo Confirmar Senha */}
              <Text style={styles.label}>CONFIRMAR SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Repita a Senha"
                placeholderTextColor="#888"
                value={values.confirmarSenha}
                onChangeText={handleChange('confirmarSenha')}
                onBlur={handleBlur('confirmarSenha')}
                secureTextEntry
              />
              {touched.confirmarSenha && errors.confirmarSenha && (
                <Text style={styles.error}>{errors.confirmarSenha}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>CADASTRAR</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  subtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    color: '#888',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  helpText: {
    color: '#666',
    fontSize: 11,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#2CA94F',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    marginTop: 32,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
