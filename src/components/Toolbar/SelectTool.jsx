import React from 'react'
import { FaMousePointer as SelectIcon } from 'react-icons/fa'
import Button from 'components/Toolbar/Button'

const SelectTool = (props) => {
  return (
    <Button {...props}>
      <SelectIcon/>
    </Button>
  )
}

export default SelectTool