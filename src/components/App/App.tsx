import { Box, Flex } from "@mantine/core"
import { FC } from "react"
import { TitlePage } from "../TitlePage/TitlePage"
import { Questions } from "../Questions/Questions"
import { useTypedSelector } from "../redux/hooks"
import {
  selectShowFinalPage,
  selectShowQuestionsPage,
  selectShowTitlePage,
} from "../redux/slices/testSlice"
import { FinalPage } from "../FinalPage/FinalPage"

export const App: FC = () => {
  const showTitlePage = useTypedSelector(selectShowTitlePage)
  const showQuestionsPage = useTypedSelector(selectShowQuestionsPage)
  const showFinalPage = useTypedSelector(selectShowFinalPage)
  return (
    <Flex h="100%" align="center" justify="center">
      {showTitlePage && <TitlePage />}
      {showQuestionsPage && <Questions />}
      {showFinalPage && <FinalPage />}
    </Flex>
  )
}
