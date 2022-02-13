import type { NextPage } from 'next'
import useSWR from 'swr';
import CardAyah from '../components/ayahCard';
import Box from '@mui/material/Box';
import styles from '../styles/Home.module.css'

import { AyahInterface } from '../model/ayahInterface';

const quranRandomizer = 'http://quran-randomizer.herokuapp.com/'
const getAyah = async () => {
  const response = await fetch(quranRandomizer);
  return await response.json();
}
const RandomAyah = () => {
    const { data, mutate, isValidating } = useSWR(quranRandomizer,getAyah, { revalidateOnFocus: false });

    function handleClick() {
        mutate(quranRandomizer)
    }

    const ayahcontent : AyahInterface = isValidating ? {
        isLoading: isValidating,
    } : {
        isLoading: false,
        surah: data.resources.nameOfSurah.transliteration.id,
        ayah: data.resources.numberOfAyah,
        arab: data.resources.ayah.text.arab,
        translate: data.resources.ayah.translation.id,
        audioSrc: data.resources.ayah.audio.primary,
        handleClick: handleClick
    }

    return (
        <>
        <CardAyah {...ayahcontent} />
        </>
    )

}

const Random: NextPage = () => {

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%'
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <RandomAyah />
            </Box>        
        </Box>
    )
}

export default Random;