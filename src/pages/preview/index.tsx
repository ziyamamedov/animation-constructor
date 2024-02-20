import {useLayoutEffect, useState} from 'react'
import {PageContent} from 'src/components/PageContent'
import {ANIMATIONS, TElementsAnimations} from 'src/params'
import styled from 'styled-components'

export const PreviewPage: React.FC = () => {
  const [anims, setAnims] = useState<TElementsAnimations>()

  useLayoutEffect(() => {
    const animsJson = localStorage.getItem(ANIMATIONS)
    if (animsJson) setAnims(JSON.parse(animsJson))
  }, [])

  return (
    <Main>
      <PageContent animations={anims} />
    </Main>
  )
}

const Main = styled.main`
  height: 100%;
`

