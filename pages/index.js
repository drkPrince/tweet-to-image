import Head from 'next/head'
import { useState, useRef } from 'react'

import axios from 'axios'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver'

import { DownloadIcon, SearchIcon } from '@chakra-ui/icons'
import Tweet from '../components/Tweet'

import {
    Text,
    Center,
    Switch,
    FormControl,
    FormLabel,
    Button,
    Input,
    Box,
    InputGroup,
    InputRightElement,
    Flex,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Spinner,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"


function App() {
    const tweetRef = useRef(null)

    const [tweetData, setTweetData] = useState(null)

    const [showTime, setShowTime] = useState(true)
    const [showMetrics, setShowMetrics] = useState(true)
    const [showSource, setShowSource] = useState(true)

    const [bg, setBg] = useState('snow')
    const [scale, setScale] = useState(0.9)

    const [hint, setHint] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const bringTweet = async (e) => {
        try {
            e.preventDefault()
            setHint(false)
            setLoading(true)
            const url = e.target.elements.tweetURL.value
            const id = url.split('/')[5]
            const { data, status } = await axios.get(`/api/tweet/${id}`)
            setLoading(false)
            setTweetData(data.data)
            setError(false)
        } catch (e) {
            setError(true)
            setLoading(false)
            setTweetData(null)
        }
    }

    const convert = async (format) => {

        const node = tweetRef.current
        const scale = 2

        let dataUrl

        const style = {
            transform: 'scale(2)',
            transformOrigin: 'top left',
        }

        const param = {
           height: node.offsetHeight * scale,
           width: node.offsetWidth * scale,
           quality: 1,
           style
        }

        switch (format) {
            case 'png':
                {
                    dataUrl = await domtoimage.toPng(node, param)
                    window.saveAs(dataUrl, `your-tweet.${format}`)
                    return
                }

            case 'jpeg':
                {
                    dataUrl = await domtoimage.toJpeg(node, param)
                    window.saveAs(dataUrl, `your-tweet.${format}`)
                    return
                }

            case 'svg':
                {
                    dataUrl = await domtoimage.toSvg(node, param)
                    window.saveAs(dataUrl, `your-tweet.${format}`)
                    return
                }
        }
    }

    const title_size = { base: "33px", md: "50px", lg: "55px" }
    const pic_size = { base: "90vw", md: "80vh", lg: "50vw" }
    const flex = { base: 'column', lg: 'row' }
    const padX = { base: '1rem' }
    const padY = { base: '3rem', md: '5rem' }
    const settingsPad = { base: '1.3rem', md: '5rem' }
    const font_size = { base: "16px", md: "18px", lg: "20px" }


    const gradients = [
        'linear-gradient(to right, #eecda3, #ef629f)',
        'linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)',
        'linear-gradient(to right, rgb(168, 255, 120), rgb(120, 255, 214))',
        'linear-gradient(to right, rgb(253, 200, 48), rgb(243, 115, 53))', ,
        'linear-gradient(to right, rgb(116, 235, 213), rgb(172, 182, 229))',
        'linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98))',
        'linear-gradient(109.6deg, rgb(245, 95, 152) 11.2%, rgb(254, 148, 136) 100.2%)',
        'linear-gradient(to right, rgb(74, 194, 154), rgb(189, 255, 243))',
        'linear-gradient(to right, rgb(255, 175, 189), rgb(255, 195, 160))',
        'linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)',
        'linear-gradient(90deg, hsla(145, 84%, 73%, 1) 0%, hsla(150, 61%, 48%, 1) 100%)',
        'linear-gradient(to right, rgb(255, 75, 31), rgb(255, 144, 104))',
        'linear-gradient(to right, rgb(36, 198, 220), rgb(81, 74, 157))',
        'linear-gradient(to right, rgb(29, 151, 108), rgb(147, 249, 185))',
        'linear-gradient(0.2deg, rgb(51, 204, 255) 4.8%, rgb(51, 102, 255) 85.5%)',
        'linear-gradient(106.8deg, rgb(117, 255, 220) 6%, rgb(163, 216, 255) 47.6%, rgb(248, 215, 251) 87.8%)',
        'linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)',
        'linear-gradient(2.1deg, rgb(116, 253, 210) 5%, rgb(0, 191, 247) 95.8%)',
        'linear-gradient(110.7deg, rgb(9, 154, 151) 6.3%, rgb(21, 205, 168) 90.6%)'
    ]


    return (
        <Box>
            <Head>
                <title>Twipix - Get beautiful tweets</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>
            <Box pt='20' px='4'>
                <Text fontSize={title_size} className='title i'>Capture tweets in a beautiful frame.</Text>
            </Box>
            <Box className='i' my="12" align="center">
              <form onSubmit={bringTweet}>
                    <InputGroup maxW='90vw'>
                        <Input name='tweetURL' placeholder="https://twitter.com/drkPrns/status/1375809527690317825" />
                        <InputRightElement onClick={bringTweet} children={<SearchIcon fontSize={font_size} color="blue.500" />} />
                    </InputGroup>
              </form>
            </Box>

            <Flex my="16" direction={flex} p="4">
                <Box m="0 auto">
                    <Box className='con' style={{background : bg}} minW={pic_size} maxW={pic_size} rounded="sm" px={padX} py={padY} ref={tweetRef}>
                        <div className='container' style={{transform: `scale(${scale})`}} >
                            { hint ? 
                                <Box className='non-tweet' py='8rem' flexDirection='column'>
                                    <Box>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="8rem" height="8rem"><path fill="none" d="M0 0h24v24H0z"/><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="#1DA1F2"/></svg>
                                    </Box>
                                    <Text className='i' p='4' color='gray.700' textAlign='center'>Welcome, Paste the URL of the tweet in the box above</Text>
                                </Box>
                            : 
                            loading ? <Box className='non-tweet'><Spinner /> </Box>
                            :
                            error ? 
                                <Box className='non-tweet'><Text p='4' fontSize='20px'>Something went wrong. Please try again.</Text></Box>
                            :
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

                {
                    !hint && (
                        <Box px={settingsPad} color="gray.700" className='settings i' >

                            <Box mt='12'>
                                <FormLabel color='gray.900' fontSize={font_size}  htmlFor="show_time" display="flex" alignItems="center" >Show elements</FormLabel>
                                <Flex justify="space-between" align="center" name='settings'>
                                
                                    <Flex align="baseline">
                                        <FormLabel htmlFor="show_source" display="flex" alignItems="center" >Source</FormLabel>
                                        <Switch size="md" id="show_source" isChecked={showSource} onChange={()=>setShowSource(!showSource)} />
                                    </Flex>
                                
                                
                                    <Flex align="baseline">
                                        <FormLabel htmlFor="show_time" display="flex" alignItems="center" >Time</FormLabel>
                                        <Switch size="md" id="show_time" isChecked={showTime} onChange={()=>setShowTime(!showTime)} />
                                    </Flex>
                                
                                
                                    <Flex align="baseline">
                                        <FormLabel htmlFor="show_metrics" display="flex" alignItems="center" >Metrics</FormLabel>
                                        <Switch size="md" id="show_metrics" isChecked={showMetrics} onChange={()=>setShowMetrics(!showMetrics)} />
                                    </Flex>
                                </Flex>
                            </Box>


                            <Box my='8'>
                                <FormLabel color='gray.900' fontSize={font_size}  htmlFor="bg" display="flex" alignItems="center" >Select Background gradient</FormLabel>
                                <Flex name='bg' wrap='wrap'>
                                    {gradients.map(g => 
                                        <div key={g} style={{border: bg===g ? '2px solid #777' : null, background: g, width: '29px', height: '29px', marginRight: '1rem', marginBottom: '0.5rem', borderRadius: '100px'}} onClick={()=>setBg(g)}></div>)}
                                </Flex>
                            </Box>

                            <Box my='8'>
                                <FormLabel color='gray.900' fontSize={font_size}  htmlFor="name" display='flex' justifyContent='space-between'>
                                    <div>Size</div>
                                    <div>{scale}</div>
                                </FormLabel>
                                <Slider name='scale' min={0.5} max={1} step={0.1} aria-label="scale the tweet" colorScheme="blue" value={scale} onChange={(val) => setScale(val)}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </Box>

                            <Menu my='10'>
                                <MenuButton borderRadius='3px' p='9px' as={Button} rightIcon={< DownloadIcon/>} colorScheme="blue">
                                    Download
                                </MenuButton>
                                <MenuList fontSize='15px'>
                                    <MenuItem onClick={()=>convert('png')}>PNG</MenuItem>
                                    <MenuItem onClick={()=>convert('jpeg')}>JPEG</MenuItem>
                                    <MenuItem onClick={()=>convert('svg')}>SVG</MenuItem>
                                </MenuList>
                            </Menu>

                        </Box>
                    )
                }
            </Flex>

            <footer>
                <Text className='i' color='gray.500' fontSize='lg'>Made with 💜 for open source by Prince. Check out on <a href="http://github.com/drkPrince/tweet-to-image" target='blank'>Github</a>.</Text>
            </footer>
      </Box>
    )



}
export default App