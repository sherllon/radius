import React, { forwardRef } from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import {
  border,
  compose,
  flexbox,
  layout,
  position,
  space,
  variant,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from 'styled-system';
import { Box, BoxProps } from '../box';
import { Flex } from '../flex';
import { Spinner } from '../spinner';
import { focusRing } from '../shared-styles';

export type StyledButtonProps = SpaceProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  PositionProps & {
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'transparent';
  };

const defaultButtonStyles = {
  position: 'relative',
  fontFamily: 'body',
  fontSize: 2,
  fontWeight: 'regular',
  lineHeight: 'copy',
  borderRadius: 0,
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 3,
  ml: 0,
  mr: 0,
  mb: 0,
  appearance: 'none',
};

const buttonVariants = variant({
  variants: {
    primary: {
      ...defaultButtonStyles,
      bg: 'brand.primary',
      color: 'text.primary',
      borderColor: 'transparent',
      ' svg': {
        color: 'text.primary',
      },
      '&:hover': {
        bg: 'brand.accent',
        color: 'brand.primary',
        ' svg': {
          color: 'brand.primary',
        },
      },
      '&:active, &:focus': {
        backgroundColor: 'highlights.primaryExtraHighlight',
        color: 'brand.primary',
        ' svg': {
          color: 'brand.primary',
        },
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'ui.disabled',
        borderColor: 'ui.disabled',
      },
    },
    secondary: {
      ...defaultButtonStyles,
      bg: 'brand.secondary',
      color: 'text.secondary',
      borderColor: 'transparent',
      ' svg': {
        color: 'text.secondary',
      },
      '&:hover': {
        borderColor: 'brand.secondary',
        bg: 'transparent',
        color: 'brand.secondary',
        ' svg': {
          color: 'brand.secondary',
        },
      },
      '&:active, &:focus': {
        // borderColor: 'brand.secondary',
        // outlineColor: 'red',
        bg: 'highlights.secondaryExtraHighlight',
        // borderColor: 'highlights.primaryExtraHighlight',
        color: 'brand.secondary',
        ' svg': {
          color: 'brand.secondary',
        },
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'bg.primary',
        borderColor: 'ui.disabled',
      },
    },
    transparent: {
      ...defaultButtonStyles,
      bg: 'transparent',
      color: 'text.primary',
      borderColor: 'transparent',
      ' svg': {
        color: 'text.primary',
      },
      '&:hover': {
        backgroundColor: 'highlights.bgHighlight',
      },
      '&:active, &:focus': {
        backgroundColor: 'highlights.bgHighlight',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'ui.disabled',
        borderColor: 'ui.disabled',
      },
    },
  },
});

const ButtonIcon = styled(Box)<BoxProps & { disabled?: boolean }>`
  display: inline-block;
  width: ${props => props.theme.fontSizes[4]};
  height: ${props => props.theme.fontSizes[4]};
  svg {
    position: absolute;
    display: block;
    font-size: ${props => props.theme.fontSizes[4]};
  }
`;

const StyledButton = styled.button<ButtonProps>`
  ${buttonVariants}
  ${compose(space, layout, flexbox, border, position)}

  &:focus {
    ${focusRing}
  }
`;

export type ButtonProps = StyledComponentProps<
  'button',
  any,
  StyledButtonProps,
  never
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      disabled,
      isLoading,
      children,
      mb,
      mt,
      mx,
      my,
      ml,
      mr,
      ...props
    },
    ref
  ) => (
    <StyledButton
      ref={ref}
      py={2}
      disabled={disabled}
      isLoading={isLoading}
      {...props}
      mx={mx}
      my={my}
      mb={mb}
      mt={mt}
      ml={ml}
      mr={mr}
      {...(isLoading ? { 'aria-label': 'loading' } : {})}
    >
      {isLoading && (
        <Spinner
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          size={4}
        />
      )}
      <Flex
        alignItems="center"
        position="relative"
        justifyContent="center"
        opacity={isLoading ? 0 : 1}
      >
        {leftIcon && (
          <ButtonIcon disabled={disabled} mr={2}>
            {leftIcon}
          </ButtonIcon>
        )}
        {children}
        {rightIcon && (
          <ButtonIcon disabled={disabled} ml={2}>
            {rightIcon}
          </ButtonIcon>
        )}
      </Flex>
    </StyledButton>
  )
);

Button.defaultProps = {
  variant: 'primary',
};
