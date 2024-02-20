import styled from 'styled-components'
import 'react-bezier-curve-editor/index.css'
import {BezierCurveEditor, ValueType} from 'react-bezier-curve-editor'
import {useEffect, useRef, useState} from 'react'
import {AppCloseButton} from './AppCloseButton'

type Props = React.ComponentProps<typeof BezierCurveEditor> & {formValue: string; onClose: () => void}

export const AppBezierCurve: React.FC<Props> = ({formValue, className, onClose, ...props}) => {
  const arrValue = formValue.startsWith('cubic-bezier') ? formValue.match(/[0-9.]+/g)!.map(Number) : []

  const [value, setValue] = useState<ValueType>([arrValue[0], arrValue[1], arrValue[2], arrValue[3]])

  const onChange = (value: ValueType) => {
    setValue(value)

    if (props.onChange) props.onChange(value)
  }

  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <Block ref={dialogRef} className={className}>
      <StyledCloseButton onClick={onClose} />
      <BezierCurveEditor {...props} onChange={onChange} value={value} />
    </Block>
  )
}

const Block = styled.div`
  padding: 8px 4px 4px;
`
const StyledCloseButton = styled(AppCloseButton)`
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 1;
`

