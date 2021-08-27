import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/nav'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <Nav category="home">
      <p>Hello World</p>
    </Nav>
  )
}

export default Home
