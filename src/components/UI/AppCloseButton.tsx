import styled from 'styled-components'

type Props = {onClick: () => void; className?: string}

export const AppCloseButton: React.FC<Props> = ({onClick, className}) => {
  return (
    <CloseButton onClick={onClick} className={className}>
      <span>&times;</span>
    </CloseButton>
  )
}

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
`

