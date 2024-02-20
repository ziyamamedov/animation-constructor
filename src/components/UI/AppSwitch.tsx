import styled from 'styled-components'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const AppSwitch: React.FC<Props> = ({...props}) => <Checkbox type="checkbox" {...props} />

const Checkbox = styled.input`
  display: block;
  position: relative;
  display: inline-block;
  min-width: 20px;
  width: 20px;
  height: 12px;
  background-color: #afafaf;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  &:checked {
    background-color: #222;
  }
  &:checked:before {
    transform: translateX(8px);
  }
`
