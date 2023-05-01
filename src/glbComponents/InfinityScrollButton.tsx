import { useCallback } from 'react'
import useInfinityScroll from "@src/hooks/useInfinityScroll"
import { Button } from "semantic-ui-react"

const InfinityScrollButton = ({
  nextResultsAvailable,
  isLoading,
  onClick
}) => {

  if (!nextResultsAvailable) {
    return <span>No hay más resultados</span>
  }
  return (
    <Button disabled={isLoading} loading={isLoading} onClick={onClick}>
      Cargar más resultados
    </Button>
  )
}
export default InfinityScrollButton
