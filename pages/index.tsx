import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/nav'
import RoomCard from '../components/roomCard'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <Nav category="home">
      <p>Hello World</p>
      <RoomCard
        title="Hello World Party"
        date="2021.08.21"
        imageUrl="/images/foods.jpg"
      ></RoomCard>
    </Nav>
  )
}

export default Home
