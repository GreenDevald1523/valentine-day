import { Box, Title, Text, Flex, Button } from "@mantine/core"
import { motion } from "framer-motion"
import { useTypedDispatch, useTypedSelector } from "../redux/hooks"
import {
  selectShowTitlePage,
  setShowQuestionsPage,
  setShowTitlePage,
} from "../redux/slices/testSlice"

export const TitlePage = () => {
  const dispatch = useTypedDispatch()
  const showTitlePage = useTypedSelector(selectShowTitlePage)
  const modalMotion = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  }
  return (
    <motion.div
      initial={"closed"}
      variants={modalMotion}
      animate={showTitlePage ? "open" : "closed"}
      transition={{
        duration: 1.3,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Box
        bg="white"
        w="60vw"
        p={30}
        pb={50}
        sx={{
          position: "relative",
          borderRadius: 10,
        }}
      >
        <Title mb={15}>Дорогая Вафффелька❤️🤍,</Title>
        <Flex gap={20} direction="column">
          <Text>
            В этот особенный для всех пар день не каждый может оригинально
            превнести подарок своей второй половинке. Что же, надеюсь, сегодня у
            меня это сделать получится лучше, чем в предыдущие разы! Тебя ждет
            короткое, но интересное испытание. <br></br> Итак, к правилам:
          </Text>
          <Text>
            Суть проста - ты должна ответить на 10 вопросов обо мне. Твоя
            главная задача - ответить корректно на максимально возможное
            количество вопросов. Каждый верный ответ на вопрос - 1 балл.
          </Text>
          <Text>
            Чем больше баллов ты наберешь, тем лучше будет приз, так что в этот
            раз только от тебя зависит, какой подарок ты получишь 😊.
          </Text>
          <Text>Желаю тебе удачи, котенок!❤️</Text>
        </Flex>
        <motion.div
          style={{ width: 263, height: 36 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            mt={20}
            color="pink"
            onClick={() => {
              dispatch(setShowTitlePage(false))
              dispatch(setShowQuestionsPage(true))
            }}
          >
            Начать прохождение супер-теста!
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  )
}
