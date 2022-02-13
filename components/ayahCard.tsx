// mui
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

// react-h5-audio-player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// react
import React from 'react'

// this package
import { AyahInterface } from "./ayahInterface";

const QS = ({ isLoading, surah, ayah }: AyahInterface) => {
    return (
        isLoading ? <Skeleton /> :
        <Typography sx={{ fontSize: 14, mb: 2 }}>
            {surah} : {ayah}
        </Typography>
    )
}

const AyahText = ({ isLoading, arab, translate }: AyahInterface) => {
    return (
        <>
            {isLoading ? <Skeleton /> :
                <Typography variant="h5" component="div" align='right'>
                    {arab}
                </Typography> 
            }
            {isLoading ? <Skeleton /> :
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {translate}
                </Typography> 
            }
            </>
    )
}

const AyahAudio = ({ isLoading, audioSrc }: AyahInterface) => {
    const source = audioSrc ? audioSrc : '';
    return (
        isLoading ? <Skeleton /> : 
        <AudioPlayer 
            src={source}/>
    )
}

const CardAyahContent = (ayahcontent: AyahInterface) => {
    return (
        <>
            <CardContent>
                <QS {...ayahcontent}/>
                <AyahText arab={ayahcontent.arab} translate={ayahcontent.translate} isLoading={ayahcontent.isLoading} />
            </CardContent>
            <AyahAudio isLoading={ayahcontent.isLoading} audioSrc={ayahcontent.audioSrc} />
            <Stack spacing={3}>
                <IconButton size="large" onClick={ayahcontent.handleClick} aria-label='refresh' color='success'>
                <ReplayCircleFilledIcon fontSize='inherit'/>
                </IconButton>
            </Stack>
        </>
    )
}

const CardAyah = (ayahcontent: AyahInterface) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardAyahContent {...ayahcontent} />
        </Card>
    )
}


export default CardAyah;