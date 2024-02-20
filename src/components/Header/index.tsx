import {AppButton} from 'src/components/AppButton'
import styled from 'styled-components'

export const Header: React.FC = () => {
  const onClickPreview = () => {
    window.open('/preview', '_blank')
  }

  return (
    <Block>
      <Logo src="/assets/images/logo.svg" />
      <AppButton onClick={onClickPreview}>Preview</AppButton>
    </Block>
  )
}

const Block = styled.header`
  background-color: #222222;
  padding: 12px;
  display: flex;
  justify-content: space-between;
`
const Logo = styled.img``

