import '../styles/main.css'
import { ChakraProvider } from "@chakra-ui/react"


const App = ({ Component, pageProps }) => {
    return (
    	<ChakraProvider resetCSS>
    		<Component {...pageProps} />
    	</ChakraProvider>
    )
    
}

export default App




