import React from 'react'
import { FaHandPaper as HandIcon } from 'react-icons/fa'
import Button from 'components/Toolbar/Button'

const HandTool = (props) => {
  return (
    <Button {...props}>
      <HandIcon/>
    </Button>
  )
}

export default HandTool