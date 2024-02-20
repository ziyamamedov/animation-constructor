import {forwardRef} from 'react'
import styled from 'styled-components'

type Props = {
  children?: React.ReactNode
  className?: string
}

export const SelectionOutline = forwardRef<HTMLDivElement, Props>(({children, className}, ref) => {
  return (
    <Block ref={ref} className={className}>
      <div className="selection__square square-top-left" />
      <div className="selection__square square-top-right" />
      <div className="selection__square square-bottom-left" />
      <div className="selection__square square-bottom-right" />
      {children}
    </Block>
  )
})

const Block = styled.div`
  position: relative;
  border: 1px solid #3e87f8;
  display: none;

  .selection__square {
    width: 9px;
    height: 9px;
    border: 1px solid #3e87f8;
    border-radius: 2px;
    background-color: #fff;
    position: absolute;
  }

  .square-top-left {
    top: -5px;
    left: -5px;
  }
  .square-top-right {
    top: -5px;
    right: -5px;
  }

  .square-bottom-left {
    bottom: -5px;
    left: -5px;
  }
  .square-bottom-right {
    bottom: -5px;
    right: -5px;
  }
`
