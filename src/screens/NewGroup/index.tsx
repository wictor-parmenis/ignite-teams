import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highligth';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { groupCreate } from '@storage/group/groupCreate';
import { Alert } from 'react-native';
import { AppError } from '@utils/AppError';
import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.');
      }
    }
  }

  return (
    <Container>
      <Header backButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
