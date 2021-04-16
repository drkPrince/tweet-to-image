import {
	Button,
    Switch,
    FormLabel,
    Box,
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

import {DownloadIcon} from '@chakra-ui/icons'


const Settings = ({props}) => {

	const settingsPad = { base: '0.7rem', md: '5rem' }
    const font_size = { base: "16px", md: "18px", lg: "20px" }
	const font_size_small = { base: "13px", md: "15px", lg: "17px" }

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
		<Box px={settingsPad} color="gray.700" className='settings i' >

            <Box mt='12'>
                <FormLabel color='gray.900' fontSize={font_size}  htmlFor="show_time" display="flex" alignItems="center" >Show elements</FormLabel>
                <Flex justify="space-between" align="center" name='settings' wrap='wrap'>
                
                    <Flex align="baseline" mr='0.5rem'>
                        <FormLabel fontSize={font_size_small} htmlFor="show_source" display="flex" alignItems="center" >Source</FormLabel>
                        <Switch size="md" id="show_source" isChecked={props.showSource} onChange={()=>props.setShowSource(!props.showSource)} />
                    </Flex>
                
                
                    <Flex align="baseline" mr='0.5rem'>
                        <FormLabel fontSize={font_size_small} htmlFor="show_time" display="flex" alignItems="center" >Time</FormLabel>
                        <Switch size="md" id="show_time" isChecked={props.showTime} onChange={()=>props.setShowTime(!props.showTime)} />
                    </Flex>
                
                
                    <Flex align="baseline" mr='0.5rem'>
                        <FormLabel fontSize={font_size_small} htmlFor="show_metrics" display="flex" alignItems="center" >Metrics</FormLabel>
                        <Switch size="md" id="show_metrics" isChecked={props.showMetrics} onChange={()=>props.setShowMetrics(!props.showMetrics)} />
                    </Flex>
                </Flex>
            </Box>


            <Box my='8'>
                <FormLabel color='gray.900' fontSize={font_size}  htmlFor="bg" display="flex" alignItems="center" >Select Background gradient</FormLabel>
                <Flex name='bg' wrap='wrap'>
                    {gradients.map(g => 
                        <div key={g} style={{border: props.bg===g ? '2px solid #777' : null, background: g, width: '29px', height: '29px', marginRight: '1rem', marginBottom: '0.5rem', borderRadius: '100px'}} onClick={()=>props.setBg(g)}></div>)}
                </Flex>
            </Box>

            <Box my='8'>
                <FormLabel color='gray.900' fontSize={font_size}  htmlFor="name" display='flex' justifyContent='space-between'>
                    <div>Size</div>
                    <div>{props.scale}</div>
                </FormLabel>
                <Slider name='scale' min={0.5} max={1} step={0.1} aria-label="scale the tweet" colorScheme="blue" value={props.scale} onChange={(val) => props.setScale(val)}>
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
                    <MenuItem onClick={()=>props.convert('png')}>PNG</MenuItem>
                    <MenuItem onClick={()=>props.convert('jpeg')}>JPEG</MenuItem>
                    <MenuItem onClick={()=>props.convert('svg')}>SVG</MenuItem>
                </MenuList>
            </Menu>

        </Box>
	)
}

export default Settings