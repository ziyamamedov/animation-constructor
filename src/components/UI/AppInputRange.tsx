import styled from 'styled-components'

type Props = any

export const AppInputRange: React.FC<Props> = ({className, ...restProps}) => {
  return (
    <Block className={className}>
      <Input type="range" {...restProps} />
      <FilledInputTrack />
    </Block>
  )
}

const Block = styled.div`
  height: 20px;
  position: relative;
`
const FilledInputTrack = styled.div`
  position: absolute;
  height: 2px;
  border-radius: 1px;
  background-color: #afafaf;
  top: 9px;
`
const Input = styled.input`
  height: 20px;
  -webkit-appearance: none;
  width: 100%;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #e0e0e0;
    border-radius: 1px;
    border: 0px solid #000000;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 2px solid #afafaf;
    height: 12px;
    width: 12px;
    border-radius: 24px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #e0e0e0;
  }
  &::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #e0e0e0;
    border-radius: 1px;
    border: 0px solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 2px solid #afafaf;
    height: 12px;
    width: 12px;
    border-radius: 24px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #e0e0e0;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-fill-upper {
    background: #e0e0e0;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 2px solid #afafaf;
    height: 12px;
    width: 12px;
    border-radius: 24px;
    background: #ffffff;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #e0e0e0;
  }
  &:focus::-ms-fill-upper {
    background: #e0e0e0;
  }
`
