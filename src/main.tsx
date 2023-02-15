import { MantineProvider } from "@mantine/core"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./components/App/App"
import { store } from "./components/redux/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <MantineProvider
      theme={{
        globalStyles: (theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },

          body: {
            overflow: "hidden",
            width: "100vw",
            height: "100vh",
            ...theme.fn.fontStyles(),
            background:
              "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
          },
        }),
        components: {
          Title: {
            styles: () => ({
              root: {
                fontSize: 30,
              },
            }),
          },
          Text: {
            styles: () => ({
              root: {
                fontSize: 18,
              },
            }),
          },
          Button: {
            styles: () => ({
              root: {
                borderRadius: 13,
              },
            }),
          },
          Radio: {
            styles: (theme) => ({
              radio: {
                ":checked": {
                  background: theme.colors.pink[7],
                },
              },
              label: {
                fontSize: 18,
              },
            }),
          },
        },
      }}
    >
      <App />
    </MantineProvider>
  </Provider>
)
