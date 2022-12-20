import React from 'react'
import { Container, Box, Text, Tabs, TabPanels, TabList, TabPanel, Tab } from "@chakra-ui/react"
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import { useHistory } from 'react-router-dom'
const HomePage = () => {
  return <Container maxW='xl' centerContent>
    <Box
      display="flex"
      justifyContent="center"
      padding={3}
      bg='white'
      w='100%'
      margin="40px 0 15px 0"
      borderRadius='5px'
      borderWidth='1px'
    >
      <Text fontSize={'4xl'} fontFamily="Work sans" color={"black"}>Chatify</Text>
    </Box>
    <Box bg={'white'} width='100%' padding={4} borderRadius="5px" borderWidth={"1px"}>
      <Tabs variant='soft-rounded'>
        <TabList mb={'1em'}>
          <Tab width={'50%'}>Login</Tab>
          <Tab width={'50%'}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><Login /> </TabPanel>
          <TabPanel> <Signup /> </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>


}
          
         

export default HomePage