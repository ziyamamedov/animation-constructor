import styled from 'styled-components'
import {Header} from 'src/components/Header'
import {PageContent} from 'src/components/PageContent'
import {useEffect, useRef, useState} from 'react'
import {SelectionOutline} from 'src/components/SelectionOutline'
import {AnimationForm, AnimationFormDataType} from 'src/components/AnimationForm'
import {ANIMATIONS, DEFAULT_FORM} from 'src/params'

export const EditPage: React.FC = () => {
  const [form, setForm] = useState<AnimationFormDataType>(DEFAULT_FORM)
  const editableAreaRef = useRef<HTMLDivElement>(null)
  const selectionRef = useRef<HTMLDivElement>(null)
  const changedElems = useRef<{[key: string]: AnimationFormDataType}>({})

  const deselectElem = () => {
    setForm((prev) => {
      // Возвращаем элементу видимость когда снимаем с него выделение
      if (prev) {
        makeVisible(document.getElementById(prev.elemId))
      }

      return DEFAULT_FORM
    })

    const selection = selectionRef.current

    if (selection) {
      const selectionLastChild: HTMLElement = selection.lastChild as any

      if (selectionLastChild.id) {
        selection.removeChild(selectionLastChild)
      }

      selection.style.display = 'none'
    }
  }

  const onClickElem = (id: string) => {
    setForm((prev) => {
      if (prev.elemId) {
        makeVisible(document.getElementById(prev.elemId))
      }

      if (changedElems.current[id]) {
        return changedElems.current[id]
      } else {
        return {...DEFAULT_FORM, elemId: id}
      }
    })

    const selection = selectionRef.current
    const elem = document.getElementById(id)

    if (elem && selection) {
      const selectionLastChild: HTMLElement = selection?.lastChild as any

      if (selectionLastChild.id && selectionLastChild.id !== id) {
        selection?.removeChild(selectionLastChild)
      }

      selectElem(elem, selectionRef.current)
      makeInvisible(elem)
    }
  }

  const onChangeForm = (id: string, value: string | boolean) => {
    setForm((prev: any) => ({...prev, [id]: value}))

    if (changedElems.current[form.elemId]) {
      changedElems.current[form.elemId] = {...changedElems.current[form.elemId], [id]: value}
    } else {
      changedElems.current[form.elemId] = {...DEFAULT_FORM, elemId: form.elemId, [id]: value}
    }

    localStorage.setItem(ANIMATIONS, JSON.stringify(changedElems.current))
  }

  const onResetForm = () => {
    const newForm = {...DEFAULT_FORM, elemId: form.elemId}

    changedElems.current[form.elemId] = newForm
    localStorage.setItem(ANIMATIONS, JSON.stringify(changedElems.current))
    setForm((prev: any) => ({...DEFAULT_FORM, elemId: prev.elemId}))
  }

  useEffect(() => {
    const lSAnimations = localStorage.getItem(ANIMATIONS)

    if (lSAnimations) {
      changedElems.current = JSON.parse(lSAnimations)
    }
  }, [])

  useEffect(() => {
    // Когда пользователь переключает показывание начального состояния элемента
    const elemToShow = document.getElementById(form.elemId)

    if (elemToShow) {
      elemToShow.style.opacity = form.showInitialState ? '1' : '0'
    }
  }, [form.showInitialState]) // eslint-disable-line

  return (
    <Block>
      <Header />
      <Main>
        <Editor>
          <EdtableArea ref={editableAreaRef} onClick={deselectElem}>
            <StyledPageContent onClickElem={onClickElem} />
            <StyledSelection ref={selectionRef} $form={form} />
          </EdtableArea>
        </Editor>
        <SideBar>{form.elemId && <AnimationForm form={form} onChange={onChangeForm} onResetForm={onResetForm} />}</SideBar>
      </Main>
    </Block>
  )
}

const selectElem = (elem: HTMLElement, selection: HTMLDivElement) => {
  const elemsRect = elem.getBoundingClientRect()
  const newElem = elem && (elem.cloneNode(true) as HTMLElement)

  selection.style.display = 'block'
  selection.style.position = 'fixed'
  selection.style.top = `${elemsRect.top - 1}px`
  selection.style.left = `${elemsRect.left - 1}px`
  newElem.style.margin = '0'
  selection.appendChild(newElem)
}

const makeInvisible = (elem: HTMLElement) => {
  elem.style.outline = '1px dotted #3E87F8'
  elem.style.outlineOffset = '2px'
  elem.style.opacity = '0'
  elem.style.pointerEvents = 'none'
}
const makeVisible = (elem: HTMLElement | null) => {
  if (elem) {
    elem.style.opacity = '1'
    elem.style.outline = 'none'
    elem.style.pointerEvents = 'initial'
  }
}

const Block = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Main = styled.main`
  flex: 1;
  display: flex;
`
const SideBar = styled.aside`
  width: 240px;
  padding: 15px 13px;
`
const Editor = styled.div`
  background-color: #e5e5e5;
  flex: 1;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const EdtableArea = styled.div`
  background-color: #fff;
  width: 874px;
  height: 498px;
  position: relative;
`
const StyledPageContent = styled(PageContent)`
  .selected {
    position: relative;

    :before {
    }
  }
`
const StyledSelection = styled(SelectionOutline)<{$form: AnimationFormDataType}>`
  transform: translate(${({$form}) => $form.translateX}px, ${({$form}) => $form.translateY}px) scale(${({$form}) => $form.scale});

  :last-child {
    opacity: ${({$form}) => (100 - $form.opacity) / 100};
    filter: blur(${({$form}) => $form.blur}px);
  }
`

