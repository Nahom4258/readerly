import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import Book from "@/components/book";
import { useAuth } from "@clerk/nextjs";
import { supabaseClient } from "@/utils/supabaseClient";

export default function Wishlists() {

    const [wishlist, setWishlist] = useState([]);
    const { userId, getToken } = useAuth();

    useEffect(() => {
        const getWishlist = async () => {
            const token = await getToken({ template: 'supabase' })
            const supabase = await supabaseClient(token);
            const { data, error } = await supabase
                .from('wishlist')
                .select('*')
                .eq('User-ID', userId)
            setWishlist(data);
        }
        getWishlist();
    }, [])

    return (
        <Box sx={{ width: '100%', marginTop: 10, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h4">Your wishlists</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: 10 }}>
                {wishlist.map((book, index) => {
                    { console.log('first: ', book) }
                    return <Book key={book.id} type='wishlist' book={book} />
                })}
            </Box>
        </Box>
    )
}