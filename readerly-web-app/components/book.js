import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { useAuth } from '@clerk/nextjs';
import { supabaseClient } from '@/utils/supabaseClient';

export default function Book({ book, type }) {
    const { userId, getToken } = useAuth();

    { console.log('inside book: ', book) }

    const addToWishlist = async () => {
        const token = await getToken({ template: 'supabase' })
        const supabase = await supabaseClient(token);
        const { data, error } = await supabase
            .from('wishlist')
            .insert(
                { ...book, 'User-ID': userId }
            )
            .single()
    }

    const addToReadBooks = async () => {
        const token = await getToken({ template: 'supabase' })
        const supabase = await supabaseClient(token);
        const { data, error } = await supabase
            .from('read_books')
            .insert(
                { ...book, 'User-ID': userId }
            )
            .single()

        console.log('first: ', data, error)
    }

    return (
        <Card sx={{ maxWidth: 345, marginX: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={book['image-url']}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom component="div" sx={{ fontsiz: 15, fontWeight: 'bold' }}>
                        {/* Structures : Or Why Things Don't Fall Down */}
                        {book['book-title']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/* J.E. Gordon */}
                        {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/* 1986 */}
                        {book.year}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button disabled={type=='read'} sx={{ backgroundColor: '#6fb554' }} size="small" color="primary" variant='contained' onClick={addToReadBooks}>
                    Read
                </Button>
                <Button disabled={type=='wishlist' || type=='read'} size="small" color="primary" variant='contained' onClick={addToWishlist}>
                    Wishlist
                </Button>
            </CardActions>
        </Card>
    );
}