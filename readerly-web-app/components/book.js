import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Book() {
    return (
        <Card sx={{ maxWidth: 345, marginX: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuU66akzUklOuCKb_SdK9Dz1f6Gsnh3CxOSKt39riYKzn2Fau7"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom component="div" sx={{ fontsiz: 15, fontWeight: 'bold' }}>
                        Structures : Or Why Things Don't Fall Down
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        J.E. Gordon
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        1986
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button sx={{backgroundColor: '#6fb554'}} size="small" color="primary" variant='contained'>
                    Read
                </Button>
                <Button size="small" color="primary" variant='contained'>
                    Wishlist
                </Button>
            </CardActions>
        </Card>
    );
}