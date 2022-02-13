import { Card, CardContent, Skeleton, Typography, IconButton, Stack } from "@mui/material"
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import AudioPlayer from '../components/audioPlayer';
import { AyahInterface } from "./ayahInterface";

import React from 'react'

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
    return (
        isLoading ? <Skeleton /> :
        <AudioPlayer url={audioSrc}/>
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