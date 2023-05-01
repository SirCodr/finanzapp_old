import { useState } from 'react'

const useInfinityScroll = ({ nextPage }) => {
  const [minFetchRange, setMinFetchRange] = useState<number>(nextPage ?? 0)
  const [fetchRangeDiff, setFetchRangeDiff] = useState<number>(1)

  const loadNewPage = () => {
    setMinFetchRange(minFetchRange + fetchRangeDiff)
  }

  return { minFetchRange, fetchRangeDiff, loadNewPage }
}
export default useInfinityScroll