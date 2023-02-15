import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface TestState {
  score: number
  page: number
  showTitlePage: boolean
  showQuestionsPage: boolean
  showFinalPage: boolean
}

const initialState: TestState = {
  score: 0,
  page: 1,
  showTitlePage: true,
  showQuestionsPage: false,
  showFinalPage: false,
}

export const testSlice = createSlice({
  name: "testState",
  initialState,
  reducers: {
    increaseScore(state) {
      state.score++
    },
    resetScore(state) {
      state.score = 0
    },
    resetPage(state) {
      state.page = 0
    },
    nextPage(state) {
      state.page++
    },
    setShowTitlePage(state, action: PayloadAction<boolean>) {
      state.showTitlePage = action.payload
    },
    setShowQuestionsPage(state, action: PayloadAction<boolean>) {
      state.showQuestionsPage = action.payload
    },
    setShowFinalPage(state, action: PayloadAction<boolean>) {
      state.showFinalPage = action.payload
    },
  },
})

export const {
  increaseScore,
  nextPage,
  setShowTitlePage,
  setShowQuestionsPage,
  setShowFinalPage,
  resetScore,
  resetPage,
} = testSlice.actions

export const selectScore = (state: RootState) => state.testSlice.score
export const selectPage = (state: RootState) => state.testSlice.page
export const selectShowTitlePage = (state: RootState) =>
  state.testSlice.showTitlePage
export const selectShowQuestionsPage = (state: RootState) =>
  state.testSlice.showQuestionsPage
export const selectShowFinalPage = (state: RootState) =>
  state.testSlice.showFinalPage

export default testSlice.reducer
