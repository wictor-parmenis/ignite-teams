import { Header } from "@components/Header";
import { Highlight } from "@components/Highligth";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { PlayerCard } from "@components/PlayerCard";
import { Button } from "@components/Button";
import { ListEmpty } from "@components/ListEmpty";
import { useNavigation, useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { AppError } from "@utils/AppError";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/gruopRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
}

export function Players() {
    const [team, setTeam] = useState('Time A')
    const [newPlayerName, setNewPlayerName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const navigation = useNavigation();
    const route = useRoute()
  
    const { group } = route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
      if(newPlayerName.trim().length === 0) {
        return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
      }
  
      const newPlayer = {
        name: newPlayerName,
        team,
      }
  
      try {
        await playerAddByGroup(newPlayer, group);

        newPlayerNameInputRef.current?.blur();
        setNewPlayerName('');
        fetchPlayersByTeam();
  
      } catch (error) {
        if(error instanceof AppError){
          Alert.alert('Nova pessoa', error.message);
        } else {
          Alert.alert('Nova pessoa', 'N??o foi poss??vel adicionar.')
        }
      }
    }

    async function fetchPlayersByTeam() {
      try {
        setIsLoading(true);
        const playersByTeam = await playersGetByGroupAndTeam(group, team);
        setPlayers(playersByTeam)
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Pessoas', 'N??o foi poss??vel carregar as pessoas do time selecionado.');
      }
    }

    async function handlePlayerRemove(playerName: string) {
      try {
        await playerRemoveByGroup(playerName, group);
  
        fetchPlayersByTeam()
  
      } catch (error) {  
        Alert.alert('Remover pessoa', 'N??o foi poss??vel remover essa pessoa.');
      }
    }

    async function groupRemove() {
      try {
        await groupRemoveByName(group);
        navigation.navigate('groups');
  
      } catch (error) {
        Alert.alert('Remover turma', 'N??o foi pos??vel remover o turma');
      }
    }
  
    async function handleGroupRemove() {
      Alert.alert(
        'Remover',
        'Deseja remover a turma?',
        [
          { text: 'N??o', style: 'cancel' },
          { text: 'Sim', onPress: () => groupRemove() }
        ]
      )
    }

    useEffect(() => {
      fetchPlayersByTeam();
    },[team])

  return (
    <Container>
      <Header backButton />

      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input
           inputRef={newPlayerNameInputRef}
           placeholder="Nome da pessoa"
           value={newPlayerName}
           onChangeText={setNewPlayerName}
           autoCorrect={false}
           onSubmitEditing={handleAddPlayer}
           returnKeyType="done"
        />
        <ButtonIcon 
          icon="add" 
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        {
          isLoading ? <Loading /> :
          <FlatList 
              data={['Time A', 'Time B']}
              keyExtractor={item => item}
              renderItem={({item}) => (
                  <Filter title={item} onPress={() => setTeam(item)} isActive={item === team}/>
              )}
              horizontal
          />
        }
         <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
            <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />
        )}
        ListEmptyComponent={() => (
            <ListEmpty message="N??o h?? pessoas nesse time" />
          )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100, }, players.length === 0 && { flex: 1 }]}
      />

    <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />

    </Container>
  )
}