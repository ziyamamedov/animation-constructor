import styled, {css, keyframes} from 'styled-components'
import {AppButton} from 'src/components/AppButton'
import {MouseEventHandler} from 'react'
import {AnimationFormDataType} from '../AnimationForm'

type Props = {
  onClickElem?: (id: string) => void
  animations?: Record<string, any>
}

export const PageContent: React.FC<Props> = ({onClickElem, animations = {}}) => {
  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()
    if (onClickElem) onClickElem(e.currentTarget.id)
  }

  return (
    <Container>
      <LeftCol>
        <Title id="title" onClick={onClick} $anim={animations.title}>
          Animation Settings
        </Title>
        <Text id="text" onClick={onClick} $anim={animations.text}>
          The user should have the option to select any element on the page and set up its animation using the controls in the
          right panel. A dotted line will show the element's position and state before the animation begins, giving the user a
          clear idea of how the animation will appear. The preview button on the top panel will open the result in a new tab.
        </Text>
        <StyledAppButton id="button" onClick={onClick} $anim={animations.button}>
          Button
        </StyledAppButton>
      </LeftCol>
      <Image src="/assets/images/pc-monitor.jpg" id="image" onClick={onClick} $anim={animations.image} />
    </Container>
  )
}

const animationCostructor = (animationData: AnimationFormDataType) => {
  if (animationData.speed > 0) {
    const keyfrs = keyframes`
    100% {
      transform : translate(${animationData.translateX}px, ${animationData.translateY}px) scale(${animationData.scale});
      opacity: ${(100 - animationData.opacity) / 100};
      filter: blur(${animationData.blur}px);
    }
  `

    return keyfrs
  }

  return ''
}

const animatable = css<{$anim?: AnimationFormDataType}>`
  ${({$anim}) =>
    $anim &&
    css`
      animation: ${animationCostructor($anim)} ${$anim.speed}s ${$anim.easing} ${$anim.replay ? 'infinite' : 'forwards'};
    `}
`

const Container = styled.div`
  padding: 70px 70px 0 70px;
  max-width: 1280px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LeftCol = styled.div`
  margin-right: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const Title = styled.h1<{$anim?: AnimationFormDataType}>`
  font-size: 43px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -2px;

  ${animatable}
`
const Text = styled.p<{$anim?: AnimationFormDataType}>`
  font-size: 15px;
  line-height: 1.47;
  margin-bottom: 28px;
  max-width: 374px;

  ${animatable}
`
const Image = styled.img<{$anim?: AnimationFormDataType}>`
  display: block;
  width: 300px;
  height: 300px;
  object-fit: contain;

  ${animatable}
`
const StyledAppButton = styled(AppButton)<{$anim?: AnimationFormDataType}>`
  width: 138px;
  align-self: center;

  ${animatable}
`

