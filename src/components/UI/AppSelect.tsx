import React, {useState} from 'react'
import styled from 'styled-components'

type Props = {
  options: string[]
  onChange: (name: string, value: string) => void
  value: string
  name: string
}

export const AppSelect: React.FC<Props> = ({options, onChange, value, name}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSelectOption = (selectedValue: string) => {
    onChange(name, selectedValue)
    setIsDropdownOpen(false)
  }

  return (
    <SelectWrapper>
      <StyledSelect onClick={toggleDropdown}>
        <Title>{value}</Title>
        <img src="/assets/images/icons/down-arrow.svg" />
      </StyledSelect>
      {isDropdownOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </SelectWrapper>
  )
}

const SelectWrapper = styled.div`
  position: relative;
  width: 200px;
  font-size: 12px;
  color: #444444;
`

const StyledSelect = styled.div`
  position: relative;
  cursor: pointer;

  text-transform: capitalize;
`
const Title = styled.span`
  margin-right: 6px;
`
const DropdownList = styled.ul`
  position: absolute;
  top: 105%;
  left: -10px;
  width: 100%;
  max-height: 150px;
  overflow: auto;
  list-style-type: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
`

const DropdownItem = styled.li`
  cursor: pointer;
  padding: 5px 5px 5px 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`

