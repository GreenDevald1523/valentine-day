import { Title, Text, Box, Image, Button } from "@mantine/core"
import { motion } from "framer-motion"
import { useTypedDispatch, useTypedSelector } from "../redux/hooks"
import {
  resetPage,
  resetScore,
  selectScore,
  selectShowFinalPage,
  setShowFinalPage,
  setShowQuestionsPage,
  setShowTitlePage,
} from "../redux/slices/testSlice"

export const FinalPage = () => {
  const modalMotion = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  }

  const dispatch = useTypedDispatch()
  const showFinalPage = useTypedSelector(selectShowFinalPage)
  const score = useTypedSelector(selectScore)

  return (
    <motion.div
      initial={"closed"}
      variants={modalMotion}
      animate={showFinalPage ? "open" : "closed"}
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
        sx={{
          position: "relative",
          borderRadius: 10,
        }}
      >
        <Title mb={40} ta="center">
          Ты прошла эту проверку! Твой итоговый балл - {score}.{" "}
          {score > 5 ? "Лучшая!" : "Ну ты и вафля..."} 🎁
        </Title>
        {score === 10 ? (
          <Text>
            Ну что же, ты и правда смогла набрать высочайший балл, с чем я тебя
            и поздравляю! Ты большая умница, твой приз будет соответствующим!
          </Text>
        ) : score > 7 ? (
          <Text>
            Результат теста очень высокий, ты и правда хорошо меня знаешь,
            котенок!
          </Text>
        ) : score > 4 ? (
          <Text>
            Ничего страшного, малыш, даже {score} баллов - это много, ты большая
            умница несмотря ни на что!
          </Text>
        ) : (
          <Text>🤡🤡🤡🤡🤡🤡🤡🤡</Text>
        )}
        <Text mt={20}>
          Настён, я искренне тебя поздравляю с этим чудесным праздником, ты у
          меня самая милая, красивая и веселая! Надеюсь, проходить тест для тебя
          было интересно! 🥰😍💖 Люблю тебя, зайка моя :)
        </Text>
        <Image
          m="auto"
          mt={20}
          w="50% !important"
          src="https://i.pinimg.com/originals/64/bb/16/64bb167e7a72ee4bb7559f7c6adca9a2.jpg"
        />
        <motion.div
          style={{ width: 60, height: 36, margin: "auto", marginTop: 20 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            onClick={() => {
              location.reload()
            }}
            color="pink"
          >
            Пройти тест еще раз!
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  )
}
