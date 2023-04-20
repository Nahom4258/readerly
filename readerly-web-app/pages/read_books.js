import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import Book from "@/components/book";
import { useAuth } from "@clerk/nextjs";
import { supabaseClient } from "@/utils/supabaseClient";

export default function Wishlists() {

    const [readBooks, setReadBooks] = useState([]);
    const { userId, getToken } = useAuth();

    useEffect(() => {
        const getReadBooks = async () => {
            const token = await getToken({ template: 'supabase' })
            const supabase = await supabaseClient(token);
            const { data, error } = await supabase
                .from('wishlist')
                .select('*')
                .eq('User-ID', userId)
            setReadBooks(data);
        }
        getReadBooks();
    }, [])

    return (
        <Box sx={{ width: '100%', marginTop: 10, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h4">Books you have read</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: 10 }}>
                {readBooks.map((book, index) => {
                    { console.log('first: ', book) }
                    return <Book key={book.id} type='read' book={book} />
                })}
            </Box>
        </Box>
    )
}