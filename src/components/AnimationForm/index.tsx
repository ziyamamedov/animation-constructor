import {ChangeEventHandler, ReactNode, Suspense, lazy, useState} from 'react'
import styled from 'styled-components'
import {AppInputRange} from '../UI/AppInputRange'
import {AppSwitch} from '../UI/AppSwitch'
import {AppSelect} from '../UI/AppSelect'
import {EASING_VALUES} from 'src/params'
import {AppButton} from '../AppButton'
import {ModalConfirmReset} from '../ModalConfirmReset'
import {useDebounceFn} from 'src/hooks/usDebounceFn'
import {ValueType} from 'react-bezier-curve-editor'

const AppBezierCurve = lazy(() => import('../UI/AppBezierCurve').then((module) => ({default: module.AppBezierCurve})))

export type AnimationFormDataType = {
  elemId: string
  translateX: number
  translateY: number
  opacity: number
  scale: number
  blur: number
  speed: number
  delay: number
  easing: string
  replay: boolean
  showInitialState: boolean
}

type Props = {
  form: AnimationFormDataType
  onChange: (id: string, value: string | boolean) => void
  onResetForm: () => void
}

export const AnimationForm: React.FC<Props> = ({form, onChange, onResetForm}) => {
  const [showCubicBezier, setShowCubicBezier] = useState(false)
  const [modalConfirmReset, setModalConfirmReset] = useState(false)
  const debouncedBezierFn = useDebounceFn((value: ValueType) => {
    const formattedBezier = `cubic-bezier(${value.map((num) => Number(num.toFixed(2))).join(',')})`

    console.log('🚀 ~ debouncedBezierFn ~ formattedBezier:', formattedBezier.match(/[0-9.]+/g)?.map(Number))
    onChange('easing', formattedBezier)
  }, 300)

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.name, e.target.value)
  }

  const onChangeBoolean: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.name, e.target.checked)
  }

  const onChangeEasing = (name: string, value: string) => {
    if (value === 'cubic-bezier') {
      if (!form.easing.startsWith('cubic-bezier')) {
        onChange('easing', 'cubic-bezier(0, 0.5, 1, 0.5)')
      }
      setShowCubicBezier(true)
    } else {
      onChange(name, value)
    }
  }
  const onClickReset = () => {
    setModalConfirmReset(true)
  }

  return (
    <Block>
      <FormElem label="X" value={form.translateX}>
        <StyledAppInputRange name="translateX" max={150} min={-150} value={form.translateX} onChange={onChangeInput} />
      </FormElem>
      <FormElem label="Y" value={form.translateY}>
        <StyledAppInputRange name="translateY" max={100} min={-100} value={form.translateY} onChange={onChangeInput} />
      </FormElem>
      <FormElem label="Opacity" value={`${form.opacity}%`}>
        <StyledAppInputRange name="opacity" max={100} min={0} value={form.opacity} onChange={onChangeInput} />
      </FormElem>
      <FormElem label="Scale" value={form.scale}>
        <StyledAppInputRange name="scale" max={1.9} min={0.1} step={0.1} value={form.scale} onChange={onChangeInput} />
      </FormElem>
      <FormElem label="Blur" value={form.blur}>
        <StyledAppInputRange name="blur" max={10} min={0} value={form.blur} onChange={onChangeInput} />
      </FormElem>
      <FormElem label="Speed" value={form.speed + 's'}>
        <StyledAppInputRange name="speed" max={3} min={0.1} step={0.1} value={form.speed} onChange={onChangeInput} />
      </FormElem>
      <FormElem label="Delay" value={form.delay + 's'}>
        <StyledAppInputRange name="delay" max={10} min={0} step={0.5} value={form.delay} onChange={onChangeInput} />
      </FormElem>
      <FormElem label="Easing">
        <AppSelect options={EASING_VALUES} value={form.easing} name="easing" onChange={onChangeEasing} />
        {showCubicBezier && (
          <Suspense>
            <StyledAppBezierCurve
              onChange={debouncedBezierFn}
              formValue={form.easing}
              onClose={() => setShowCubicBezier(false)}
            />
          </Suspense>
        )}
      </FormElem>
      <FormElem label="Replay">
        <AppSwitch name="replay" checked={form.replay} onChange={onChangeBoolean} />
      </FormElem>
      <FormElemWrap>
        <AppSwitch name="showInitialState" checked={form.showInitialState} onChange={onChangeBoolean} />
        <InitialStateLabel>Show Initial State</InitialStateLabel>
      </FormElemWrap>
      <StyledAppButton type="button" onClick={onClickReset}>
        Reset
      </StyledAppButton>
      {modalConfirmReset && (
        <ModalConfirmReset isOpen={modalConfirmReset} onClose={() => setModalConfirmReset(false)} onConfirm={onResetForm} />
      )}
    </Block>
  )
}

type FormElemProps = {
  label: string
  children: ReactNode
  value?: string | number
}

const FormElem: React.FC<FormElemProps> = ({label, children, value}) => (
  <FormElemWrap>
    <Label>{label}</Label>
    {children}
    <Value>{value}</Value>
  </FormElemWrap>
)

const Block = styled.div`
  color: #444444;
`
const FormElemWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`
const Label = styled.span`
  font-size: 11px;
  font-weight: 700;
  flex: 0 0 42px;
  margin-right: 10px;
  text-align: right;
`
const InitialStateLabel = styled(Label)`
  flex: 1;
  text-align: left;
  margin-left: 10px;
  margin-right: unset;
`
const Value = styled.span`
  font-size: 13px;
  margin-left: 10px;
`
const StyledAppInputRange = styled(AppInputRange)`
  width: 118px;
`
const StyledAppButton = styled(AppButton)`
  width: 100px;
`

const StyledAppBezierCurve = styled(AppBezierCurve)`
  position: absolute !important;
  top: 100%;
  right: -5px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
`

