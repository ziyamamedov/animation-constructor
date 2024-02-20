import type {ButtonHTMLAttributes, ReactNode} from 'react'
import styled from 'styled-components'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export const AppButton: React.FC<Props> = ({children, ...buttonProps}) => {
  return <Button {...buttonProps}>{children}</Button>
}

const Button = styled.button`
  background-color: #3e87f8;
  color: #fff;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
`
