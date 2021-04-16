
import {Text, Box, Spinner} from "@chakra-ui/react"

import Tweet from './Tweet'


const Main = ({scale, hint, loading, error, tweetData, bg, showTime, showMetrics, showSource, tweetRef}) => {

    
    const pic_size = { base: "90vw", md: "80vh", lg: "50vw" }
    const padX = { base: '1rem' }
    const padY = { base: '3rem', md: '5rem' }

    if(hint){
    	return (
    		<Box m="0 auto" className='non-tweet i' py='2rem' flexDirection='column'>
    		    <Box>
    		        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="8rem" height="8rem"><path fill="none" d="M0 0h24v24H0z"/><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="#1DA1F2"/></svg>
    		    </Box>
    		    <Text className='i' p='4' color='gray.700' textAlign='center'>Welcome! To get started, paste the link of the tweet in the box above</Text>
    		</Box>
    	)
    }

    if(loading){
    	return <Box minW={pic_size} m="0 auto" className='non-tweet i'><Spinner size='xl' /> </Box>
    }

    if(error){
    	return  <Box m="0 auto" minW={pic_size} className='non-tweet i'><Text p='4' fontSize='20px'>Oops! 😬 Something went wrong. Please try again.</Text></Box>
    }

    if(tweetData){
        if(tweetData.message){
            return  <Box m="0 auto" minW={pic_size} className='non-tweet i'><Text p='4' fontSize='20px'>Something is wrong with the URL. Please double check.</Text></Box>
        }
    }

	return (
        <Box m="0 auto">
            <Box className='con' style={{background : bg}} minW={pic_size} maxW={pic_size} rounded="sm" px={padX} py={padY} ref={tweetRef}>
                <div className='container' style={{transform: `scale(${scale})`}} >
                    { 
                        tweetData && <Tweet
                            tweet={tweetData}
                            showTime={showTime}
                            showMetrics={showMetrics}
                            showSource={showSource}
                         />
                	}
                </div>
            </Box>
        </Box>

	)
}

export default Main