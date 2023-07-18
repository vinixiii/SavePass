import React, { useState } from 'react';
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { TextInputProps } from 'react-native';

import {
  Container,
  Error,
  FormInput,
  Icon,
  InputContainer,
  Label,
  ToggleShowPassButton,
} from './styles';

type Props<T extends FieldValues, K extends FieldPath<T>> = TextInputProps &
  UseControllerProps<T, K> & {
    title: string;
    error: string | undefined;
  };

export function Input<T extends FieldValues, K extends FieldPath<T>>({
  name,
  control,
  title,
  error,
  secureTextEntry,
  ...rest
}: Props<T, K>) {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <Container>
      <Label>{title}</Label>
      {error && <Error>{error}</Error>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            <FormInput
              {...rest}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry && passwordHidden}
            />
            {secureTextEntry && (
              <ToggleShowPassButton
                onPress={() => setPasswordHidden(!passwordHidden)}
              >
                <Icon name={passwordHidden ? 'eye-off' : 'eye'} />
              </ToggleShowPassButton>
            )}
          </InputContainer>
        )}
      />
    </Container>
  );
}
