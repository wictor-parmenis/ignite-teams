import React from 'react';
import logoImg from '@assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { BackButton, BackIcon, Container, Logo } from './styles';

interface IHeaderProps {
  backButton?: boolean;
}

export function Header({ backButton = false }: IHeaderProps) {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('groups');
  };
  return (
    <Container>
      {backButton && (
        <BackButton onPress={handleBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
}
