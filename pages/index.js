import Head from 'next/head'
import { useState, useRef } from 'react'

import axios from 'axios'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import Header from '../components/Header'
import Main from '../components/Main'
import Settings from '../components/Settings'

import {Text, Box, Flex} from "@chakra-ui/react"


function App() 
{
    
    const [bg, setBg] = useState('linear-gradient(106.8deg, rgb(117, 255, 220) 6%, rgb(163, 216, 255) 47.6%, rgb(248, 215, 251) 87.8%)')

    const tweetRef = useRef(null)

    const [tweetData, setTweetData] = useState(null)

    const [showTime, setShowTime] = useState(true)
    const [showMetrics, setShowMetrics] = useState(true)
    const [showSource, setShowSource] = useState(true)
    
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
            if(data.message){
                setError(true)
                setLoading(false)
                setTweetData(null)
            }
            else {
                setLoading(false)
                setTweetData(data.data)
                setError(false)
            }
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
                    saveAs(dataUrl, `${new Date().toJSON()}.${format}`)
                    return
                }

            case 'jpeg':
                {
                    dataUrl = await domtoimage.toJpeg(node, param)
                    saveAs(dataUrl, `${new Date().toJSON()}.${format}`)
                    return
                }

            case 'svg':
                {
                    dataUrl = await domtoimage.toSvg(node, param)
                    saveAs(dataUrl, `${new Date().toJSON()}.${format}`)
                    return
                }
        }
    }

    const propsForSettings = {
        showTime, setShowTime, showMetrics, setShowMetrics, showSource, setShowSource, scale, setScale, convert, bg, setBg
    }

    const flex = { base: 'column', lg: 'row' }


    return (
        <Box>
            <Head>
                <title>Twimage - Create beautiful tweets</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>

            <Header bringTweet={bringTweet}/>
            
            <Flex my="16" direction={flex} p="4">
                <Main tweetRef={tweetRef} bg={bg} scale={scale} hint={hint} loading={loading} error={error} tweetData={tweetData} showTime={showTime} showMetrics={showMetrics} showSource={showSource} />
                {!hint && <Settings props={propsForSettings}/>}
            </Flex>

            <footer>
                <Text px='1rem' className='i' color='gray.500' fontSize='lg'>Made with 💜 for open source by <a href="https://www.twitter.com/drkPrns" rel="noreferrer" target='_blank'>Prince</a>. Check out on <a href="http://github.com/drkPrince/tweet-to-image" rel="noreferrer" target='_blank'>Github</a>.</Text>
            </footer>
      </Box>
    )



}
export default App