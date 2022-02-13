import type { NextPage } from 'next'
import useSWR from 'swr';
import CardAyah from '../components/ayahCard'
import { Box } from '@mui/material';
import { AyahInterface } from '../components/ayahInterface';

const quranRandomizer = 'http://quran-randomizer.herokuapp.com/'
const getAyah = async () => {
  const response = await fetch(quranRandomizer);
  return await response.json();
}
const RandomAyah = () => {
    const { data, mutate, isValidating } = useSWR(quranRandomizer, getAyah);

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
        <CardAyah {...ayahcontent} />
    )

}

const Random: NextPage = () => {
    const control = {
        isPlaying: false,
        onPlayPauseClick: () => true
    }

    return (
        <Box sx={{ width: '80%',
                   margin:'auto'}}>
            <RandomAyah />
        </Box>
    )
}

export default Random;