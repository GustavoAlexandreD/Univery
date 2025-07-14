import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import Api from '../config/Api'; // ajuste o caminho conforme seu projeto

// Tipagem do formulário
type RestauranteFormValues = {
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

// Validação com Yup - IGUAL AO BACKEND
const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome obrigatório'),
  cnpj: Yup.string()
    .required('CNPJ obrigatório')
    .matches(/^\d{14}$/, 'CNPJ deve ter exatamente 14 dígitos numéricos'),
  telefone: Yup.string()
    .required('Telefone obrigatório')
    .test('telefone', 'Telefone deve ter entre 10 e 15 dígitos', (value) => {
      if (!value) return false;
      const telefoneLimpo = value.replace(/\D/g, '');
      return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 15;
    }),
  email: Yup.string()
    .email('Email inválido')
    .required('Email obrigatório'),
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

export default function CadastroRestaurante() {
  const router = useRouter();

  async function cadastrarRestaurante(
    values: RestauranteFormValues,
    { resetForm }: FormikHelpers<RestauranteFormValues>
  ) {
    try {
      await Api.post('/restaurantes', values);
      alert("Restaurante cadastrado com sucesso!");
      resetForm();
      router.push('/');
    } catch (error) {
      alert("Erro ao cadastrar restaurante.");
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

        <Text style={styles.title}>Cadastro do{'\n'}Estabelecimento</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>Informe os dados a seguir para cadastrar o estabelecimento</Text>

        <Formik<RestauranteFormValues>
          initialValues={{
            nome: '',
            cnpj: '',
            telefone: '',
            email: '',
            senha: '',
            confirmarSenha: '',
          }}
          validationSchema={validationSchema}
          onSubmit={cadastrarRestaurante}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              {/* Nome */}
              <Text style={styles.label}>NOME</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do Estabelecimento"
                placeholderTextColor="#888"
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
              />
              {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

              {/* CNPJ */}
              <Text style={styles.label}>CNPJ</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 12345678901234"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={values.cnpj}
                onChangeText={handleChange('cnpj')}
                onBlur={handleBlur('cnpj')}
                maxLength={14}
              />
              {touched.cnpj && errors.cnpj && <Text style={styles.error}>{errors.cnpj}</Text>}
              <Text style={styles.helpText}>Digite apenas números (exatamente 14 dígitos)</Text>

              {/* Telefone */}
              <Text style={styles.label}>TELEFONE</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 85 88888888"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
              />
              {touched.telefone && errors.telefone && <Text style={styles.error}>{errors.telefone}</Text>}
              <Text style={styles.helpText}>Digite apenas números (10-15 dígitos)</Text>

              {/* Email */}
              <Text style={styles.label}>E-MAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: lanchonete@campus.edu.br"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              {/* Senha */}
              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a senha"
                placeholderTextColor="#888"
                secureTextEntry
                value={values.senha}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
              />
              {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
              <Text style={styles.helpText}>
                Mínimo 8 caracteres: 1 maiúscula, 1 minúscula, 1 número e 1 símbolo
              </Text>

              {/* Confirmar Senha */}
              <Text style={styles.label}>CONFIRMAR SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Repita a Senha"
                placeholderTextColor="#888"
                secureTextEntry
                value={values.confirmarSenha}
                onChangeText={handleChange('confirmarSenha')}
                onBlur={handleBlur('confirmarSenha')}
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
    zIndex: 2 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 20 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#eee', 
    marginVertical: 12 
  },
  subtitle: { 
    textAlign: 'center', 
    color: '#888', 
    marginBottom: 16 
  },
  label: { 
    marginTop: 12, 
    marginBottom: 4, 
    color: '#888', 
    fontWeight: 'bold', 
    fontSize: 12, 
    letterSpacing: 1 
  },
  input: { 
    backgroundColor: '#E5E5E5', 
    borderRadius: 12, 
    padding: 12, 
    fontSize: 16, 
    marginBottom: 4 
  },
  error: { 
    color: 'red', 
    fontSize: 12, 
    marginBottom: 8 
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
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
