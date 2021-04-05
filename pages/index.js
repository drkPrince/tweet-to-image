import axios from 'axios'
import { useState, useRef } from 'react'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import download from 'downloadjs'

// import html2canvas from 'html2canvas';

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

import { ChevronDownIcon, DownloadIcon, SearchIcon } from '@chakra-ui/icons'

import Tweet from '../components/Tweet'

function App() {
    const tweetRef = useRef(null)

    const [tweetData, setTweetData] = useState(null)


    const [showTime, setShowTime] = useState(true)
    const [showMetrics, setShowMetrics] = useState(true)
    const [showSource, setShowSource] = useState(true)

    const [bg, setBg] = useState('linear-gradient(to right, rgb(78, 84, 200), rgb(143, 148, 251))')
    const [scale, setScale] = useState(0.9)

    const [hint, setHint] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const bringTweet = async (e) => {
        try {
            setHint(false)
            setLoading(true)
            e.preventDefault()
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

        const scale = 2.5    

        const style = {
            transform: 'scale('+scale+')',
            transformOrigin: 'top left',
            width: node.offsetWidth + "px",
            height: node.offsetHeight + "px",
            letterSpacing: '0.07px'
        }


        const param = {
            height: node.offsetHeight * scale,
            width: node.offsetWidth * scale,
            quality: 1,
            style
        }

        const blob = await domtoimage.toBlob(node, param)
        window.saveAs(blob, `your-tweet.${format}`)
    }

    const pic_size = { base: "90vw", md: "90vh", lg: "50vw" }
    const flex = { base: 'column', lg: 'row' }
    const padX = { base: '1rem' }
    const padY = { base: '3rem', md: '5rem' }

    const settingsPad = { base: '1.3rem', md: '5rem' }

    const font_size = { base: "16px", md: "18px", lg: "20px" }

    const title_size = { base: "30px", md: "40px", lg: "55px" }


    const gradients = [
        'linear-gradient(to right, #eecda3, #ef629f)',
        'linear-gradient(to right, #2980b9, #2c3e50)',
        'linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)',
        'linear-gradient(to right, rgb(168, 255, 120), rgb(120, 255, 214))',
        'linear-gradient(to right, rgb(237, 33, 58), rgb(147, 41, 30))',
        'linear-gradient(to right, rgb(253, 200, 48), rgb(243, 115, 53))', ,
        'linear-gradient(to right, rgb(78, 84, 200), rgb(143, 148, 251))',
        'linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83))',
        'linear-gradient(to right, rgb(116, 235, 213), rgb(172, 182, 229))',
        'linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98))',
        'linear-gradient(to right, rgb(74, 194, 154), rgb(189, 255, 243))',
        'linear-gradient(to right, rgb(255, 175, 189), rgb(255, 195, 160))',
        'linear-gradient(90deg, hsla(152, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)',
        'linear-gradient(90deg, hsla(145, 84%, 73%, 1) 0%, hsla(150, 61%, 48%, 1) 100%)'
    ]


    return (
        <Box>
            <Box pt='20' px='4'>
             <Text fontSize={title_size} className='title'>Convert tweets to beautiful images.</Text>
            </Box>
            <Box my="12" align="center">
              <form onSubmit={bringTweet}>
                    <InputGroup maxW='90vw'>
                        <Input name='tweetURL' placeholder="https://twitter.com/drkPrns/status/1375809527690317825" />
                        <InputRightElement children={<SearchIcon fontSize={font_size} color="blue.500" />} />
                    </InputGroup>
              </form>
            </Box>

            <Flex my="16" direction={flex} p="4">
                <Box m="0 auto">
                    <Box className='con' style={{background : bg}} minW={pic_size} maxW={pic_size} rounded="sm" px={padX} py={padY} ref={tweetRef}>
                        <div className='container' style={{transform: `scale(${scale})`}} >
                            { hint ? 
                                <Box className='non-tweet'>
                                    <Text p='4'>Paste the URL of the tweet in the box above</Text>
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
                        <Box px={settingsPad} color="gray.700" className='settings' >

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
                <Text color='gray.500' fontSize='lg'>Made with 💜 and grit by Prince.</Text>
            </footer>
      </Box>
    )



}
export default App